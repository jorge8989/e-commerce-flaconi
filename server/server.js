const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const env = process.env;
const port = env.PORT || 4000;
const publicPath = path.resolve(__dirname, '../www');

// configs

app.use('/', express.static(publicPath));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// routes
app.get('/resources', (req, res) => {
  fs.readFile('resources/productlist.json', 'utf8', function (err, data) {
    res.json(JSON.parse(data));
  });
});

// run the server
app.listen(port, '0.0.0.0', function () {
  console.log('Server running on port ' + port);
});
