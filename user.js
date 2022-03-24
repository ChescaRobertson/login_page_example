class User {
  constructor(id, firstName, lastName, username, password, isAdmin) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.isAdmin = isAdmin;
  }

  get getId() {
    return this.id;
  }
  get getFirstName() {
    return this.firstName;
  }
  get getLastName() {
    return this.lastName;
  }
  get getUsername() {
    return this.username;
  }
  get getPassword() {
    return this.password;
  }
  get getIsAdmin() {
    return this.isAdmin;
  }

  set setId(id) {
    this.id = id;
  }
  set setFirstName(firstName) {
    this.firstName = firstName;
  }
  set setLastName(lastName) {
    this.lastName = lastName;
  }
  set setUsername(username) {
    this.username = username;
  }
  set setPassword(password) {
    this.password = password;
  }
  set setIsAdmin(isAdmin) {
    this.isAdmin = isAdmin;
  }
}

module.exports = User;
