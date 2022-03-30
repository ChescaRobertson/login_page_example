const client = require('./db.js');
const currentUser = require('./currentUser');
const adminFunctions = require('./adminFunctions');

function createUser(params, res) {
  let firstName = params.firstName;
  let lastName = params.lastName;
  let username = params.username;
  let password = params.password;

  let tableName = 'testtable';
  let columnName = '"firstName","lastName" , id, username, password';
  let myQuery = `INSERT INTO "${tableName}" (${columnName}) VALUES ('${firstName}', '${lastName}', DEFAULT, '${username}', '${password}')`;
  client.query(myQuery, (err) => {
    if (err) {
      res.render('register', { message: 'Username already exists' });
    } else {
      res.render('login', { message: 'Account registered succesfully' });
    }
  });
}

function getUserData(req, res) {
  let username = currentUser.user.getUsername;
  let columnName = 'username';
  let tableName = 'testtable';
  let myQuery = `SELECT * FROM "${tableName}" WHERE ${columnName} = '${username}'`;
  client.query(myQuery, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.render('welcome', {
        firstName: currentUser.user.getFirstName,
        lastName: currentUser.user.getLastName,
        message: '',
      });
    }
  });
}

function deleteUser(params, req, res) {
  let id = params.hiddenId;

  let tableName = 'testtable';
  let myQuery = `DELETE FROM "${tableName}" WHERE id = ${id}`;
  client.query(myQuery, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      adminFunctions.processAdmin(req, res);
    }
  });
}

function updateProfile(newPassword, res) {
  let username = currentUser.user.getUsername;

  let tableName = 'testtable';
  let columnName = 'username';
  let myQuery = `UPDATE "${tableName}" SET password='${newPassword}' WHERE ${columnName} = '${username}'`;
  client.query(myQuery, (err) => {
    if (err) {
      console.log(error);
    } else {
      res.render('welcome', {
        firstName: currentUser.user.getFirstName,
        lastName: currentUser.user.getLastName,
        message: 'Password Updated Succesfully',
      });
    }
  });
}

module.exports = {
  createUser,
  getUserData,
  deleteUser,
  updateProfile,
};
