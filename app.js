const express = require('express');
const app = express();
const port = 4000;
const client = require('./db.js');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./user.js');
const { get } = require('express/lib/response');
let user = new User();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', 'views'); // Path to views folder
app.set('view engine', 'ejs'); // Declaring that you are using ejs view engine

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  //logoutUser();
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

app.get('/edit', (req, res) => {
  processEditProfile(req, res);
});

app.post('/edit', (req, res) => {
  let newPassword = req.body.password;
  if (newPassword === user.getPassword) {
    res.render('welcome', {
      firstName: user.getFirstName,
      lastName: user.getLastName,
      message: '',
    });
  } else {
    updateProfile(newPassword, res);
  }
});

app.get('/logout', (req, res) => {});

function createUser(params, res) {
  let firstName = params.firstName;
  let lastName = params.lastName;
  let username = params.username;
  let password = params.password;

  let tableName = 'testtable';
  let columnName = 'f_name, l_name, id, username, password';
  let myQuery = `INSERT INTO "${tableName}" (${columnName}) VALUES ('${firstName}', '${lastName}', DEFAULT, '${username}', '${password}')`;
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
  console.log(password);

  let tableName = 'testtable';
  let columnName = 'username';
  let myQuery = `SELECT password, id, "firstName", "lastName", "isAdmin" FROM "${tableName}" WHERE ${columnName} = '${username}'`;
  console.log(myQuery);
  client.query(myQuery, (err, result) => {
    try {
      console.log(result.rows[0].password);
      if (result.rows[0].password === password) {
        user.setUsername = username;
        user.setPassword = password;
        user.setId = result.rows[0].id;
        user.setFirstName = result.rows[0].firstName;
        user.setLastName = result.rows[0].lastName;
        user.setIsAdmin = result.rows[0].isAdmin;
        console.table(user);
        res.render('welcome', {
          firstName: user.getFirstName,
          lastName: user.getLastName,
          message: '',
        });
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

function processEditProfile(params, res) {
  res.render('edit', {
    username: user.getUsername,
    password: user.getPassword,
    message: '',
  });
}

function updateProfile(newPassword, res) {
  let username = user.getUsername;
  console.log(newPassword);

  let tableName = 'testtable';
  let columnName = 'username';
  let myQuery = `UPDATE "${tableName}" SET password='${newPassword}' WHERE ${columnName} = '${username}'`;
  console.log(myQuery);
  client.query(myQuery, (err, result) => {
    if (err) {
      console.log(error);
    } else {
      res.render('welcome', {
        firstName: user.getFirstName,
        lastName: user.getLastName,
        message: 'Password Updated Succesfully',
      });
    }
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
