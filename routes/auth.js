//copying everything from pages.js to auth.js and editing it to post

const express = require('express');

const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()
//importing authController
//to go one level up you use [..]
//to go one level down you use [/]
const authController = require('../controllers/auth');

const router = express.Router();


router.use(bodyParser.urlencoded({
  extended: true
}))

//POSTING FOR HTML PAGES AND OTHER ELEMENTS THAT TAKE INFORMATION
//you dont need to add the [auth] because you already declared it
//in app.js  [app.use]

//4. grabbing router.post from signup with loads authController which
//is imported for use at the top and function signup is loaded
router.post('/signup', authController.signup);
// res.render('signup');

// ********************************************************
// router.post('/auth/signin', function(request, response) {
//   var email = request.body.email;
//   var password = request.body.password;
//   if (email && password) {
//     db.query('SELECT * FROM accounts WHERE email = "email" AND password = "password"', [username, password], function(error, results, fields) {
//       if (results.length > 0) {
//         request.session.loggedin = true;
//         request.session.email = email;
//         response.redirect('/');
//       } else {
//         response.send('Incorrect Username and/or Password!');
//       }
//       response.end();
//     });
//   } else {
//     response.send('Please enter Username and Password!');
//     response.end();
//   }
// });



// ******************************?
router.post('/signin', authController.signin);
// res.render('signin');

//you will have to create a route the specific page because
//we specified route/auth
router.post('/basket', authController.basket);


router.post('/admin', authController.admin);

// **********************************************
router.post('/signin', jsonParser, function(req, res, next) {
  users.signin(req, res);
});

router.post('/secret', function(req, res) {
  res.status(200).send("secret")
});

// router.post('/')

router.post('/logout', function(req, res) {
  delete req.session.sid;
  sessionStorage.clear();

  // res.status(200).clearCookie('jwt', {
  //   path: '/',
  //   secure: false,
  //   httpOnly: false,
  //   domain: 'http://localhost:3000/logout',
  //   sameSite: true
  // });
  req.session.destroy(function(err) {
    // res.redirect('/');
  });
  res.redirect('/index');
});
//exporting created router [const]
module.exports = router;
// module.exports = app;