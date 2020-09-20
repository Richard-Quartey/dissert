const mysql = require("mysql");
// *************************************
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
const cookieParser = require("cookie-parser");

const flash = require('connect-flash');


//********************security features for salting and hashing passwords remember to remove them later
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});


//basket new****************************************
exports.basket = (req, res) => {
  res.render('basket');
};

//admin new****************************************
exports.admin = (req, res) => {
  res.render('admin');
};


// *****************************************
var app = express();

app.use(flash());
// app.use(session({
//   name: 'sid',
//   secret: 'secret',
//   resave: true,
//   saveUninitialized: true
// }));
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
// app.use(bodyParser.json());




exports.signin = (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    if (!email || !password) {
      //forbidden code used for security misconfiguration
      return res.status(400).render('signin', {
        message: 'Please enter an email and password'
      })
    }

    //selecting all columns from database and email and the ?(positional parameters) makes
    //sure we are safe from SQL injections
    // db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
    //   console.log(results);

    // db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
    db.query('SELECT * FROM users WHERE email ="' + email + '" AND password ="' + password + '"', [email, password],
      function(error, results, fields) {
        console.log(results);

        //when theres no result or there is a wrong password
        if (!results || !(password, results[0])) {
          // if (!results) {
          //401 is for forbidden
          res.status(401).render('signin', {
            message: ' Email or Password is not correct'
          })

        } else if (email == "admin@admin.com" && password == "admin") {
          const id = results[0].id;
          //putting unique tokens(long string of numbers) in our cookies
          //when any user logs in a token will be created
          //we need the JWT_SECRET password and token expiry details to create the token
          const token = jwt.sign({
            id: id
          }, process.env.JWT_SECRET, {
            //Token created and JWT_EXPIRES_IN in 90d should be changed to 10 years
            expiresIn: process.env.JWT_EXPIRES_IN
          });

          // console.log("The token is: " + token);

          const cookieOptions = {
            expires: new Date(
              //Set up JWT_COOKIE_EXPIRES for how long cookie should last
              Date.now() + process.env.JWT_COOKIE_EXPIRES * 10 * 24 * 60 * 60 * 1
            ),
            //making sure that cookie can only be set up in a http only environment to prevent hacking
            // httpOnly: true
          }
          //setting up the cookie in the browser
          res.cookie('jwt', token, cookieOptions);
          req.session.email = email;
          req.session.loggedin = true;

          res.status(200).render("admin", {
            message: '🏆 Congratulations!!!🏆 You completed the Broken Authentication task - Broken authentication are several vulnerabilities that attackers exploit to impersonate legitimate users online. Broadly, broken authentication refers to weaknesses in two areas: session management and credential management⭐',
            deleted: true
          });

        } else if ((email == '" or ""="') && (password == '" or ""="')) {
          const id = results[0].id;
          //putting unique tokens(long string of numbers) in our cookies
          //when any user logs in a token will be created
          //we need the JWT_SECRET password and token expiry details to create the token
          const token = jwt.sign({
            id: id
          }, process.env.JWT_SECRET, {
            //Token created and JWT_EXPIRES_IN in 90d should be changed to 10 years
            expiresIn: process.env.JWT_EXPIRES_IN
          });

          // console.log("The token is: " + token);

          const cookieOptions = {
            expires: new Date(
              //Set up JWT_COOKIE_EXPIRES for how long cookie should last
              Date.now() + process.env.JWT_COOKIE_EXPIRES * 10 * 24 * 60 * 60 * 1
            ),
            //making sure that cookie can only be set up in a http only environment to prevent hacking
            // httpOnly: true
          }
          //setting up the cookie in the browser
          res.cookie('jwt', token, cookieOptions);
          req.session.email = email;
          req.session.loggedin = true;

          return res.status(400).render('index', {
            message: '🏆 Congratulations!!!🏆 You completed the SQL Injection task - SQL Injection is a code injection technique that might destroy your database. It is one of the most common web hacking techniques which is achieved by placing malicious code in SQL statements, via web page input ⭐'
          })


        } else {
          const id = results[0].id;
          //putting unique tokens(long string of numbers) in our cookies
          //when any user logs in a token will be created
          //we need the JWT_SECRET password and token expiry details to create the token
          const token = jwt.sign({
            id: id
          }, process.env.JWT_SECRET, {
            //Token created and JWT_EXPIRES_IN in 90d should be changed to 10 years
            expiresIn: process.env.JWT_EXPIRES_IN
          });

          console.log("The token is: " + token);

          const cookieOptions = {
            expires: new Date(
              //Set up JWT_COOKIE_EXPIRES for how long cookie should last
              Date.now() + process.env.JWT_COOKIE_EXPIRES * 10 * 24 * 60 * 60 * 1
            ),
            //making sure that cookie can only be set up in a http only environment to prevent hacking
            // httpOnly: true
          }

          // var newScript = document.createElement("script");
          // var inlineScript = document.createTextNode("alert('Hello');");
          //setting up the cookie in the browser
          res.cookie('jwt', token, cookieOptions);
          req.session.email = email;
          req.session.loggedin = true;
          // res.status(200).redirect("/", {
          res.status(200).render("index", {
            message: 'Hello ' + email + '!'
          });
          // newScript.appendChild(document.createTextNode("alert('Hello')"));
          // target.appendChild(newScript);


        }

      })
    // **********


  } catch (error) {
    console.log(error);
  }

}


//checking to see if we can grap the data form
exports.signup = (req, res) => {
  //5. req.body grabs all data from form
  console.log(req.body);

  const {
    name,
    email,
    password,
    rpassword
  } = req.body;

  //importing database and querying into the database
  // db.query('SELECT email from users WHERE email = ?', [email], (error, results) => {

  // db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
  db.query('SELECT * FROM users WHERE (email ="' + email + '" OR name ="' + name + '") AND password ="' + password + '"', [email, password], function(error, results, fields) {
    var sess = req.session; //initialize session variable
    // req.session.userId = results[0].name; //set user id
    req.session.user = results[0]; //set user name
    // var inlineScript = document.createTextNode("alert('Welcome' + name +);");
    if (error) {
      console.log(error);
    }
    //an email with the same value on the database
    if (results.length > 0) {
      return res.render('signup', {
        message: 'That email is already in use'
      })
      //if the password and the confirm password are different
    }
    // } else if (results == inlineScript)
    //   return res.render('signup', {
    //     message: 'The entered passwords do not match'
    //   });
    else if (password !== rpassword) {
      return res.render('signup', {
        message: 'The entered passwords do not match'
      });
    }

    // //sending information into our data
    // db.query('INSERT INTO users SET ', {
    //   username: "yuri",
    //   email: "yuri@work.com",
    //   password: "yuri"
    // }, (error, results) => {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log(results);
    //   }
    //   return res.redirect('/admin');
    // })


    // sending information into our data
    db.query('INSERT INTO users SET ?', {
      name: name,
      email: email,
      password: password
    }, (error, results) => {
      if (error) {
        console.log(error);
      } else {
        console.log(results);

        return res.render('signup', {
          message: 'User is registered'

        });
        // res.status(200).redirect("/index")

        // res.json({
        //   success: false
        // });
      }

    })

    //******************encrypting passwords (remember to remove async from db query)
    // let hashedPassword = await bcrypt.hash(password, 8);
    // console.log(hashedPassword);


  });

}



// module.exports = app;