"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const formSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    inputs: [{
            id: { type: Number, required: true },
            type: { type: String, required: true },
            title: { type: String, required: true },
            placeholder: { type: String, required: true }
        }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose_1.default.model('Form', formSchema);
const Form = mongoose_1.default.model('Form', formSchema);
exports.default = Form;
