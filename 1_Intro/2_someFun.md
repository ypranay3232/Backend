Installing Node.js

Before running JavaScript outside the browser, you'll need to install Node.js.

Node.js is available in two main versions:

Latest – Includes the newest features and improvements.
LTS (Long-Term Support) – A stable version recommended for most users and production applications.

If you're working on an older project, using the latest version may sometimes cause compatibility issues because certain features or APIs might have changed over time. For most beginners and long-term projects, the LTS version is usually the safest choice.

Verifying the Installation

After installing Node.js, open your terminal and type:

node

If the installation was successful, you'll enter an interactive JavaScript environment where you can execute JavaScript directly from the terminal.

Running JavaScript in the Terminal

Try typing the following commands one by one:

console.log("Hello World")
"Hello" + " World"
const hw = "Hello World"

hw

Unlike a browser, you're now running JavaScript directly using Node.js.

What is REPL?

The interactive terminal provided by Node.js is called the REPL.

REPL stands for:

Read
Evaluate
Print
Loop

The process is simple:

Read the JavaScript code you type.
Evaluate (execute) the code.
Print the result.
Repeat the process for the next input.

This makes the REPL a great place to quickly test JavaScript code without creating a separate file.

Example
function age() {
    return 100
}

console.log(age())
Running a JavaScript File

Instead of typing code into the REPL, you can save it in a file (for example, app.js) and execute it with:

node app.js
Example Program
const goal = "code"

if (goal === "code") {
    console.log("It's fun")
} else {
    console.log("Other than " + goal + " is not fun")
}

Using node <filename> executes the entire JavaScript file, making it the standard way to run Node.js applications.