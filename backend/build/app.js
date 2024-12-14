"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
// import eventRoutes from './routes/eventRoutes';
// import authRoutes from './routes/authRoutes'
// import medicineRoutes from './routes/medicineRoutes'
// import salesExecutiveRoutes from './routes/salesExecutiveRoutes'
// import orderRoutes from './routes/orderRoutes'
const formRoutes_1 = __importDefault(require("./routes/formRoutes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
const PORT = process.env.PORT || 5000;
mongoose_1.default.connect('mongodb://localhost:27017/form-builder', { useUnifiedTopology: true, useNewUrlParser: true });
app.use('/api/forms', formRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
