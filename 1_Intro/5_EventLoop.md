# 🔄 Node.js Event Loop & Architecture

This guide covers the internal mechanics of Node.js, the event loop, its ecosystem role, architectural comparisons, and the Observer Pattern.

---

## 1. Node.js in the Backend Ecosystem

Traditionally, server-side platforms used a **multi-threaded** approach to handle concurrent requests. Node.js introduced a shift by utilizing a **single-threaded event-driven** model.

### Traditional Thread-per-Request Model vs. Node.js Model

| Feature | Traditional Model (e.g., Apache Tomcat, IIS) | Node.js Model (libuv + V8) |
| :--- | :--- | :--- |
| **Threading** | Multi-threaded (spawns a thread per connection/request). | Single-threaded (runs JS on a single main thread). |
| **I/O Operations** | **Blocking**. The thread waits for database, API, or FS operations to complete. | **Non-blocking**. Uses asynchronous OS system calls or delegates tasks to libuv. |
| **Concurrency Limit**| Limited by the OS thread limit and RAM overhead per thread (typically 1-2MB/thread). | Very high. Can handle thousands of concurrent connections with low memory footprint. |
| **Resource Efficiency**| High memory and CPU context-switching overhead. | Highly efficient memory usage, minimal context-switching. |

```text
Traditional (Thread-per-request):
Client 1 ──> Thread 1 ──> DB Query (Thread blocks/waits) ──> Response
Client 2 ──> Thread 2 ──> File Read (Thread blocks/waits) ──> Response

Node.js (Event Loop + Async I/O):
Client 1 ─┐
Client 2 ─┼─> [ Single Thread (Event Loop) ] ─> Delegates I/O to OS/Thread Pool
Client 3 ─┘       ▲                                          │
                  └───────── Callback Queued when done ◄─────┘
```

---

## 2. Nginx (Connection to Node's Model)

**Nginx** shares a very similar architecture to Node.js. 
* **Apache HTTP Server** uses a process/thread-per-connection model (like the traditional model).
* **Nginx** uses an **asynchronous, event-driven, non-blocking** architecture. It runs a master process and a small number of worker processes (usually matching the CPU cores). Each worker process runs an event loop (using low-level OS APIs like `epoll` on Linux, `kqueue` on macOS, or `IOCP` on Windows) to handle thousands of requests concurrently.
* **Why this matters**: Because they share this event-driven philosophy, Node.js and Nginx are frequently paired together. Nginx acts as a high-performance reverse proxy, load balancer, and static asset server in front of Node.js application servers.

---

## 3. What is Node.js Best At?

Node.js is optimized for specific types of applications:

### 👍 Ideal Use Cases (I/O-Intensive)
* **Real-time Applications**: Chat apps, collaborative tools (like Google Docs), gaming servers.
* **Streaming Applications**: Audio/Video streaming (e.g., Netflix), file uploading services.
* **JSON-based APIs**: Fast, lightweight RESTful or GraphQL APIs.
* **Microservices & API Gateways**: Easy orchestration of multiple services with fast request forwarding.

### 👎 Poor Use Cases (CPU-Intensive)
* **Image/Video Editing**: Resizing images, encoding videos.
* **Heavy Mathematical Computations**: Machine learning models, physics engines.
* **Cryptography**: Generating complex hashes, heavy encryption/decryption.
* *Why?* Since Node.js runs JS on a **single thread**, any long-running CPU computation will block the Event Loop, causing the server to freeze and ignore all incoming requests.

---

## 4. The Event Loop & Callback Queues

The Event Loop is the heart of Node.js runtime (implemented inside the `libuv` C library). It allows Node.js to perform non-blocking I/O operations by offloading tasks to the system kernel whenever possible.

### The 6 Phases of the Event Loop

When Node.js starts, it initializes the event loop, processes the input script, and then begins looping through these phases:

