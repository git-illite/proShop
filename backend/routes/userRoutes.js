import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
} from "../controllers/userController.js";
import { adminCheck, protect } from "../middleware/authMiddleWare.js";
import { registerUser } from "../controllers/userController.js";

router.route("/").post(registerUser).get(protect, adminCheck, getUsers);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

//router.route('/:id').get(getProductById)

export default router;
