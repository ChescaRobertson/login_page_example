const client = require('./db.js');

function processAdmin(req, res) {
  let tableName = 'testtable';
  let myQuery = `SELECT * FROM "${tableName}"`;
  client.query(myQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      let data = result.rows;
      res.render('admin', { data: data });
    }
  });
}

function makeAdmin(params, req, res) {
  let id = params.hiddenAdminId;

  let tableName = 'testtable';
  let myQuery = `UPDATE "${tableName}" SET "isAdmin" = 'Y' WHERE id = ${id}`;
  client.query(myQuery, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      processAdmin(req, res);
    }
  });
}

function removeAdmin(params, req, res) {
  let id = params.hiddenRemoveAdminId;

  let tableName = 'testtable';
  let myQuery = `UPDATE "${tableName}" SET "isAdmin" = 'N' WHERE id = ${id}`;
  client.query(myQuery, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      processAdmin(req, res);
    }
  });
}

module.exports = {
  processAdmin,
  makeAdmin,
  removeAdmin,
};
