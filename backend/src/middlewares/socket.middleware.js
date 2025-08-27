// import jwt from "jsonwebtoken";

// // Socket.IO authentication middleware
// export const socketAuth = (socket, next) => {
//   // Extract token from handshake auth object
//   const token = socket.handshake.auth.token;

//   // Reject connection if no token provided
//   if (!token) {
//     return next(new Error("Authentication error: No token provided"));
//   }

//   try {
//     // Verify JWT using secret from environment
//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
//     // Attach decoded user data to socket object
//     socket.user = decoded;
    
//     // Allow connection to proceed
//     next();
//   } catch (err) {
//     // Reject connection if token is invalid
//     return next(new Error("Authentication error: Invalid token"));
//   }
// };

import jwt from "jsonwebtoken";
import User from './models/userModel.js';

export const socketAuth = async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    
    if (!token) {
      return next(new Error("Authentication error: No token provided"));
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.userId)
      .select('-password -refreshToken -accessToken');

    if (!user) {
      return next(new Error("Authentication error: User not found"));
    }

    socket.user = {
      userId: user._id,
      userName: user.userName,
      fullName: user.fullName
    };

    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    next(new Error("Authentication failed"));
  }
};