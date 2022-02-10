import express from "express";
import {
    addOrderItems, getOrders, getUserOrders
} from "../controllers/orderController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
const orderRouter = express.Router();

orderRouter.post("/", addOrderItems);

orderRouter.get("/", protect, getUserOrders)

orderRouter.get("/listAll", protect,admin , getOrders)
export default orderRouter;
