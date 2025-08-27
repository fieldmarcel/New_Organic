// // this middleware will verify whether user is there
// //  or not in database ...to be used in logout
// //  we are creating our middleware for the abve purpose

// import jwt from "jsonwebtoken";
// // This middleware checks if a JWT exists in the incoming request and verifies its validity.
// // Middleware functions in Express are used to process requests before they reach the main route handler.

// export const authenticateToken = (req, _,next)=>{
//     const authHeader = req.headers["authorization"]
//     const token = authHeader && authHeader.split(" ")[1];

//     if(!token){
//         return res.status(401).json({ message: "Access token required" });

//     }
// //     he token is checked against the ACCESS_TOKEN_SECRET (a secret key stored in environment variables).
// // If the token is valid, the payload (user data encoded in the token) is extracted and returned.
// // If invalid or expired, an error (err) is returned.


//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) {
//           return res.status(403).json({ message: "Invalid token" });
//         }
//         req.user = user;
//         next();
//       });
// }     import jwt from "jsonwebtoken";
 import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // Correctly access the authorization header
  const token = authHeader && authHeader.split(" ")[1]; // Get the token from "Bearer <token>"

  if (!token) {
      return res.status(401).json({ message: "Access token required" });
  }

  // Verify the token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
          return res.status(403).json({ message: "Invalid token" });
      }
      req.user = user; // Attach user info to request object
      next(); // Proceed to the next middleware or route handler
  });
};
