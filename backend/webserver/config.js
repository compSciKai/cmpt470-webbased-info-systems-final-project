const process = require('process');

console.log(process.env.BACKEND_HOST)

module.exports = {
    port: process.env.BACKEND_PORT || 1234,
    host: process.env.BACKEND_HOST || 'localhost'
}