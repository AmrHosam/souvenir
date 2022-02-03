import express from "express";
import {
    addOrderItems
} from "../controllers/orderController.js";
const orderRouter = express.Router();

orderRouter.post("/", addOrderItems);

export default orderRouter;
