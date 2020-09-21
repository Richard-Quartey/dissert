//organising code to create all routes that you needs
const express = require('express');

const router = express.Router();

const fs = require('fs');

var flash = require('connect-flash');

const bodyParser = require('body-parser')

const ejs = require("ejs");
//
const path = require("path");

// var alert = require("alert");

var app = express();

app.set("view engine", "hbs");
// const users = [];


// const publicDirectory = path.join(__dirname, '*.cyberXploit.png');
const publicDirectory = path.join(__dirname, './public');
router.use(express.static(publicDirectory));

router.use(flash());



router.get('/', (req, res) => {
  // *******************************
  // const {
  //   userId
  // } =
  // console.log(userId);

  res.render('index')
});


//2.getting forms
router.get('/signup', (req, res) => {
  res.render('signup');
});

// ********************************************
router.get('/signin', (req, res) => {
  // req.session.userId =
  res.render('signin');
});

router.get('/secrets/file/pages/secret', function(req, res, next) {
  res.render('secret', {
    message: '🏆Congratulations!!!🏆 You completed the Security Misconfiguration leading to Path Traversal vulnerability task. Path traversal is a security vulnerability that occurs when software uses attacker-controlled input to construct a pathname to a directory or file located outside of the restricted directory. An attacker might be able to read arbitrary files on the target system. Security Misconfigurations can lead to a Path Traversal attack. Security Misconfigurations occur when one fails to implement all the security controls for a server or web application, or implementing the security controls, but doing so with errors ⭐⭐⭐⭐⭐'
  })
  // res.send(`
  // <h3>Page Not Found. The requested URL /page.html was not found on this server. For files you can try to target its specific path. If you know the filename append it to the localhost path e.g. http://localhost:3000/filename.ext</h3>
  // <a href='/'>Home</a>
  // <a href ='/signin'>SignIn</a>
  // <a href = '/signup'>SignUp</a>
  // `)


  //   <a href ='/signin'>SignIn</a>
  //   <a href = '/signup'>SignUp</a>
  //   `)
});

router.get('/secrets', function(req, res) {
  res.status(404).send(`<h2>File or page not found. If you know the page, filename or filepath append it to the current localhost directory e.g. http://localhost:3000/filename.ext. Hint: The file you are looking for is located at http://localhost:3000/secrets/file/pages/secret</h2>
    <a href='/'>Home</a>
  `);
});

router.get('/contact', (req, res) => {
  res.render('contact');
})

//new
router.get('/basket', (req, res) => {
  res.render('basket');
});


router.get('/admin', (req, res) => {
  res.render('admin', {
    message: '🏆Congratulations!!!🏆 You completed the Broken Access Control task. Access control enforces policies such that normal users cannot act outside of their intended permissions. Failures typically lead to unauthorized information disclosure such as unreleased products of store pages etc, modification or destruction of all data, or performing a business function outside of the limits of the user. Hackers bypass access control checks by modifying the URLs,  or the HTML page, or simply using a custom API attack tool ⭐⭐'
  });
});


// router.get('/admin', (req, res, next) => {
//   res.render('admin');
// });


router.get('/logout', function(req, res) {
  res.clearCookie('jwt', 'sid', 'email', 'password', {
    path: '/index'
  });

  res.clearCookie('sid', 'jwt', 'email', 'password', {
    path: '/admin'
  });

  res.clearCookie('email', 'password', 'jwt', 'sid', {
    path: '/index'
  });

  res.clearCookie('password', 'email', 'jwt', 'sid', {
    path: '/index'
  });

  req.session.destroy(function(err) {
    res.render('index', {
      message: 'You have successfully logged out!'

    });
  });
});


//exporting created router [const]
module.exports = app;
module.exports = router;
