const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// function initialize(passport, getUserByEmail) {
//     const authenticatedUser = async (email, password, done) => {
//         const user = getUserByEmail(email);
//         if (user == null) {
//             return done(null, false, {message: 'no user with that email'});
//         }
//
//         try {
//             if (await bcrypt.compare(password, user.password)){
//                 return done(null, false, {message: 'No account associated with that email'})
//             } else {
//                 return done(null, false, {message: 'Password Incorrect'})
//             }
//
//                 } catch(e) {
//                 return done(e)
//         }
//     }
//     passport.use(new LocalStrategy({
//         usernameField: 'email'
//     }),
//         authenticatedUser)
//     passport.serializeUser((user, done) => {  })
//     passport.deserializeUser((id, done) => {  })
// }
