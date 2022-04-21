var express = require('express');
var router = express.Router();
var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://postgres:postgres@localhost:5432/postgres");

// Login user.
router.post('/login', async function(req, res, next) {
  const prueba = await db.query("SELECT * FROM ajedrez.users");
  db.any("SELECT * FROM ajedrez.users WHERE username = $1", req.body.username)
        .then(function (data) {
            console.log("user:", data);
            res.send(data);
        })
        .catch(function (error) {
            console.log("ERROR:", error);
            res.send(prueba);
        });
});

// Signup user.
router.post('/signup', async function(req, res, next) {
  const prueba = await db.query("SELECT * FROM ajedrez.users");
  db.any("INSERT INTO ajedrez.users(name, level, type, username, password) VALUES ($1, $2, $3, $4, $5)", [req.body.name, req.body.userLevel, req.body.userType, req.body.username, req.body.password])
        .then(function (data) {
            console.log("user:", data);
            res.send(data);
        })
        .catch(function (error) {
            console.log("ERROR:", error);
            res.send(prueba);
        });
});

// Get Users.
router.get('/users', async function(req, res, next) {
  console.log(req.query.username);
  res.send(await db.query("SELECT * FROM ajedrez.users"));
});

module.exports = router;
