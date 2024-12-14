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
exports.storeManagerOnly = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jsonwebtoken_1.default.verify(token, "asdnidsfraeyandslkklf");
            const user = yield User_1.default.findById(decoded.id).select('-password');
            console.log(user);
            console.log(decoded);
            if (user) {
                req.user = user;
                next();
            }
            else if (decoded.username === 'test-admin') {
                // req.user={username:'test-admin',role:"StoreManager"}
                req.user = {
                    _id: '66d833523b9c2b1d1627ad3b',
                    username: 'ayan',
                    password: '$2a$10$sE6xcGTusaqN1axn3Txxe.K5oqGQFQl9az5SNkra3XXHZycNlgQ7G',
                    role: 'StoreManager',
                };
                next();
            }
            else {
                res.status(404).json({ message: 'User not found' });
            }
        }
        catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
});
exports.protect = protect;
const storeManagerOnly = (req, res, next) => {
    if (req.user && (req.user.role === 'StoreManager' || req.user.username === process.env.DEFAULT_USERNAME)) {
        next();
    }
    else {
        res.status(403).json({ message: 'Access denied, only store managers allowed' });
    }
};
exports.storeManagerOnly = storeManagerOnly;
