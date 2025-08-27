import feedModel from '../models/feedModel.js';
export const registerFeedSocketHandlers = (io) => {

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("sendPost", async (data) => {
      try {
        const newPost = {
          message: data.message, 
          user: "Anonymous",    
          time: new Date(),      
        };

        await feedModel.create(newPost);
        
        const allPosts = await feedModel.find().sort({ time: -1 });
        
        io.emit("allPosts", allPosts);
      } catch (err) {
        console.error("❌ Error saving post:", err);
      }
    });

    socket.on("getAllPosts", async () => {
      try {
        const posts = await feedModel.find().sort({ time: -1 });
        
        socket.emit("allPosts", posts);
      } catch (err) {
        console.error("❌ Error fetching posts:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("🔌 Socket disconnected:", socket.id);
    });
  });
};