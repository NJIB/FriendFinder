// Dependencies
require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('promise-mysql');

const app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8080;

// Parse request body as JSON
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Global variable that will hold DB connection
let dbConnection;

// Use Handlebars to render the main index.html page with the plans in it.
app.get('/', async (req, res) => {
  try {
    const data = await dbConnection.query('SELECT * FROM plans');
    res.render('index', {plans: data});
  } catch (error) {
    res.status(500).send(`${error.name}: ${error.message}`);
  }
});

// Create a new plan
app.post('/api/plans', async (req, res) => {
  try {
    const result = await dbConnection.query(
        'INSERT INTO plans (plan) VALUES (?)',
        [req.body.plan],
    );
    // Send back the ID of the new plan
    res.json({id: result.insertId});
    console.log({id: result.insertId});
  } catch (error) {
    res.status(500).send(`${error.name}: ${error.message}`);
  }
});

// Update a plan
app.put('/api/plans/:id', async (req, res) => {
  try {
    const result = await dbConnection.query(
        'UPDATE plans SET plan = ? WHERE id = ?',
        [req.body.plan, req.params.id],
    );
    const status = result.changedRows === 0 ? 404 : 200;
    res.status(status).end();
  } catch (error) {
    // If an error occurred, send info about the error
    res.status(500).send(`${error.name}: ${error.message}`);
  }
});

// Delete a plan
app.delete('/api/plans/:id', async (req, res) => {
  try {
    const result = await dbConnection.query(
        'DELETE FROM plans WHERE id = ?',
        [req.params.id],
    );
    const status = result.affectedRows === 0 ? 404 : 200;
    res.status(status).end();
  } catch (error) {
    // If an error occurred, send info about the error
    res.status(500).send(`${error.name}: ${error.message}`);
  }
});

// Start our server so that it can begin listening to client requests.
// Once server has started up, set up the DB connection
app.listen(PORT, async function() {
  // Log (server-side) when our server has started
  console.log(`SERVER LISTENING ON: http://localhost:${PORT}`);
  console.log('----------------------------');

  // Now that server is listening,
  // create DB Connection
  try {
    dbConnection = await mysql.createConnection(require('./db-config'));
  } catch (error) {
    console.log('ERROR: DB CONNECTION FAILED');
    console.table(error);
    process.exit(1);
  }
  console.log('DATABASE CONNECTION ESTABLISHED');
  console.table(dbConnection.config);
});
