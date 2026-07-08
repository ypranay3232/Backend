How is Node.js Different from JavaScript?
What is JavaScript?

JavaScript is a programming language. It is used to add logic, interactivity, and dynamic behavior to applications.

By itself, JavaScript cannot run. It needs a JavaScript runtime (an environment) that understands and executes JavaScript code.

What is a JavaScript Engine?

A JavaScript engine is a program that reads JavaScript code, compiles it into machine code, and executes it.

One of the most popular JavaScript engines is V8, developed by Google.

How it works
JavaScript Code
        │
        ▼
 JavaScript Engine (V8)
        │
        ▼
 Machine Code
        │
        ▼
 CPU executes the instructions

The JavaScript engine does not convert JavaScript into something the browser understands. Instead, it converts JavaScript into machine code, which your computer's CPU can execute.

What is Node.js?

Node.js is not a programming language.

Node.js is a JavaScript runtime environment built on Google's V8 JavaScript Engine.

It allows JavaScript to run outside the browser, such as on your computer or a server.

JavaScript
     │
     ▼
 Node.js Runtime
     │
     ├── V8 Engine (executes JavaScript)
     ├── File System API
     ├── HTTP Module
     ├── Crypto Module
     ├── Timers
     └── Other Node APIs

When JavaScript runs in a browser, the browser provides extra features like:

DOM (Document Object Model)
window
document
localStorage
fetch
alert()


Example:
document.getElementById("title");

This works because the browser provides the document object.

Node.js does not have these browser APIs.

Instead, it provides server-side APIs such as:

File System (fs)
HTTP (http)
Path (path)
OS (os)
Process (process)
Streams
Crypto

Example:

const fs = require("fs");

const data = fs.readFileSync("notes.txt", "utf8");
console.log(data);

This reads a file from your computer, which browsers cannot do for security reasons.

Why was Node.js created?

Before Node.js existed:

JavaScript only ran inside browsers.
Backend development was done using languages like Java, PHP, Python, or C#.

Node.js allowed developers to use JavaScript for backend development, making it possible to build full-stack applications using a single language.

How Node.js Executes JavaScript
You write JavaScript
        │
        ▼
Node.js receives the code
        │
        ▼
V8 Engine compiles it into machine code
        │
        ▼
Node.js provides APIs (fs, http, timers, etc.)
        │
        ▼
Operating System
        │
        ▼
Computer Hardware
Is Node.js the Same as V8?

No.

V8 is only the JavaScript engine.

Node.js includes:

V8 Engine
Node APIs
Event Loop
Module System
Package support (npm)
C++ bindings to communicate with the operating system

Think of it like this:

Node.js
│
├── V8 Engine
├── Event Loop
├── File System
├── HTTP Module
├── Timers
├── Process API
└── Other Node Features
The Event Loop

One of Node.js's biggest features is its event-driven, non-blocking architecture.

Instead of waiting for one task to finish before starting another, Node.js can continue handling other tasks while slow operations (like reading a file or making a network request) happen in the background.

Example:

console.log("Start");

setTimeout(() => {
  console.log("Done");
}, 2000);

console.log("End");

Output:

Start
End
Done

The setTimeout callback is handled asynchronously, allowing the rest of the code to continue executing.

npm

Node.js comes with npm (Node Package Manager).

npm allows you to install libraries created by other developers.

Example:

npm install express

Now you can use Express in your project instead of building everything from scratch.