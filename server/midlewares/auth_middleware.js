const jwt = require("jsonwebtoken");
const newUser = require("../models/user");

var checkUserAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
        
        // Get token from Headers

      token = authorization.split(" ")[1];
      // verify token
      const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // get user from token
      req.user = await newUser.findById(userID).select('-password');
    //   console.log(req.user);
      
      next();
    } catch (error) {
      res.send({
        status: "faild",
        message: "Unathorized User",
      });
    }
  }
  if(!token)
  {
    res.status(401).send({
        "status":'faild',
        "message":"Unathorized User, No Token"
    })
  }
};


module.exports=checkUserAuth;