const crypto = require('crypto');
const { promisify } = require('util');

const scrypt = promisify(crypto.scrypt);
const KEY_LENGTH = 64;
const SALT_LENGTH = 16;
const SCRYPT_OPTIONS = {
  N: 16384,
  r: 8,
  p: 1,
  maxmem: 32 * 1024 * 1024,
};

function encode(value) {
  return value.toString('base64url');
}

function decode(value) {
  return Buffer.from(value, 'base64url');
}

async function hashPassword(password) {
  if (typeof password !== 'string') {
    throw new TypeError('Password must be a string');
  }

  const salt = crypto.randomBytes(SALT_LENGTH);
  const derivedKey = await scrypt(password, salt, KEY_LENGTH, SCRYPT_OPTIONS);

  return [
    'scrypt',
    `N=${SCRYPT_OPTIONS.N},r=${SCRYPT_OPTIONS.r},p=${SCRYPT_OPTIONS.p}`,
    encode(salt),
    encode(derivedKey),
  ].join('$');
}

async function verifyPassword(password, storedHash) {
  if (typeof password !== 'string' || typeof storedHash !== 'string') {
    return false;
  }

  try {
    const [algorithm, parameters, encodedSalt, encodedKey] = storedHash.split('$');
    if (algorithm !== 'scrypt' || !parameters || !encodedSalt || !encodedKey) {
      return false;
    }

    const parameterValues = Object.fromEntries(
      parameters.split(',').map((parameter) => parameter.split('='))
    );
    const options = {
      N: Number(parameterValues.N),
      r: Number(parameterValues.r),
      p: Number(parameterValues.p),
      maxmem: 32 * 1024 * 1024,
    };
    if (![options.N, options.r, options.p].every(Number.isSafeInteger)) {
      return false;
    }

    const salt = decode(encodedSalt);
    const expectedKey = decode(encodedKey);
    if (salt.length !== SALT_LENGTH || expectedKey.length !== KEY_LENGTH) {
      return false;
    }

    const actualKey = await scrypt(password, salt, KEY_LENGTH, options);

    return crypto.timingSafeEqual(actualKey, expectedKey);
  } catch {
    return false;
  }
}

module.exports = { hashPassword, verifyPassword };