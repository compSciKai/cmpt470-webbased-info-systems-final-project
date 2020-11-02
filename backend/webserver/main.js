const process = require('process');

const DashboardService = require('./dashboard.js');
const dashboard = new DashboardService();

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

// Dashboard
app.use('/dashboard', express.static('./test/dashboard.html'));
app.use('/api/dashboard', dashboard.handleRequest);

// Get an open port: https://stackoverflow.com/a/54464386
const server = app.listen(1234, function() {
    console.log(`Listening on port ${server.address().port}...`);
});