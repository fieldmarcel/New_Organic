import dotenv from "dotenv";
dotenv.config();

import connectDB from "./src/db/index.js";
import { app } from "./src/app.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { registerFeedSocketHandlers } from "./src/controllers/socketController.js";

import cors from "cors";
const allowedOrigins = process.env.CORS_ORIGIN?.split(",") || [
  "http://localhost:5173",
  "http://127.0.0.1:5173" 
];
const PORT = process.env.PORT || 8081;
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
app.options('*', cors());

const server = createServer(app);


 export const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST"],
  },
});
registerFeedSocketHandlers(io);

io.on("connection",(socket)=>{
  console.log("New client connected", socket.id);


  socket.on("sendPost",(data) =>{
    console.log("New post received:", data);

    io.emit("receivePost", data);
  })   
  
   socket.on("disconnect", () => {
    console.log("User disconnected: ", socket.id);
  });
})




const startServer = async () => {
  try {
    await connectDB();

    server.listen(PORT, () => {
      console.log(`✅ Server running at port ${PORT}`);
    });

  } catch (error) {
    console.log(" MongoDB connection failed:", error.message);
  }
};

startServer();
