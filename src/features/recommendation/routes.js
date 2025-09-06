import { Router } from "express";
import { isUser } from "../../middlewares/isUser.js";
import { GetRecommendationController } from "./controller.js";
const router = Router();
router.post("/recommend", isUser, GetRecommendationController);
export default router;
