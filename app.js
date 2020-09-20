//importing express to make sure we can start our server
var express = require("express");
//importing path
var path = require('path');
//importing our mysql
var mysql = require("mysql");
//importing dotenv
const dotenv = require("dotenv");
//importing the cookie parser
const cookieParser = require("cookie-parser");

var bodyParser = require('body-parser');


// session data localStorage*****************************
const session = require('express-session');


const ONE_HOUR = 1000 * 60 * 60 * 1

const SESS_LIFETIME = process.env.SESS_LIFETIME
const NODE_ENV = process.env.NODE_ENV
const SESS_NAME = process.env.SESS_NAME
const SESS_SECRET = ONE_HOUR;

const IN_PROD = NODE_ENV === 'production'

//telling the dotenv where the file of the extension we want is
dotenv.config({
  path: './.env'
})


//making sure we start the server with app
var app = express();


//creating the database connection
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});


// ******************************

// calling express session as a middleware
app.use(session({
  name: 'sid',
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: IN_PROD,
    maxAge: null,
    sameSite: true,
    httpOnly: false
  }
}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


//where you will put your css or javascript you want to use
const publicDirectory = path.join(__dirname, './public');
// const publicDirectory1 = path.join(__dirname, './public/images');

app.use(express.static(publicDirectory));
// app.use(express.static(publicDirectory1));


//parse URL - encoded bodies (as sent by HTML forms) - making
//sure you can grab data from any forms
app.use(express.urlencoded({
  extended: false
}));
//making sure values grabbed in forms are represented as jsons
app.use(express.json());
//initialising cookieParser so we can set up cookies in browser
app.use(cookieParser());

app.set('view engine', 'hbs');

//connecting the database
db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("MYSQL Connected...");
  }
});

//1. Define ROUTES after creating pages.js file
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));


// *********************************************
// Access the session as req.session
// app.get('/', function(req, res, next) {
//   if (req.session.views) {
//     req.session.views++
//     res.setHeader('Content-Type', 'text/html')
//     res.write('<p>views: ' + req.session.views + '</p>')
//     res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
//     res.end()
//   } else {
//     req.session.views = 1
//     res.end('welcome to the session demo. refresh!')
//   }
// })


// app.get('/signin', function(request, response) {
//   response.sendFile(path.join(__dirname + '/signin'));
// });
//
// app.post('/signin', function(request, response) {
//   var email = request.body.email;
//   var password = request.body.password;
//   if (username && password) {
//     db.query('SELECT * FROM users WHERE username = "email" AND password = "password"', [email, password], function(error, results, fields) {
//       if (results.length > 0) {
//         request.session.email = email;
//         request.session.loggedin = true;
//         response.redirect('/index');
//       } else if (results.length > 0) {
//         email = "admin@admin.com";
//         password = "admin";
//         response.redirect('/admin');
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
//
// app.get('/index', function(request, response) {
//   if (request.session.loggedin) {
//     response.send('Welcome back, ' + request.session.email + '!');
//   } else {
//     response.send('Please login to view this page!');
//   }
//   response.end();
// });

// ************************************************************

//****************************************************************


// CREATE ALERT FROM USER WHEN LOGGED INs
// app.post('/auth/signin', function(req, res) {
//   var user = req.body.email;
//   var password = req.body.password;
//   if ((email == 'admin@admin.com') && (password == 'admin')) {
//     res.status(200).redirect("/admin");
//   } else {
//     res.send(500, 'showAlert');
//   }
// });

// //CREATING ROUTES***************************


// //whenever you go to your homepage / (route)the function will be run
// //with a request(forms) and response what you want to send
// app.get("/", (req, res) => {
//   // res.send("<h1>Home Page</h1>");
//   res.render("index");
// });
//
// //creating a route for our signup page
// app.get("/signup", (req, res) => {
//   // res.send("<h1>Home Page</h1>");
//   res.render("signup");
// });
//
// //creating a route for our signin Page
// app.get("/signin", (req, res) => {
//   // res.send("<h1>Home Page</h1>");
//   res.render("signin");
// });



//configuring the 404 page
app.use((req, res, next) => {
  // res.status(404).send("Page Not Found. The requested URL /page.html was not found on this server. For files you can try to target its specific path. If you know the filename append it to the localhost path e.g. http://localhost:3000/filename.ext");
  req.session.loggedin = true;

  res.send(`
  <h2>Page Not Found. The requested URL /page.html was not found on this server.</h2>
  <a href='/'>Home</a>
  `)
});

// <a href ='/signin'>SignIn</a>
// <a href = '/signup'>SignUp</a>

//tell your browser which port you want to listen
// app.listen(.env.PORT, () => {
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on port 3000");
});

console.log("running");