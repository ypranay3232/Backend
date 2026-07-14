const fs = require("fs");
const EventEmitter = require("events");

// ==========================================
// 📌 EXAMPLE 1: Event Loop Phase Order & Microtasks
// ==========================================
function runEventLoopDemo() {
    console.log("--- Starting Event Loop Demo ---");

    // 1. Synchronous Code (Call Stack) - Executes immediately
    console.log("1. Synchronous Main Line");

    // 2. Timers Phase - setTimeout (0ms is actually usually 1ms internally)
    setTimeout(() => {
        console.log("5. setTimeout (Timer Phase) - 0ms");
    }, 0);

    setTimeout(() => {
        console.log("8. setTimeout (Timer Phase) - 100ms");
    }, 100);

    // 3. Check Phase - setImmediate
    setImmediate(() => {
        console.log("6. setImmediate (Check Phase)");
    });

    // 4. Microtasks - process.nextTick (Highest priority microtask)
    process.nextTick(() => {
        console.log("3. process.nextTick (Microtask - executes before next phase)");
    });

    // 5. Microtasks - Promises (Second highest priority microtask)
    Promise.resolve().then(() => {
        console.log("4. Promise.resolve() (Microtask - executes before next phase)");
    });

    // 6. Poll Phase (I/O Callbacks)
    fs.readFile(__filename, () => {
        console.log("7. fs.readFile (Poll Phase/I/O callback)");

        // INSIDE I/O Callback: 
        // Here, the Event Loop is currently in the Poll Phase.
        // It will progress to Check Phase next, and then Close phase, and finally back to Timers.
        
        setTimeout(() => {
            console.log("10. setTimeout inside I/O callback (Timer Phase - next loop)");
        }, 0);

        setImmediate(() => {
            console.log("9. setImmediate inside I/O callback (Check Phase - runs immediately after Poll)");
        });
    });

    console.log("2. Synchronous Main Line End");
}


// ==========================================
// 📌 EXAMPLE 2: CPU-Blocking vs Asynchronous I/O
// ==========================================
function runBlockingDemo() {
    console.log("\n--- Starting CPU-Blocking Demo ---");
    
    const startTime = Date.now();

    // Schedule a non-blocking timeout
    setTimeout(() => {
        console.log(`setTimeout executed after ${Date.now() - startTime}ms (should be ~50ms)`);
    }, 50);

    // Simulate heavy CPU-bound task (blocks the Event Loop)
    console.log("Starting heavy CPU task...");
    while (Date.now() - startTime < 200) {
        // Block the thread for 200ms
    }
    console.log("Heavy CPU task completed!");
}


// ==========================================
// 📌 EXAMPLE 3: The Observer Pattern using EventEmitter
// ==========================================
class JobQueue extends EventEmitter {
    constructor() {
        super();
    }

    addJob(jobName) {
        console.log(`Job Added: ${jobName}`);
        // Notify all registered observers (listeners)
        this.emit("job_added", jobName);
    }

    completeJob(jobName) {
        console.log(`Job Completed: ${jobName}`);
        // Notify all registered observers (listeners)
        this.emit("job_completed", jobName);
    }
}

function runObserverDemo() {
    console.log("\n--- Starting Observer Pattern Demo ---");

    const myJobQueue = new JobQueue();

    // Register Observers (Listeners)
    myJobQueue.on("job_added", (name) => {
        console.log(`[Notification System]: Sending email about new job: ${name}`);
    });

    myJobQueue.on("job_added", (name) => {
        console.log(`[Logs System]: Logging job creation for: ${name}`);
    });

    myJobQueue.on("job_completed", (name) => {
        console.log(`[Billing System]: Generating invoice for completed job: ${name}`);
    });

    // Trigger events (Emit)
    myJobQueue.addJob("Deploy Backend Server");
    myJobQueue.completeJob("Deploy Backend Server");
}


// Run all demos:
runEventLoopDemo();
setTimeout(() => runBlockingDemo(), 150); // wait for Event Loop demo to mostly print
setTimeout(() => runObserverDemo(), 400); // wait for blocking demo to print

