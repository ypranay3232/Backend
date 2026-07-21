const EventEmitter = require('events');

// EventEmitter is a core Node.js module for building event-driven architectures.
// `.on(eventName, listener)` registers a callback function to be executed 
// every time the event is emitted via `.emit(eventName)`.

const Champion = new EventEmitter();

// Register multiple listeners for the same event
Champion.on('won the race', (time) => {
    console.log(`[Listener 1]: Congrats! Champion won the race in ${time} seconds.`);
});

Champion.on('won the race', (time) => {
    console.log(`[Listener 2]: Awarding Gold Medal `);
});

// `.once()` listens for an event only ONE time
Champion.once('won the race', () => {
    console.log(`[Listener 3 (once)]: Hall of fame entry recorded.`);
});

console.log("--- Emitting 'won the race' (1st time) ---");
Champion.emit('won the race', 9.58);

console.log("\n--- Emitting 'won the race' (2nd time) ---");
Champion.emit('won the race', 9.63); // Notice Listener 3 won't run this time!


// In Node.js, the global `process` object inherits from `EventEmitter`.
// We can use `process.on()` to listen for system-level process events.

// A. `beforeExit` Event
// ----------------------
// Triggered when Node.js has emptied its Event Loop and has no further work to schedule.
// IMPORTANT: `beforeExit` CAN schedule asynchronous work (like setTimeout, Promises, I/O).
// Node will stay alive to execute that new asynchronous work!
process.on('beforeExit', (code) => {
    console.log(`\n [process.on('beforeExit')]: Event loop is empty! Exit code: ${code}`);
    console.log(" Performing async cleanup before final shutdown...");
});

// B. `exit` Event
// ----------------
// Triggered right before the Node.js process terminates (either naturally or via process.exit()).
// CRITICAL LIMITATION: Listeners for 'exit' MUST ONLY execute SYNCHRONOUS code.
// Any async work (setTimeout, Promises, I/O) scheduled inside 'exit' WILL BE IGNORED.
process.on('exit', (code) => {
    console.log(` [process.on('exit')]: Process is terminating NOW with exit code: ${code}`);
    console.log("   Only synchronous cleanup is allowed here.");
});

// C. `uncaughtException` & `unhandledRejection`
// ---------------------------------------------
// Used to catch unhandled errors globally so the app doesn't crash silently.
process.on('uncaughtException', (err) => {
    console.error(` [process.on('uncaughtException')]: ${err.message}`);
});