module.exports = function(app) {
  // Routes
  // =============================================================
  const path = require('path');
  // Basic route that sends the user first to the AJAX Page
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../../client/home.html'));
  });

  app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname, '../../client/home.html'));
  });

  app.get('/reserve', function(req, res) {
    res.sendFile(path.join(__dirname, '../../client/survey.html'));
  });

  app.get('/tables', function(req, res) {
    res.sendFile(path.join(__dirname, '../../client//survey.html'));
  });
};