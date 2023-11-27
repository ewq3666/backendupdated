// Example using crypto module for AES encryption
const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = 'your-secret-key';
const iv = crypto.randomBytes(16); // Initialization vector

function encryptData(text) {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted.toString('hex')
  };
}

const encryptedData = encryptData('Your sensitive data');
console.log(encryptedData);
