import { User } from "../models/usermodel.js";
import { Recipe } from "../models/singleRecipemodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserRelationship } from "../models/userRelationmodel.js";
const registerUser = async (req, res) => {
  try {
    const { userName, email, password, fullName } = req.body;

    console.log("request body ", req.body);

    if (!fullName) {
      return res
        .status(400)
        .json({ success: false, message: "Full name is required" });
    }
    if (!userName) {
      return res
        .status(400)
        .json({ success: false, message: "user name is required" });
    }
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "email is required" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Password is required" });
    }

    const existedUser = await User.findOne({
      $or: [{ userName }, { email }],
    });

    if (existedUser) {
      return res
        .status(409)
        .json({ success: false, message: "userName / email already exist" });
    }
    console.log(existedUser);

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      userName,
      email,
      password: hashedPassword,
    });
    console.log(user);

    const createdUser = await User.findById(user._id).select(
      "-password -refreshtoken"
    );
    // const createdUser = user.toObject();
    // delete createdUser.password; // Remove sensitive data

    if (!createdUser) {
      return res.status(500).json({
        success: false,
        message: "something went wrong while registration of user",
      });
    }
    console.log("isisisiis", createdUser);

    return res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("theres a problem during registration ", error.message);
    return res.status(500).json({
      success: false,
      message: "something went wrong while registration of user",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    console.log("request body", req.body);

    if ((!email ) || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    const verifiedUser = await User.findOne({ email });
    console.log("Verified User:", verifiedUser);

    if (!verifiedUser) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      String(password),
      verifiedUser.password
    );
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }
//generating access and refresh token 
    const accessToken = jwt.sign(
      { userId: verifiedUser._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
    const refreshToken = jwt.sign(
      { userId: verifiedUser._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
    const options = {
        refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",  // Ensureing data transfer over HTTPS
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax", // Protect against CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    const { password: removedPassword, ...userWithoutPassword } =
      verifiedUser.toObject();
      
res.cookie('accessToken', accessToken, options);
res.cookie('refreshToken', refreshToken, options);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        id: userWithoutPassword._id,
        userName: userWithoutPassword.userName, 
        email: userWithoutPassword.email,
        fullName: userWithoutPassword.fullName,
      },
      accessToken
    });

    // Uncomment if you want to use cookies
    // res.cookie("refreshToken", refreshToken, options);
    // res.cookie("accessToken", accessToken, options);
  } catch (error) {
    console.error("theres a problem during login ", error.message);
    return res.status(500).json({
      success: false,
      message: "something went wrong while logging in",
    });
  }
};

const logoutUser= async (req,res)=>{
    try {
        
        res.cookie("refreshToken", "",{
httpOnly: true,
secure: process.env.NODE_ENV === "production",  // Ensure data transfer over HTTPS
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
expiresIn: new Date(0)

        } );

        return res.status(200).json({
          success: true,
          message: "User logged out successfully",
        });

    } catch (error) {
      console.error("Error during logout:", error.message);
      return res.status(500).json({
        success: false,
        message: "Something went wrong during logout",
      });
    }
}

const getUserDetails = async (req, res) => {
  try {
    const { userName } = req.params;

    const user = await User.findOne({ userName }).select("-password -refreshToken -accessToken");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

     const followersCount = await UserRelationship.countDocuments({ following: user._id });

     const followingCount = await UserRelationship.countDocuments({ follower: user._id });
    const recipes = await Recipe.find({ userId: user._id });

    res.status(200).json({
      success: true,
      user: {
        userName: user.userName,
        fullName: user.fullName,
        bio: user.bio,
        
      },
      recipes,
       followingCount,
       followersCount
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export { registerUser, loginUser ,logoutUser,getUserDetails};
