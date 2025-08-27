import jwt from "jsonwebtoken";

 export const optionalAuthenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; 

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (!err) {
        req.user = user;  
      }
      next(); 
    });
  } else {
    next(); 
  }
};

