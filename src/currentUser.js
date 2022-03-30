const client = require('./db.js');
const User = require('./user.js');
let user = new User();

function processLogin(params, res) {
  let password = params.password;
  let username = params.username;

  let tableName = 'testtable';
  let columnName = 'username';
  let myQuery = `SELECT password, id, "firstName", "lastName", "isAdmin" FROM "${tableName}" WHERE ${columnName} = '${username}'`;

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
        res.render('welcome', {
          firstName: user.getFirstName,
          lastName: user.getLastName,
          message: '',
          adminlink: '<a href="/admin">Admin</a>',
        });
      } else {
        res.render('login', {
          message: 'Invalid username or password',
        });
      }
    } catch {
      res.render('login', {
        message: 'Invalid username or password',
      });
    }
  });
}

function isLoggedIn() {
  if (user.getUsername === undefined) {
    return false;
  } else {
    return true;
  }
}

function logoutUser() {
  delete user.id;
  delete user.username;
  delete user.password;
  delete user.firstName;
  delete user.lastName;
  delete user.isAdmin;
}

module.exports = {
  processLogin,
  isLoggedIn,
  logoutUser,
  user,
};
