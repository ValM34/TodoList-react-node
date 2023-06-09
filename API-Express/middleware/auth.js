const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization; 
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY); 
    const userId = decodedToken.userId;
    req.auth = { userId }; 
    if (Number(req.body.userId) && Number(req.body.userId) !== userId) { 
      throw '403: unauthorized request'; 
    } else { 
      next(); 
    }
  } catch (error) {
    res.status(401).json({ error: 'Requête non authentifiée !' });
  }
};