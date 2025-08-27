// import { io } from "socket.io-client";

// const token = localStorage.getItem("accessToken"); // or from memory/context

// const socket = io("http://localhost:8081", {
//    transports: ["websocket"],
//      withCredentials: true,
//   reconnection: true,
//   auth: {
//     token, // this will be sent in `socket.handshake.auth.token`
//   },
  
// });
// socket.on("connect", () => {
//   console.log("🟢 Connected to socket:", socket.id);
// });
// export default socket;
// socket.js (updated)
import { io } from "socket.io-client";

const socket = io("http://localhost:8081", {
  transports: ["websocket"],
  reconnection: true,
  // Removed: withCredentials and auth
});

socket.on("connect", () => {
  console.log("🟢 Connected to socket:", socket.id);
});

export default socket;