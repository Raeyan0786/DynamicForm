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
exports.deleteMedicine = exports.updateMedicine = exports.getSpecificForm = exports.createMedicine = exports.getMedicines = void 0;
const Form_1 = __importDefault(require("../models/Form"));
const getMedicines = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const forms = yield Form_1.default.find();
        res.json(forms);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getMedicines = getMedicines;
const createMedicine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const form = new Form_1.default({
        title: req.body.title,
        inputs: req.body.inputs
    });
    try {
        const newForm = yield form.save();
        res.status(201).json(newForm);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
    //   const createdMedicine = await medicine.save();
    //   res.status(201).json(createdMedicine);
});
exports.createMedicine = createMedicine;
const getSpecificForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const form = yield Form_1.default.findById(req.params.id);
        if (form) {
            res.json(form);
        }
        else {
            res.status(404).json({ message: 'Form not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getSpecificForm = getSpecificForm;
const updateMedicine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const form = yield Form_1.default.findById(req.params.id);
        if (form) {
            form.title = req.body.title || form.title;
            form.inputs = req.body.inputs || form.inputs;
            const updatedForm = yield form.save();
            res.json(updatedForm);
        }
        else {
            res.status(404).json({ message: 'Form not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateMedicine = updateMedicine;
const deleteMedicine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.id);
    try {
        const form = yield Form_1.default.findById(req.params.id);
        if (form) {
            yield form.deleteOne();
            res.json({ message: 'Form deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'Form not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteMedicine = deleteMedicine;
