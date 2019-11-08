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
    friendDetails.push(req.body);

    // Array for most recent record being saved
    const inputArray = [];

    inputArray.length = 0;
    inputArray.push(req.body.your_name);
    inputArray.push(req.body.photo_link);
    inputArray.push(req.body.q1);
    inputArray.push(req.body.q2);
    inputArray.push(req.body.q3);
    inputArray.push(req.body.q4);
    inputArray.push(req.body.q5);
    inputArray.push(req.body.q6);
    inputArray.push(req.body.q7);
    inputArray.push(req.body.q8);
    inputArray.push(req.body.q9);
    inputArray.push(req.body.q10);

    // Variables to hold score and name of best match
    let bestScore = 51;
    let bestMatch = '';

    // Array to hold each saved record being compared
    const compareArray = [];

    for (let i = 0; i < friendDetails.length -1; i++) {
      compareArray.length = 0;
      compareArray.push(friendDetails[i].your_name);
      compareArray.push(friendDetails[i].photo_link);
      compareArray.push(friendDetails[i].q1);
      compareArray.push(friendDetails[i].q2);
      compareArray.push(friendDetails[i].q3);
      compareArray.push(friendDetails[i].q4);
      compareArray.push(friendDetails[i].q5);
      compareArray.push(friendDetails[i].q6);
      compareArray.push(friendDetails[i].q7);
      compareArray.push(friendDetails[i].q8);
      compareArray.push(friendDetails[i].q9);
      compareArray.push(friendDetails[i].q10);


      let scoreDiff = 0;
      for (let j = 2; j < compareArray.length; j++) {
        scoreDiff = (scoreDiff + (Math.abs(inputArray[j] - compareArray[j])));
      }

      if (scoreDiff < bestScore) {
        bestScore = scoreDiff;
        bestMatch = compareArray[0];
        console.log('===================================================');
        console.log('AFTER Best match: ', bestMatch, '(scoreDiff: ', bestScore, ')');
      }
    }

    // res.json(true);
    res.status(bestMatch);
  });

  // ---------------------------------------------------------------------------
  // This below code clears out
  // the table while working with the functionality.

  app.post('/api/clear', (req, res) => {
    // Empty out the arrays of data
    friendDetails.length = 0;

    res.json({ok: true});
  });
};
