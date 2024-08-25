const express = require('express');
const path = require('path');

const app = express();
const buildPath = path.join(__dirname, '../frontend/build');

// Serve static files from the React app
app.use(express.static(buildPath));

// The "catchall" handler: for any request that doesn't
// match one above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

module.exports = app;