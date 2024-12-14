"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
// import { protect } from '../middleware/authMiddleware';
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.route('/').get(authMiddleware_1.protect, orderController_1.getOrders).post(authMiddleware_1.protect, orderController_1.createOrder);
router.route('/:id').delete(authMiddleware_1.protect, orderController_1.deleteOrder);
router.route('/:id').put(authMiddleware_1.protect, authMiddleware_1.storeManagerOnly, orderController_1.updateOrder);
exports.default = router;