```text
       ┌───────────────────────────┐
┌─────>│          TIMERS           │ <── setTimeout(), setInterval()
│      └─────────────┬─────────────┘
│                    ▼
│      ┌───────────────────────────┐
│      │     PENDING CALLBACKS     │ <── System/network errors (e.g., TCP connection refused)
│      └─────────────┬─────────────┘
│                    ▼
│      ┌───────────────────────────┐
│      │       IDLE, PREPARE       │ <── Used internally by libuv
│      └─────────────┬─────────────┘
│                    ▼
│      ┌───────────────────────────┐
│      │           POLL            │ <── Retrieves new I/O events, executes I/O callbacks
│      └─────────────┬─────────────┘
│                    ▼
│      ┌───────────────────────────┐
│      │           CHECK           │ <── setImmediate() callbacks
│      └─────────────┬─────────────┘
│                    ▼
│      ┌───────────────────────────┐
└──────│      CLOSE CALLBACKS      │ <── e.g., socket.on('close', ...)
       └───────────────────────────┘
```

1. **Timers**: Executes callbacks scheduled by `setTimeout()` and `setInterval()`.
2. **Pending Callbacks**: Executes I/O callbacks deferred from the previous loop iteration (such as TCP/UDP connection errors).
3. **Idle, Prepare**: Used only internally by libuv.
4. **Poll**: 
   * Retrieves new I/O events (reading file, database query results, incoming requests).
   * Executes I/O-related callbacks (except timers, setImmediate, and close callbacks).
   * If there are no timers or setImmediate callbacks scheduled, Node will block here and wait for I/O events to complete.
5. **Check**: Executes `setImmediate()` callbacks.
6. **Close Callbacks**: Executes close event callbacks, e.g., `socket.on('close', ...)`.

---

## 5. Microtask Queues (process.nextTick & Promise)

Apart from the 6 major phases of libuv, Node.js has **two microtask queues** managed by the JS engine:
1. **`process.nextTick()` Queue**: Holds callbacks scheduled using `process.nextTick()`.
2. **Promise Queue**: Holds resolved Promise callbacks (e.g., `.then()`, `await` resolutions).

### How Microtasks Executed:
* Microtask queues are **not** part of the libuv event loop phases.
* Instead, **microtasks execute immediately after the current operation completes**, regardless of the current phase of the event loop.
* **Priority**: The `process.nextTick()` queue is always drained **before** the Promise queue.

```text
[Current Operation Ends] ──> [process.nextTick Queue] ──> [Promise Queue] ──> [Move to Next Phase/Callback]
```

### `setImmediate` vs `setTimeout(..., 0)`
* `setImmediate()` is designed to execute a script once the current **Poll** phase completes (in the **Check** phase).
* `setTimeout(..., 0)` schedules a callback to run after a minimum threshold of 0ms (in the **Timers** phase).
* **Execution Order**:
  * In the main/global context, the execution order is non-deterministic (depends on performance/OS scheduling).
  * **Inside an I/O callback, `setImmediate` is guaranteed to run first**. Since the loop is in the **Poll** phase, it must move to the **Check** phase next before restarting the loop to hit the **Timers** phase.

Check out [5_EventLoop.js](file:///c:/Users/ypran/OneDrive/Desktop/Backend/1_Intro/5_EventLoop.js) for a runnable demonstration of this behavior.

---

## 6. The Observer Pattern in Node.js

Node.js is an **event-driven** platform. This architecture relies heavily on the **Observer Pattern**.

### What is the Observer Pattern?
The Observer Pattern is a design pattern where an object (called the **Subject** or **Observable**) maintains a list of its dependents (called **Observers**) and notifies them automatically of any state changes, usually by calling one of their methods.

In Node.js:
* **Subject**: The `EventEmitter` class (from the built-in `events` module).
* **Observers**: Functions registered as listeners using `.on()` or `.once()`.

```text
   [ EventEmitter (Subject) ] 
          │
          ├─► Emits "job_added" event
          │
          ├───► Observer 1: Notification System (Triggers logic)
          └───► Observer 2: Logs System (Triggers logic)
```

### EventEmitter Code Snippet
```javascript
const EventEmitter = require("events");
const myEmitter = new EventEmitter();

// 1. Observer registers to listen
myEmitter.on("user_signup", (username) => {
    console.log(`Sending welcome email to ${username}`);
});

// 2. Subject emits event
myEmitter.emit("user_signup", "Alice");
```
You can run and test this in [5_EventLoop.js](file:///c:/Users/ypran/OneDrive/Desktop/Backend/1_Intro/5_EventLoop.js).