import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
} from "../controllers/productController.js";
import { adminCheck, protect } from "../middleware/authMiddleWare.js";

router.route("/").get(getProducts);

router
  .route("/:id")
  .get(getProductById)
  .delete(protect, adminCheck, deleteProduct);

export default router;
