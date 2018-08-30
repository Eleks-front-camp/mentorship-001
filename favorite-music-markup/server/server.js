var express = require('express');
var path = require('path');

var port = process.env.PORT || 3000;

var app = express();
var soundsList = require('./routers/sounds-list');

// Set Static Folder
app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/api', soundsList);

app.listen(port, () => {
  console.log('Server started on port http://localhost:' + port);
});