
const config = require('./config')

const DatabaseService = require('./database.js');
const { ScrapeService }= require('./scrape.js');
const BotService = require('./bot.js');

const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const cors = require('cors')

const app = express(feathers());
app.use(cors())

// Parse HTTP JSON bodies
app.use(express.json());
// Parse URL-encoded params
app.use(express.urlencoded({ extended: true }));
// Add REST API support
app.configure(express.rest());
// Configure Socket.io real-time APIs
app.configure(socketio());
app.use(express.errorHandler());

// Get an open port: https://stackoverflow.com/a/54464386
const server = app.listen(config.port, config.host, function() {
    console.log(`Backend is listening on port ${server.address().port}...`);
});

// const addr = "localhost"; // We may need to set this to the server's public-facing IP somehow.
// const port = server.address().port;

// Database
const db = new DatabaseService(); // Manages access to the database. Many components will use this.
//console.log('DatabaseService is active.')

// Scraping
const scrapeService = new ScrapeService(); // The code that scrapes from the BC COVID-19 site.
scrapeService.find(); // Preload
app.use('/scrape', scrapeService)
console.log('ScrapeService is active.')

// Bot
const bot = new BotService(); // Handles running the bots and showing users where they can manage bots
//app.use('/bot', ...)

// Login
//const login = new LoginService(); // Handles login and showing users the login page
//app.use('/login', ...)
//app.use('/account', ...)
