import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  getOrders,
  getUserOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import { adminCheck, protect } from "../middleware/authMiddleWare.js";

router
  .route("/")
  .post(protect, addOrderItems)
  .get(protect, adminCheck, getOrders);
router.route("/myorders").get(protect, getUserOrders);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, adminCheck, updateOrderToDelivered);
router.route("/:id").get(protect, getOrderById);
export default router;
