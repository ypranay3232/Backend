// we can also create our own modules in Node.js. A module is simply a JavaScript file that exports some functionality, which can then be imported and used in other files.

// Project: Password hashing and verification with Node.js.

// This example imports the custom password_encryptor module, hashes a password,
// and checks both the original password and an incorrect password.
// Run with: node filename.js [password]

const { hashPassword, verifyPassword } = require('./password_encryptor');

async function main() {
  const password = process.argv[2] || 'correct horse battery staple';
  const storedHash = await hashPassword(password);

  console.log('Store this value in your database:', storedHash);
  console.log('Correct password:', await verifyPassword(password, storedHash));
  console.log('Wrong password:', await verifyPassword(`${password}!`, storedHash));
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});