How JavaScript Runs: From the Browser to Node.js

A beginner-friendly explanation of how JavaScript is executed, why browsers can run it, and how Node.js made it possible to run JavaScript outside the browser.

How Do We Run JavaScript?

A common question beginners ask is:

"If I buy a brand-new laptop, can I immediately run JavaScript?"

The answer is mostly yes, but there's an important detail that many people miss.

When you open a web browser like Google Chrome, press F12, open the Developer Console, and type JavaScript code, it executes instantly. It feels as if your computer understands JavaScript by itself.

In reality, your computer isn't executing JavaScript directly.

The browser is.

Your browser contains a program whose job is to understand and execute JavaScript. Without that program, the JavaScript code you write is simply plain text.

The JavaScript Engine

At the heart of every JavaScript runtime is a JavaScript engine.

A JavaScript engine reads your JavaScript code, understands it, converts it into machine instructions, and executes it.

One of the fastest and most popular JavaScript engines is V8, developed by Google.

The execution flow looks like this:

JavaScript Code
        │
        ▼
   JavaScript Engine (V8)
        │
        ▼
     Machine Code
        │
        ▼
     Program Executes

Google Chrome uses the V8 Engine, which is why it can execute JavaScript so quickly.

This is why people often think Chrome runs JavaScript.

Technically, Chrome runs JavaScript because it contains the V8 engine.

A Small Story

When JavaScript was first created, its world was very small.

It lived entirely inside the browser.

Its purpose was simple: make web pages interactive.

For many years, JavaScript never left the browser because there was no reason for it to.

As browsers became faster, JavaScript engines became more powerful. Google's V8 engine was so fast that developers began wondering:

"If this engine is already capable of running JavaScript so efficiently, why keep it locked inside a browser?"

That simple question completely changed JavaScript's future.

Instead of creating a new programming language for servers, developers realized they could take the V8 engine out of Chrome, wrap it inside another application, and allow JavaScript to run anywhere.

That idea eventually became Node.js.

A Brief History
1995 — JavaScript is Created

Brendan Eich created JavaScript at Netscape.

Its original purpose was to make web pages interactive inside the browser.

1996 — LiveWire

Netscape introduced LiveWire, allowing JavaScript to be used on the server as well.

Although it never became widely popular, it introduced the idea that JavaScript could exist outside the browser.

2008 — Google Chrome and V8

Google released Chrome along with the V8 JavaScript Engine.

V8 dramatically improved JavaScript performance by compiling JavaScript directly into machine code instead of interpreting it line by line.

This made JavaScript significantly faster than before.

2009 — Node.js

Ryan Dahl created Node.js.

Instead of building a new JavaScript engine, he reused Google's V8 engine and surrounded it with additional components that allowed JavaScript to perform tasks beyond what browsers were designed for.

For the first time, JavaScript could be used to build servers, command-line tools, APIs, automation scripts, and many other applications without requiring a browser.

Can JavaScript Run Outside the Browser?

Yes.

JavaScript itself doesn't require a browser.

It only requires a JavaScript runtime.

A runtime is simply an environment that provides everything necessary for JavaScript to execute.

Both of these are JavaScript runtimes:

Web Browsers
Node.js

They both execute JavaScript using a JavaScript engine, but they provide different features around that engine.

What Is a JavaScript Runtime?

A JavaScript runtime is a complete environment that allows JavaScript code to execute.

A runtime typically contains:

A JavaScript Engine (such as V8)
APIs provided by the environment
An event loop
Memory management
Support for asynchronous operations
Additional libraries required by that environment

The JavaScript engine alone only understands the language itself.

Everything beyond the language comes from the runtime.

How Node.js Executes JavaScript

Node.js is built around the V8 engine.

When you run a JavaScript file, the execution flow looks like this:

JavaScript File
        │
        ▼
      Node.js
        │
        ▼
     V8 Engine
        │
        ▼
Executes JavaScript
        │
        ▼
Node.js APIs + Event Loop + libuv

The V8 engine executes pure JavaScript.

Whenever the program needs to perform operations such as file system access, networking, timers, or other asynchronous tasks, Node.js delegates those operations to libuv.

What Is libuv?

libuv is a high-performance, cross-platform C library used internally by Node.js.

Its responsibilities include:

Asynchronous I/O
File system operations
Networking
Timers
Thread pool management
Event loop implementation

Instead of blocking JavaScript while waiting for long-running operations to finish, libuv performs the work in the background and notifies JavaScript when the task is complete.

This is one of the main reasons Node.js can efficiently handle many concurrent operations.

JavaScript vs Runtime APIs

One of the most important concepts to understand is that JavaScript and its runtime are not the same thing.

The JavaScript language is defined by the ECMAScript specification.

Features such as variables, functions, objects, arrays, promises, and classes belong to JavaScript itself.

However, many commonly used features are not part of JavaScript.

They are provided by the runtime.

For example:

Browsers provide APIs like window, document, and fetch().
Node.js provides APIs like global, process, Buffer, fs, and path.

These APIs exist because the runtime adds them—not because they are part of the JavaScript language.

Browser Runtime vs Node.js Runtime

Although both execute JavaScript, they are designed for different environments.

Browser Runtime	Node.js Runtime
Designed for web pages	Designed for servers and system applications
Uses the browser's APIs	Uses Node.js APIs
Has the window object	Has the global object (modern JavaScript also exposes globalThis)
Provides DOM APIs	No DOM support
Provides browser-specific features	Provides file system, networking, and operating system features
Why Doesn't Node.js Have window?

The window object represents a browser window.

Since Node.js does not run inside a browser, there is no browser window to represent.

Instead, Node.js exposes a global object called global, and modern JavaScript environments also support the standardized globalThis, which provides a consistent way to access the global scope across different runtimes.

This difference highlights an important idea:

JavaScript stays the same, but the runtime changes depending on where the code is executed.