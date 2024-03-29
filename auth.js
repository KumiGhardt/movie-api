//login endpoint

const jwtSecret = 'your_jwt_secret'
const jwt = require('jsonwebtoken'),
    passport = require('passport');

require('./passport');

/**
 * generate JWT token
 * subject-This is the username you’re encoding in the JWT
 * expires- This specifies that the token will expire in 7 days
 * algorithm- This is the algorithm used to “sign” or encode the values of the JWT
 * 
 * @param {string} user - the user whose details we are gathering
 * @returns JWTToken
 **/
 
let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        subject: user.Username, 
        expiresIn: '7d', 
        algorithm: 'HS256' 
    });
}


/**
 *  a module that exports the authentication routing
 * @module router 
*/
module.exports = (router) => {
router.post('/login', (req, res) => {
    passport.authenticate('local', {
        session: false
    }, (error, user, info) => {
        if (error || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }
        req.login(user, {
            session: false
        }, (error) => {
            if (error) {
                res.send(error);
            }
            let token = generateJWTToken(user.toJSON());
            return res.json({
                user,
                token
            });
        });
    })(req, res);
});
}
