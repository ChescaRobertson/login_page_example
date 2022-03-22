class User {
  constructor(id, f_name, l_name, username, password, is_admin) {
    this.id = id;
    this.firstName = f_name;
    this.lastName = l_name;
    this.username = username;
    this.password = password;
    this.isAdmin = is_admin;
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
