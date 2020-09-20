// signin: function(req, res) {
//   var formEmail = req.body.email;
//   var formPassword = req.body.password;
//
//   User.findOne({
//     where: {
//       email: formEmail
//     }
//   }).then(function(user) {
//     if (user) {
//       if (user.password == formPassword) {
//         console.log('User connected');
//         req.session.email = formEmail;
//         req.session.password = formPassword;
//         console.log(req.session);
//         res.status(200).send('User Authentified');
//       } else {
//         res.status(401).send('Invalid Password');
//       }
//     } else {
//       res.status(401).send('Username');
//     }
//   });
// },