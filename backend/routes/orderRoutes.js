import express from "express";
import {
    addOrderItems, getUserOrders
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";
const orderRouter = express.Router();

orderRouter.post("/", addOrderItems);

orderRouter.get("/", protect, getUserOrders)

export default orderRouter;
