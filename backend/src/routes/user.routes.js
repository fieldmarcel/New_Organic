import { Router } from "express";
import { bookmarkRecipe,getBookmarkedRecipes } from "../controllers/bookmarkController.js";
import { authenticateToken } from "../middlewares/auth.middleware.js"
import {optionalAuthenticateToken}  from "../middlewares/optionalauth.middleware.js"
import { registerUser,loginUser ,logoutUser,getUserDetails,updateUserProfile} from "../controllers/usercontroller.js";
import { followUser,unfollowUser } from "../controllers/followUserController.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/login/:id").get(loginUser);


router.put("/update-profile", authenticateToken,upload.single("image"), updateUserProfile);


// router.post("/:userName/follow", authenticateToken, followUser);
// router.delete("/:userName/unfollow", authenticateToken, unfollowUser);

router.route("/logout").post(logoutUser);


router.post("/bookmarks", authenticateToken, bookmarkRecipe); // Requires authentication
// router.delete("/bookmarks", authenticateToken, unBookMarkRecipe); // Requires authentication
router.get("/:userName/bookmarks", getBookmarkedRecipes); 
router.get("/:userName", optionalAuthenticateToken, getUserDetails);



export default router;