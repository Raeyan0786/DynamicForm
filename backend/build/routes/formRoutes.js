"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const formController_1 = require("../controllers/formController");
const router = express_1.default.Router();
router.route('/').post(formController_1.createMedicine).get(formController_1.getMedicines);
router.route('/:id').get(formController_1.getSpecificForm);
router
    .route('/:id')
    .put(formController_1.updateMedicine)
    .delete(formController_1.deleteMedicine);
exports.default = router;
