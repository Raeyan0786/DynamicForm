"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const salesExecutiveController_1 = require("../controllers/salesExecutiveController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.route('/').get(authMiddleware_1.protect, salesExecutiveController_1.getSalesExecutives).post(authMiddleware_1.protect, authMiddleware_1.storeManagerOnly, salesExecutiveController_1.createSalesExecutive);
router
    .route('/:id')
    .put(authMiddleware_1.protect, authMiddleware_1.storeManagerOnly, salesExecutiveController_1.updateSalesExecutive)
    .delete(authMiddleware_1.protect, authMiddleware_1.storeManagerOnly, salesExecutiveController_1.deleteSalesExecutive);
exports.default = router;
