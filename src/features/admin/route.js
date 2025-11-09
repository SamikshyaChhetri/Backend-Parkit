import { Router } from "express";
import { isAdmin } from "../../middlewares/isAdmin.js";
import { deleteListing, deleteUser, getAdminStats, getAllListings, getAllUsers } from "./controller.js";

const adminRouter = Router();

// Admin stats endpoint
adminRouter.get("/stats", isAdmin, getAdminStats);

// User management endpoints
adminRouter.get("/users", isAdmin, getAllUsers);
adminRouter.delete("/users/:id", isAdmin, deleteUser);

// Listing management endpoints
adminRouter.get("/listings", isAdmin, getAllListings);
adminRouter.delete("/listings/:id", isAdmin, deleteListing);

export default adminRouter;
