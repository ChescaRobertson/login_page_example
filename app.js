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
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login', { message: '' });
});

app.post('/login', (req, res, next) => {
  processLogin(req.body, res);
});

app.get('/register', (req, res) => {
  res.render('register', { message: '' });
});

app.post('/register', (req, res) => {
  createUser(req.body, res);
});

function createUser(params, res) {
  let f_name = params.f_name;
  let l_name = params.l_name;
  let username = params.username;
  let password = params.password;

  let tableName = 'testtable';
  let columnName = 'f_name, l_name, id, username, password';
  let myQuery = `INSERT INTO "${tableName}" (${columnName}) VALUES ('${f_name}', '${l_name}', DEFAULT, '${username}', '${password}')`;
  client.query(myQuery, (err, result) => {
    if (err) {
      res.render('register', { message: 'Username already exists' });
    } else {
      res.render('login', { message: 'Account registered succesfully' });
    }
  });
}

function processLogin(params, res) {
  let password = params.password;
  let username = params.username;

  let tableName = 'testtable';
  let columnName = 'username';
  let myQuery = `SELECT password FROM "${tableName}" WHERE ${columnName} = '${username}'`;
  client.query(myQuery, (err, result) => {
    try {
      if (result.rows[0].password === password) {
        getUserData(username, res);
      } else {
        res.render('login', { message: 'Invalid username or password' });
      }
    } catch {
      res.render('login', { message: 'Invalid username or password' });
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
    } else {
      let data = result.rows;
      res.render('welcome', { data: data });
    }
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
