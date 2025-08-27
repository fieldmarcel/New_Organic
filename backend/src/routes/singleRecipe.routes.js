import { Router } from "express";
import { createSingleRecipePage, getRecipe,searchRecipes,getAllRecipes,getFixedRecipes,getmoreIdeasRecipe ,getCategoryRecipes,getCuisineRecipes,getExploreRecipes} from "../controllers/singleRecipecontroller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { authenticateToken } from "../middlewares/auth.middleware.js"

const router = Router();
// router.post("/", upload.single("image"), createRecipe);

router.post("/", authenticateToken, upload.single("image"), createSingleRecipePage);
// he authenticateToken middleware is strategically placed before createSingleRecipePage to ensure that 
// the JWT is verified and the user is authenticated before any recipe creation logic is executed. 
// If the authentication fails, the request is terminated early, preventing unauthorized access
router.get("/",getAllRecipes)
router.get("/fixed",getFixedRecipes)
router.get("/explore",getExploreRecipes);
router.get("/moreideas",getmoreIdeasRecipe);

router.get("/search",searchRecipes)

router.get("/subCategory/:subCategory",getCategoryRecipes)
router.get("/cuisine/:cuisine", getCuisineRecipes); 

router.get("/:id", getRecipe); 


// router.get("/filters", getRecipeFilters);

export default router;
