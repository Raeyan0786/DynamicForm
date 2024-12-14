"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrder = exports.deleteOrder = exports.createOrder = exports.getOrders = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield Order_1.default.find({}).populate('products.medicineId');
    res.json(orders);
});
exports.getOrders = getOrders;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId, customerName, customerContactNumber, products, totalAmount } = req.body;
    const order = new Order_1.default({
        orderId,
        customerName,
        customerContactNumber,
        products,
        totalAmount,
    });
    const createdOrder = yield order.save();
    res.status(201).json(createdOrder);
});
exports.createOrder = createOrder;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield Order_1.default.findById(req.params.id);
    if (order) {
        yield order.deleteOne();
        res.json({ message: 'Order removed' });
    }
    else {
        res.status(404).json({ message: 'Order not found' });
    }
});
exports.deleteOrder = deleteOrder;
// const Order = require('../models/Order');
// const getOrders = async (req, res) => {
//   const orders = await Order.find({}).populate('products.medicineId', 'name price');
//   res.json(orders);
// };
// const createOrder = async (req, res) => {
//   const { orderId, customerName, customerContactNumber, products, totalAmount } = req.body;
//   const order = new Order({
//     orderId,
//     customerName,
//     customerContactNumber,
//     products,
//     totalAmount,
//   });
//   const createdOrder = await order.save();
//   res.status(201).json(createdOrder);
// };
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId, customerName, customerContactNumber, products, totalAmount } = req.body;
    const order = yield Order_1.default.findById(req.params.id);
    if (order) {
        order.orderId = orderId;
        order.customerName = customerName;
        order.customerContactNumber = customerContactNumber;
        order.products = products;
        order.totalAmount = totalAmount;
        const updatedOrder = yield order.save();
        res.json(updatedOrder);
    }
    else {
        res.status(404).json({ message: 'Order not found' });
    }
});
exports.updateOrder = updateOrder;
// const deleteOrder = async (req, res) => {
//   const order = await Order.findById(req.params.id);
//   if (order) {
//     await order.remove();
//     res.json({ message: 'Order removed' });
//   } else {
//     res.status(404).json({ message: 'Order not found' });
//   }
// };
// module.exports = {
//   getOrders,
//   createOrder,
//   updateOrder,
//   deleteOrder,
// };
