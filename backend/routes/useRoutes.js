import express from "express";
import { createUser,loginUser,logoutCurrentUser,getAllUsers,UpdateUserById,getCurrentUserProfile,getUserById, updateCurrentUserProfile,deleteUser } from "../controllers/userController.js";
import {authenticate,authorizeAdmin} from "../middlewares/authMiddleware.js"
const router = express.Router();

router.route('/').post(createUser).get(authenticate,authorizeAdmin,getAllUsers)
router.post("/auth",loginUser)
router.post("/logout",logoutCurrentUser)
router.route("/profile").get(authenticate,getCurrentUserProfile).put(authenticate,updateCurrentUserProfile)

// ADMIN ROUTES
router.route("/admin/:id").delete(authenticate,authorizeAdmin,deleteUser)
      .get(authenticate,authorizeAdmin,getUserById)
      .put(authenticate,authorizeAdmin,UpdateUserById)

export default router