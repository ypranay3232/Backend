// Here A executes after B which is synchronous. 
console.log("Thread A ")
console.log("Thread B ")

// using async approach : here now thread B executes first  
setTimeout(() => console.log("Thread A"), 1000)
console.log("Thread B");




// Node js and browser contain blocking and non blocking operations such as : 
// node js : 

// Blocking (Synchronous ) : program waits until the execution of a line is completely finished
const fs = require("fs");

const data = fs.readFileSync("4_what_Does_nodejs_do.md", "utf8"); // Blocks execution
// console.log(data);
console.log("Read the file");
console.log("Done");


// Non-blocking (Asynchronous ) : which runs and move to next line 
fs.readFile("4_what_Does_nodejs_do.md", "utf8", (err, data) => {
    // console.log(data);
    console.log("Read the file");
});
console.log("Done");

// Here, readFileSync() blocks the thread, while readFile() lets Node.js continue executing other code.