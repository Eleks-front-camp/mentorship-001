// import Google api library
var { google } = require('googleapis');
// import the Google drive module in google library
var drive = google.drive('v3');
// import our private key
var key = require('../private-key.json');

var jwToken = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key, ['https://www.googleapis.com/auth/drive'],
  null
);

jwToken.authorize((authErr) => {
  if (authErr) {
    console.log('error : ' + authErr);
    return;
  } else {
    console.log('Authorization accorded');
  }
});

// list file in speciifcs folder
var parents = "1vJGihEqFYgW1TfeEMotfJ8jx-IvPGwEI"

var express = require('express');
var router = express.Router();

router.get('/soundsList', function (req, res) {
  drive.files.list({
    auth: jwToken,
    q: "'" + parents + "' in parents and trashed=false",
    fields: 'files(id, name, size, mimeType, properties)',
  }, (err, { data }) => {
    if (err) return console.log('The API returned an error: ' + err);
    const files = data.files;

    if (files.length) {
      res.json(files);
    } else {
      console.log('No files found.');
    }
  });
});

module.exports = router;