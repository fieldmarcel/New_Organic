import { Router } from "express";
import { updateSingleRecipe, createSingleRecipePage, deleteSingleRcipe, getRecipe,searchRecipes,getAllRecipes,getFixedRecipes,getmoreIdeasRecipe ,getCategoryRecipes,getCuisineRecipes,getExploreRecipes} from "../controllers/singleRecipecontroller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { authenticateToken } from "../middlewares/auth.middleware.js"
import { cacheMiddleware } from "../middlewares/cache.middleware.js";


const router = Router();
// router.post("/", upload.single("image"), createRecipe);

router.post("/", authenticateToken ,upload.single("image"), createSingleRecipePage);

// router.post("/", authenticateToken, upload.single("image"), createSingleRecipePage);
// he authenticateToken middleware is strategically placed before createSingleRecipePage to ensure that 
// the JWT is verified and the user is authenticated before any recipe creation logic is executed. 
// If the authentication fails, the request is terminated early, preventing unauthorized access
router.get("/",cacheMiddleware,getAllRecipes)
router.get("/fixed",cacheMiddleware,getFixedRecipes)
router.get("/explore",cacheMiddleware,getExploreRecipes);
router.get("/moreideas",cacheMiddleware,getmoreIdeasRecipe);

router.get("/search",cacheMiddleware,searchRecipes)

router.get("/subCategory/:subCategory",cacheMiddleware,getCategoryRecipes)
router.get("/cuisine/:cuisine",cacheMiddleware, getCuisineRecipes); 

router.get("/:id",cacheMiddleware, getRecipe); 

router.put("/:id", authenticateToken, upload.single("image"), updateSingleRecipe);

//deleting recipe
router.delete("/:id", authenticateToken, deleteSingleRcipe);

// router.get("/filters", getRecipeFilters);

export default router;
