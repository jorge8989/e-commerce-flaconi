const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const env = process.env;
const port = env.PORT || 4000;
const publicPath = path.resolve(__dirname, '../www');

// configs
app.use('/', express.static(publicPath));

// routes
app.get('/resources', (req, res) => {
  fs.readFile('resources/productlist.json', 'utf8', function (err, data) {
    res.end(data);
  });
});

// run the server
app.listen(port, '0.0.0.0', function () {
  console.log('Server running on port ' + port);
});
