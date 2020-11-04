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

var addr = "localhost"; // We'll need to set this to the server's public-facing IP somehow.
var port = server.address().port;


// Database
//const db = new DatabaseService(); // Manages access to the database. Many components below will use this.

// Scraping
//const scrape = new ScrapeService(); // The code that scrapes from the BC COVID-19 site.

// Bot
//const bot = new BotService(); // Handles running the bots and showing users where they can manage bots
//app.use('/bot', ...) // TBD Main webpage where a user can add a bot to their chat

// Login
//const login = new LoginService(); // Handles login and showing users the login page
//app.use('/login', ...) // TBD Main webpage where a user can login
//app.use('/account', ...) // TBD Main webpage where a user can manage their account

// Dashboard
const dashboard = new DashboardService(addr, port); // 
// Used to serve up the webpage. Users navigate here.
app.use('/dashboard', express.static('./test/dashboard.html'));
// Used to serve up a dynamically generated Javascript file for use in the webpage.
// Wrapping the callback function in an anonymous function preserves the "this" keyword to refer to the dashboard object when inside createClientScript().
// See https://stackoverflow.com/a/20279485
app.use('/js/dashboard', (req, res, next) => dashboard.createClientScript(req, res, next));
// Used as an endpoint for the client's JS file to communicate with the server.
app.use('/api/dashboard', dashboard.handleRequest); // If you don't need "this" in the function, you don't need to wrap it.
console.log(`Started up dashboard service`);
