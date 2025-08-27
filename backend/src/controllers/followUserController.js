import { UserRelationship } from "../models/userRelationmodel.js";
import { User } from "../models/usermodel.js";



const followUser = async (req, res) => {
    const { userName } = req.params; 
    const followerUserName = req.user.userName; 
  
    if (userName === followerUserName) {
      return res.status(400).json({ message: "You cant follow yourself" });
    }
  
    try {
      const userToFollow = await User.findOne({ userName });
      const follower = await User.findOne({ userName: followerUserName });
  
      if (!userToFollow || !follower) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const existingRelationship = await UserRelationship.findOne({
        follower: follower._id,
        following: userToFollow._id,
      });
  
      if (existingRelationship) {
        await UserRelationship.deleteOne({ _id: existingRelationship._id });
        return res.status(200).json({
          success: true,
          message: "Unfollowed successfully",
        });
      } else {
        // Follow: Create a new relationship
        await UserRelationship.create({
          follower: follower._id,
          following: userToFollow._id,
        });
        return res.status(200).json({
          success: true,
          message: "Followed successfully",
        });
      }
    } catch (error) {
      console.error("Error during follow:", error.message);
      return res.status(500).json({
        success: false,
        message: "Something went wrong during follow",
      });
    }
  };

  const unfollowUser = async (req, res) => {
    try {
      const { userName } = req.params; // The user to unfollow
      const followerId = req.user._id; // The authenticated user (follower)
  
      // Find the user to unfollow
      const userToUnfollow = await User.findOne({ userName });
      if (!userToUnfollow) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Find and delete the relationship
      const relationship = await UserRelationship.findOneAndDelete({
        follower: followerId,
        following: userToUnfollow._id,
      });
  
      if (!relationship) {
        return res.status(400).json({ message: "You are not following this user" });
      }
  
      res.status(200).json({
        success: true,
        message: "Unfollowed successfully",
      });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error: error.message });
    }
  };

  export {followUser,unfollowUser};