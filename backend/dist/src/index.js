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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
const storeRoutes_1 = __importDefault(require("../routes/storeRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set("strictQuery", false);
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
app.get("/", (req, res) => {
    res.send("Hello from the backend!");
});
app.use("/api/v1/users", userRoutes_1.default);
app.use("/api/v1/stores", storeRoutes_1.default);
mongoose_1.default
    // @ts-ignore
    .connect(process.env.DATABASE_URL)
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
})
    .catch((error) => {
    console.log(error);
});
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        yield mongoose_1.default.connect(process.env.DATABASE_URL);
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}!`);
        });
    });
}
