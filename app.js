const express = require('express');
const app = express();
const port = 4000;
const client = require('./db.js');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', 'views'); // Path to views folder
app.set('view engine', 'ejs'); // Declaring that you are using ejs view engine

app.get('/', (req, res) => {
  const name = 'Francesca';
  res.render('index', { name: name });
});

app.get('/testdb', (req, res) => {
  getAllData(req, res);
});

app.get('/login', (req, res) => {
  res.render('login', { message: '' });
});

app.post('/login', (req, res, next) => {
  validateUsername(req.body, res);
});

app.get('/register', (req, res) => {
  res.render('register', { message: '' });
});

app.post('/register', (req, res) => {
  UsernameExists(req.body, res);
});

function UsernameExists(params, res) {
  let username = params.username;
  let userexists = false;

  let tableName = 'testtable';
  let columnName = 'username';
  let myQuery = `SELECT ${columnName} FROM "${tableName}"`;
  console.log(myQuery);
  client.query(myQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      for (let i = 0; i < result.rows.length; i++) {
        if (result.rows[i].username === username) {
          res.render('register', { message: 'Username already exists' });
          userexists = true;
          break;
        }
      }
    }
    if (!userexists) {
      createUser(params, res);
    }
  });
}

function createUser(params, res) {
  let f_name = params.f_name;
  let l_name = params.l_name;
  let username = params.username;
  let password = params.password;

  let tableName = 'testtable';
  let columnName = 'f_name, l_name, id, username, password';
  let myQuery = `INSERT INTO "${tableName}" (${columnName}) VALUES ('${f_name}', '${l_name}', DEFAULT, '${username}', '${password}')`;
  console.log(myQuery);
  client.query(myQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.render('login', { message: 'Account registered succesfully' });
    }
  });
}

function validateUsername(params, res) {
  let username = params.username;
  let userexists = false;

  let tableName = 'testtable';
  let columnName = 'username';
  let myQuery = `SELECT ${columnName} FROM "${tableName}"`;
  console.log(myQuery);
  client.query(myQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      for (let i = 0; i < result.rows.length; i++) {
        if (result.rows[i].username === username) {
          userexists = true;
          validatePassword(params, res);
          break;
        }
      }
      if (!userexists) {
        res.render('login', { message: 'Invalid username or password' });
      }
    }
  });
}

function validatePassword(params, res) {
  let password = params.password;
  let username = params.username;

  let tableName = 'testtable';
  let columnName = 'username';
  let myQuery = `SELECT password FROM "${tableName}" WHERE ${columnName} = '${username}'`;
  console.log(myQuery);
  client.query(myQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      let dbpass = result.rows[0].password;
      if (dbpass === password) {
        getUserData(username, res);
      } else {
        res.render('login', { message: 'Invalid username or password' });
      }
    }
  });
}

function getUserData(username, res) {
  let columnName = 'username';
  let tableName = 'testtable';
  let myQuery = `SELECT * FROM "${tableName}" WHERE ${columnName} = '${username}'`;
  client.query(myQuery, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      let data = result.rows;
      res.render('welcome', { data: data });
    }
  });
}

function getAllData(req, res) {
  let tableName = 'testtable';
  let myQuery = `SELECT * FROM "${tableName}"`;
  client.query(myQuery, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      let data = result.rows;
      res.render('testdb', { data: data });
    }
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Challenge:
// On logon page
// Create paragraph with href to click here to register
// If click: register account page (form, post username, password), post into same form
// Create function
// Insert into table values
// If successful redirect to login page with message
// If unsuccesful error messag
