"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const auth = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.get("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        console.log(token);
        if (!token) {
            return res.status(403).json({ message: "TOKEN MISSING" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, TOKEN_SECRET);
        if (decoded) {
            // @ts-ignore
            console.log("DECODED TOKENNNN:", decoded);
            // @ts-ignore
            req.decoded = decoded;
            //@ts-ignore
            req.username = decoded.user.username;
            next();
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: "Failed to verify JWT" });
    }
};
exports.auth = auth;
