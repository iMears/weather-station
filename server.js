/*
  server.js

  The HTTP server for our Raspberry Pi Weather Station
*/

"use strict";

const app  = require('./app.js');
const os   = require("os");
const http = require("http");

// Start our server
//
const httpServer = http.createServer(app).listen(process.env.PORT || 8888);

httpServer.on('listening', () => {
  console.log("HTTP server listening on port " + httpServer.address().port + " on " + os.hostname());
});

// Clean shutdown
//
process.on('SIGTERM', () => {
  console.log('[SIGTERM] Initiating graceful shutdown...');

  httpServer.close(() => {
    console.log('HTTP server closed remaining connections. Exiting now.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('[SIGINT] Initiating graceful shutdown...');

  httpServer.close(() => {
    console.log('HTTP server closed remaining connections. Exiting now.');
    process.exit(0);
  });
});
