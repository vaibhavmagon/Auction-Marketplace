#!/usr/bin/sh

node db.js
npm install
bower install
forever start server.js