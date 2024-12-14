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
exports.deleteMedicine = exports.updateMedicine = exports.createMedicine = exports.getMedicines = void 0;
const Medicine_1 = __importDefault(require("../models/Medicine"));
const getMedicines = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const medicines = yield Medicine_1.default.find({});
    res.json(medicines);
});
exports.getMedicines = getMedicines;
const createMedicine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, manufacturerName, price, stock, discount } = req.body;
    const medicine = new Medicine_1.default({
        name,
        manufacturerName,
        price,
        stock,
        discount,
    });
    const createdMedicine = yield medicine.save();
    res.status(201).json(createdMedicine);
});
exports.createMedicine = createMedicine;
const updateMedicine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, manufacturerName, price, stock, discount } = req.body;
    const medicine = yield Medicine_1.default.findById(req.params.id);
    if (medicine) {
        medicine.name = name;
        medicine.manufacturerName = manufacturerName;
        medicine.price = price;
        medicine.stock = stock;
        medicine.discount = discount;
        const updatedMedicine = yield medicine.save();
        res.json(updatedMedicine);
    }
    else {
        res.status(404).json({ message: 'Medicine not found' });
    }
});
exports.updateMedicine = updateMedicine;
const deleteMedicine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.id);
    const medicine = yield Medicine_1.default.findById(req.params.id);
    console.log(medicine);
    if (medicine) {
        yield medicine.deleteOne();
        res.json({ message: 'Medicine removed' });
    }
    else {
        res.status(404).json({ message: 'Medicine not found' });
    }
});
exports.deleteMedicine = deleteMedicine;
