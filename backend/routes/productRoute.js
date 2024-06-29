import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
} from "../controllers/productController.js";
import { adminCheck, protect } from "../middleware/authMiddleWare.js";

router.route("/").get(getProducts).post(protect, adminCheck, createProduct);
router.route("/:id/reviews").post(protect, createProductReview);

router
  .route("/:id")
  .get(getProductById)
  .delete(protect, adminCheck, deleteProduct)
  .put(protect, adminCheck, updateProduct);

export default router;
