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
exports.login = exports.signup = exports.authenticateUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const defaultUsername = process.env.DEFAULT_USERNAME || 'test-admin';
const defaultPassword = process.env.DEFAULT_PASSWORD || 'test-admin';
const authenticateUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    if (username === defaultUsername) {
        // const isPasswordCorrect =  await bcrypt.compare(password, defaultPassword);
        if (password === defaultPassword) {
            // Generate JWT token on successful authentication
            const token = jsonwebtoken_1.default.sign({ username }, "asdnidsfraeyandslkklf", { expiresIn: '1y' });
            return token;
        }
    }
    return null;
});
exports.authenticateUser = authenticateUser;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, role } = req.body;
    try {
        // console.log(username)
        const existingUser = yield User_1.default.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = new User_1.default({
            username,
            password: hashedPassword,
            role,
        });
        const createdUser = yield user.save();
        const token = jsonwebtoken_1.default.sign({ id: createdUser._id, role: createdUser.role }, "asdnidsfraeyandslkklf", {
            expiresIn: '1y',
        });
        res.cookie("jwttokens", token, {
            // maxAge: 3600000,
            httpOnly: true,
            // secure: true,
            expires: new Date(Date.now() + 3600000),
        });
        res.status(201).json({
            _id: createdUser._id,
            username: createdUser.username,
            role: createdUser.role,
            token,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // console.log(username)
    // console.log(password)
    try {
        if (username === defaultUsername) {
            const defaulttoken = yield (0, exports.authenticateUser)(username, password);
            if (defaulttoken) {
                return res.json({
                    username: defaultUsername,
                    role: "StoreManager",
                    token: defaulttoken,
                });
            }
        }
        const user = yield User_1.default.findOne({ username });
        console.log(user);
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        if (user) {
            console.log(user.password);
            const isMatch = yield bcryptjs_1.default.compare(password, user.password);
            console.log(isMatch);
            // if (!isMatch) {
            //   return res.status(401).json({ message: 'Invalid username or password' });
            // }
            const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, "asdnidsfraeyandslkklf", {
                expiresIn: '1y',
            });
            return res.json({
                _id: user._id,
                username: user.username,
                role: user.role,
                token,
            });
        }
        else {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});
exports.login = login;
