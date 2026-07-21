#  Node.js Events, EventEmitter & Process Events

Node.js is built around an **asynchronous event-driven architecture**. Certain objects (called "emitters") emit named events that cause registered functions (called "listeners") to be called.

---

## 1. EventEmitter & `.on()` Method

The core `events` module provides the `EventEmitter` class.

### `.on(eventName, listener)`
* **Purpose**: Registers a listener callback function that will be executed **every time** the specified event is triggered.
* **Synchronous Execution**: When `.emit(eventName)` is called, all registered callbacks for that event are invoked **synchronously** in the order they were registered.

```js
const EventEmitter = require('events');
const Champion = new EventEmitter();

// Registering listeners with .on()
Champion.on('won the race', (time) => {
    console.log(`Congrats! Champion won in ${time}s`);
});

// Emitting the event
Champion.emit('won the race', 9.58);
```

### Useful EventEmitter Methods

| Method | Description |
| :--- | :--- |
| `emitter.on(event, listener)` | Adds a persistent listener for the event. |
| `emitter.once(event, listener)` | Adds a **one-time** listener. Removed automatically after being invoked once. |
| `emitter.emit(event, ...args)` | Synchronously calls each of the listeners registered for `event`. |
| `emitter.off(event, listener)` | Alias for `removeListener()`. Removes a specific listener. |

---

## 2. Process Events with `process.on()`

In Node.js, the global `process` object is itself an instance of `EventEmitter`. It emits events related to the Node.js runtime environment and process lifecycle.

### Common Process Events

| Event Name | Trigger Condition | Async Code Allowed? |
| :--- | :--- | :--- |
| **`beforeExit`** | Emitted when Node.js has emptied its event loop and has no work to schedule. | **YES** — Can schedule new async tasks to keep Node alive. |
| **`exit`** | Emitted right before the process shuts down (either naturally or via `process.exit()`). | **NO** — Must only run synchronous code. Async tasks are ignored. |
| **`uncaughtException`**| Emitted when an uncaught exception bubbles up to the event loop. | Use with caution (process state may be corrupted). |
| **`unhandledRejection`**| Emitted when a Promise is rejected and no `.catch()` handler is attached. | Used for global promise error logging. |
| **`SIGINT`** | Emitted when process receives `Ctrl + C` termination signal from terminal. | Useful for graceful server shutdown. |

---

## 3. `beforeExit` vs. `exit` Detailed Comparison

Understanding the difference between `beforeExit` and `exit` is critical for clean process shutdown and resource management.

### A. `beforeExit`
* **When it runs**: When the event loop becomes empty and Node is about to exit naturally.
* **Asynchronous capabilities**: If you schedule asynchronous operations (e.g. `setTimeout`, `fs.readFile`, DB queries) inside a `beforeExit` listener, Node.js will **not** terminate immediately! It will process those async operations, re-entering the event loop until it becomes empty again.
* **When it DOES NOT run**: If `process.exit()` is called explicitly, or if an uncaught exception crashes the application.

```js
process.on('beforeExit', (code) => {
    console.log(`Event loop is empty! Exit code: ${code}`);
    // Async tasks scheduled here WILL execute before final shutdown!
});
```

### B. `exit`
* **When it runs**: Directly prior to process exit, whether caused by an empty event loop or an explicit call to `process.exit()`.
* **Synchronous restriction**: Once the `exit` event listener returns, the Node.js process terminates immediately. **Any scheduled asynchronous work (timers, promises, I/O) is completely dropped and ignored.**

```js
process.on('exit', (code) => {
    console.log(`Process terminating with code ${code}`);
    // ONLY synchronous code works here (e.g., closing file descriptors synchronously)
});
```
