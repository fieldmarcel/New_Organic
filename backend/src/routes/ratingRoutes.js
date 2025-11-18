// routes/ratingRoutes.js

import express from "express";
import { rateRecipe } from "../controllers/ratingController.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";


const router = express.Router();

// Route to submit or update a rating. It should be protected so only logged-in users can rate.
// Assumes 'protect' middleware extracts the userId and places it in req.user.userId
// The userId is expected in req.body for this controller, so we'll need to adjust the controller
// or make sure the frontend sends it, or modify the controller to use req.user.userId.

// *Correction/Simplification*: Since the user is logged in (via `protect`),
// we should get the userId from `req.user` in the controller instead of `req.body`
// to ensure the rating is always from the authenticated user.

router.post("/rate", authenticateToken, rateRecipe);

export default router;