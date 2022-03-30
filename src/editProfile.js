const currentUser = require('./currentUser');

function processEditProfile(req, res) {
  res.render('edit', {
    username: currentUser.user.getUsername,
    password: currentUser.user.getPassword,
    firstName: currentUser.user.getFirstName,
    lastName: currentUser.user.getLastName,
    message: '',
  });
}

module.exports = {
  processEditProfile,
};
