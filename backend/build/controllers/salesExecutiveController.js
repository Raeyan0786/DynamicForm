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
exports.deleteSalesExecutive = exports.updateSalesExecutive = exports.createSalesExecutive = exports.getSalesExecutives = void 0;
const SalesExecutive_1 = __importDefault(require("../models/SalesExecutive"));
const getSalesExecutives = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const salesExecutives = yield SalesExecutive_1.default.find({});
    res.json(salesExecutives);
});
exports.getSalesExecutives = getSalesExecutives;
const createSalesExecutive = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, dateOfBirth, gender, experienceYears } = req.body;
    const salesExecutive = new SalesExecutive_1.default({
        firstName,
        lastName,
        dateOfBirth,
        gender,
        experienceYears,
    });
    const createdSalesExecutive = yield salesExecutive.save();
    res.status(201).json(createdSalesExecutive);
});
exports.createSalesExecutive = createSalesExecutive;
const updateSalesExecutive = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, dateOfBirth, gender, experienceYears } = req.body;
    const salesExecutive = yield SalesExecutive_1.default.findById(req.params.id);
    if (salesExecutive) {
        salesExecutive.firstName = firstName;
        salesExecutive.lastName = lastName;
        salesExecutive.dateOfBirth = dateOfBirth;
        salesExecutive.gender = gender;
        salesExecutive.experienceYears = experienceYears;
        const updatedSalesExecutive = yield salesExecutive.save();
        res.json(updatedSalesExecutive);
    }
    else {
        res.status(404).json({ message: 'Sales Executive not found' });
    }
});
exports.updateSalesExecutive = updateSalesExecutive;
const deleteSalesExecutive = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const salesExecutive = yield SalesExecutive_1.default.findById(req.params.id);
    if (salesExecutive) {
        yield salesExecutive.deleteOne();
        res.json({ message: 'Sales Executive removed' });
    }
    else {
        res.status(404).json({ message: 'Sales Executive not found' });
    }
});
exports.deleteSalesExecutive = deleteSalesExecutive;
