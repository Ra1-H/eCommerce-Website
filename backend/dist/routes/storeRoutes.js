"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const StoreController_1 = __importDefault(require("../controllers/StoreController"));
const auth_1 = require("../middleware/auth");
const multer_1 = require("../middleware/multer");
const storeRouter = express_1.default.Router();
//receives the logo file from the input type="files" where the field name="logo" and makes it available for the req.file.The file information includes details like the filename, originalname, mimetype, size, and path.In our case, the filename is used to construct the logo path.
storeRouter.post("/create", auth_1.auth, multer_1.logoUploads.single("logo"), StoreController_1.default.createStore);
storeRouter.get("/:storeId", StoreController_1.default.getStoreById);
exports.default = storeRouter;
