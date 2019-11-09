# FriendFinder

Friend Finder is an application incorporating both front-end design and server-side technologies.  Technologies leveraged include:  HTML, CSS, Javascript, jQuery, Node.js, and Express server, among others.

The application is launched through the Terminal, then the bulk of the navigation takes place in the browser (localhost:8080).

Once the server has been started and the browser launched, the user arrives at the home page.  Here they can either view all friends available (via a GET method), or press a button to enter a new record along with responses to the 10 questions asked.  This is handled via routing functions.

When the user hits 'Submit' on the survey page, a POST function saves the record object to the friends.js file, and also triggers the scoring logic.  Converting the JSON object to an array, the function compares the most recent entry to the stored records, calcuting the difference in score for each of the 10 questions.  Totalling the variance, the program returns the name of the individual with the smallest variance to the score of the record just entered.  The name of this record (person) is then returned via a browser alert.

This application is deployed to Heroku via the link:  

