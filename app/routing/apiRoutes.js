// =============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on
// table-data, waitinglist, etc.
// =============================================================================

const friendDetails = require('../data/friends');
// const waitListData = require('../data/waitinglistData');


// =============================================================================
// ROUTING
// =============================================================================

module.exports = (app) => {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a
  // JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get('/api/friends', (req, res) => {
    res.json(friendDetails);
  });

  // app.get('/api/waitlist', (req, res) => {
  //   res.json(waitListData);
  // });

  // API POST Requests
  // Below code handles when a user submits
  // a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request...
  // this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post('/api/friends', (req, res) => {
    // Note the code here. Our "server" will respond to
    // requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    // if (friendDetails.length < 5) {
    debugger;
    friendDetails.push(req.body);
    res.json(true);
    // } else {
    //   waitListData.push(req.body);
    //   res.json(false);
    // }
  });

  // ---------------------------------------------------------------------------
  // This below code clears out
  // the table while working with the functionality.

  app.post('/api/clear', (req, res) => {
    // Empty out the arrays of data
    friendDetails.length = 0;
    // waitListData.length = 0;

    res.json({ok: true});
  });
};
