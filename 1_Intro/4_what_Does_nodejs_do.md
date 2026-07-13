# 📘 Node.js Notes

## What happens when we pass a JavaScript file to the Node.js runtime?

When we execute a JavaScript file using Node.js:

```bash
node app.js
```

The JavaScript file is processed by the **Node.js runtime**, which consists of:

* **V8 JavaScript Engine** (the same engine used by Google Chrome)
* **Node.js APIs**

  * `fs` (File System)
  * `http`
  * `path`
  * `crypto`
  * and many more
* **Node.js Bindings**
* **libuv**

### Flow

```text
JavaScript File
        │
        ▼
    Node.js Runtime
    ├── V8 Engine
    ├── Node.js APIs
    ├── Node.js Bindings
    └── libuv
        │
        ▼
 Executes the JavaScript Code
```

> **Note:** Unlike browser JavaScript, Node.js executes JavaScript **outside the browser**. It does **not** send the JavaScript to the browser unless you're building a web server that serves files.

---

# V8 Engine

The **V8 Engine** is Google's open-source JavaScript engine.

* Used by **Google Chrome**
* Used by **Node.js**
* Converts JavaScript into machine code for fast execution.

---

# Node.js APIs

The V8 engine only understands JavaScript.

Node.js extends JavaScript by providing additional APIs such as:

* `fs` → File System operations
* `http` → Create web servers
* `path` → Handle file paths
* `crypto` → Encryption and hashing
* `os` → Operating System information
* `events` → Event handling

These APIs are implemented internally using **C/C++**.

---

# libuv

`libuv` is a C library used by Node.js.

It provides:

* Event Loop
* Asynchronous I/O
* Thread Pool
* Networking
* File System operations

Many asynchronous operations in Node.js rely on **libuv**.

---

# Where is the File System (fs) module implemented?

Node.js is open source.

GitHub Repository:

https://github.com/nodejs/node

To see how file system operations are implemented internally, explore files like:

```text
libuv/src/win/fs.c
```

This file contains the Windows implementation of the File System API written in **C**.

---

# Synchronous vs Asynchronous

## Synchronous

Synchronous code executes **line by line**.

Each statement waits for the previous one to finish.

Example:

```javascript
console.log("Thread A");
console.log("Thread B");
```

### Output

```text
Thread A
Thread B
```

---

## Asynchronous

Asynchronous code allows certain operations to execute **without blocking** the rest of the program.

Example:

```javascript
setTimeout(() => console.log("Thread A"), 1000);

console.log("Thread B");
```

### Output

```text
Thread B
Thread A
```

Here:

* `setTimeout()` schedules the callback to run later.
* JavaScript continues executing the next statement immediately.
* After 1 second, the callback is executed.

---

# What is Async I/O?

**Async I/O (Asynchronous Input/Output)** allows operations like:

* Reading files
* Writing files
* Network requests
* Database queries

to happen **without stopping** the execution of the rest of the program.

Instead of waiting for the operation to complete, Node.js continues executing other code.

---

### Key Features

* Single-threaded
* Non-blocking I/O
* Event-driven architecture
* Fast execution using the V8 Engine
* Ideal for scalable network applications

---

# Blocking vs Non-Blocking Functions

## Blocking Functions

A blocking function waits until its task is complete before moving to the next line of code.

Example:

```javascript
const fs = require("fs");

const data = fs.readFileSync("file.txt", "utf8");

console.log(data);
console.log("Finished");
```

Execution order:

```text
Read File
↓
Print File Content
↓
Finished
```

The program waits until the file is completely read.

---

## Non-Blocking Functions

A non-blocking function starts its task and immediately moves on to execute the next line of code.

Example:

```javascript
const fs = require("fs");

fs.readFile("file.txt", "utf8", (err, data) => {
    console.log(data);
});

console.log("Finished");
```

Possible output:

```text
Finished
Hello World
```

The file is read in the background while the rest of the program continues executing.

---

# Summary

| Synchronous                | Asynchronous                     |
| -------------------------- | -------------------------------- |
| Executes line by line      | Doesn't wait for long operations |
| Blocking                   | Non-blocking                     |
| Simpler to understand      | Better performance               |
| Slower for I/O-heavy tasks | Ideal for scalable applications  |

# Is Js sync or Async ?
out of the box js is async : one statement executes after another but we can write async code using callbacks etc when a function executes something in near future.