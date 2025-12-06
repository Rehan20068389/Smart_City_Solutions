//Referance from chatgpt

const jwt = require('jsonwebtoken');
const { User } = require('../models'); 

module.exports = async (req, res, next) => {
  try {
    const header = req.headers.authorization;//here it reads the authorization header from the coming http request
    if (!header || !header.startsWith('Bearer ')) { //checking if it exits there and starts for the standard for jwts
      req.user = null; //it is used to know that this routes request is unauthenticated 
      return next();
    }

    const token = header.split(' ')[1]; //its used to extracts the acutal token 
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');// 0 results for if invaild ,it throws an error and will jumps to catch block

    const user = await User.findByPk(decoded.id, {// here it fetches the user from the DB by the ID from the decoded token from the above
      attributes: ['id', 'name', 'email', 'role']
    });

    if (!user) {
      req.user = null;
      return next();
    }

    req.user = { id: user.id, name: user.name, 
      email: user.email, role: user.role };//gives the user details to the request object
    next();
  } catch (err) {
    console.error("Auth error:", err);
    req.user = null;
    next();
  }
};
