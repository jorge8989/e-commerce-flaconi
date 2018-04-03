const express = require('express');
const path = require('path');

const app = express();
const env = process.env;
const port = env.PORT || 3001;
const publicPath = path.resolve(__dirname, '../www');

// configs
app.use('/', express.static(publicPath));

app.get('/data', (req, res) => {
  console.log('hello');
  console.log(res);
});

// run the server
app.listen(port, '0.0.0.0', function () {
  console.log('Server running on port ' + port);
});
