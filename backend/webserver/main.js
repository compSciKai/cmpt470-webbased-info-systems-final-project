const process = require('process');

const DashboardService = require('./dashboard.js');

const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

const app = express(feathers());

// Parse HTTP JSON bodies
app.use(express.json());
// Parse URL-encoded params
app.use(express.urlencoded({ extended: true }));
// Add REST API support
app.configure(express.rest());
// Configure Socket.io real-time APIs
app.configure(socketio());
app.use(express.errorHandler());

app.use('/', express.static('./test/'));

// Get an open port: https://stackoverflow.com/a/54464386
const server = app.listen(1234, function() {
    console.log(`Listening on port ${server.address().port}...`);
});

var addr = "192.168.0.11"; // We'll need to set this to the server's public-facing IP somehow.
var port = server.address().port;

// Dashboard
const dashboard = new DashboardService(addr, port);

// Used to serve up the webpage. Users navigate here.
app.use('/dashboard', express.static('./test/dashboard.html'));

// Used to serve up a dynamically generated Javascript file for use in the webpage.
// Wrapping the callback function in an anonymous function preserves the "this" keyword to refer to the dashboard object when inside createClientScript().
// See https://stackoverflow.com/a/20279485
app.use('/js/dashboard', (req, res, next) => dashboard.createClientScript(req, res, next));

// Used as an endpoint for the client's JS file to communicate with the server.
app.use('/api/dashboard', dashboard.handleRequest); // If you don't need "this" in the function, you don't need to wrap it.

console.log(`Started up dashboard service`);
