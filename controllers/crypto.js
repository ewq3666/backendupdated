var crypto = require('crypto');
var mykey = crypto.createDecipher('aes-128-cbc', 'mypassword');