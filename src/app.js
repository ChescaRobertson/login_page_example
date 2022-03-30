const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');

const editProfile = require('./editProfile');
const currentUser = require('./currentUser');
const userFunctions = require('./userFunctions');
const adminFunctions = require('./adminFunctions');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', 'views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  currentUser.logoutUser();
  res.render('login', { message: '' });
});

app.post('/login', (req, res) => {
  currentUser.processLogin(req.body, res);
});

app.get('/register', (req, res) => {
  res.render('register', { message: '' });
});

app.post('/register', (req, res) => {
  userFunctions.createUser(req.body, res);
});

app.get('/edit', (req, res) => {
  if (currentUser.isLoggedIn()) {
    editProfile.processEditProfile(req, res);
  } else {
    res.render('login', { message: '' });
  }
});

app.get('/welcome', (req, res) => {
  if (currentUser.isLoggedIn()) {
    userFunctions.getUserData(req, res);
  } else {
    res.render('login', { message: '' });
  }
});

app.post('/edit', (req, res) => {
  let newPassword = req.body.password;
  if (newPassword === currentUser.user.getPassword) {
    res.render('welcome', {
      firstName: currentUser.user.getFirstName,
      lastName: currentUser.user.getLastName,
      message: '',
    });
  } else {
    userFunctions.updateProfile(newPassword, res);
  }
});

app.get('/admin', (req, res) => {
  if (currentUser.isLoggedIn()) {
    adminFunctions.processAdmin(req, res);
  } else {
    res.render('login', { message: '' });
  }
});

app.post('/makeAdmin', (req, res) => {
  adminFunctions.makeAdmin(req.body, req, res);
});

app.post('/removeAdmin', (req, res) => {
  adminFunctions.removeAdmin(req.body, req, res);
});

app.post('/deleteUser', (req, res) => {
  userFunctions.deleteUser(req.body, req, res);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
