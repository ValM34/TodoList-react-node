var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = process.env.TOKEN_KEY;

// Exported functions
module.exports = {
  generateTokenForUser: function(userData) {
    console.log(process.env)
    return jwt.sign({
      userId: userData.id,
      isAdmin: userData.isAdmin
    },
    JWT_SIGN_SECRET,
    {
      expiresIn: '720h'
    })
  },
  parseAuthorization: function(authorization) {
    return (authorization != null) ? req.headers["authorization"] : null;
  },
  getUserId: function(authorization) {
    var userId = -1;
    var token = module.exports.parseAuthorization(authorization);
    if(token != null) {
      try {
        var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
        if(jwtToken != null)
          userId = jwtToken.userId;
      } catch(err) { }
    }
    return userId;
  }
}