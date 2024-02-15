"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productPicturesUpload = exports.logoUploads = void 0;
const multer_1 = __importDefault(require("multer"));
const constants_1 = require("../shared/constants");
// Configure multer storage for storing logos
let logoStorage = multer_1.default.diskStorage({
    // Define the destination directory for storing uploaded logos
    destination: function (req, file, cb) {
        cb(null, "public/logos");
    },
    // Define the filename for each uploaded logo
    filename: function (req, file, cb) {
        // Extract the file extension from the mimetype(Multipurpose Internet Mail Extensions)
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        // Generate a unique filename using the fieldname, user ID, and file extension
        // @ts-ignore
        cb(null, file.fieldname + "-" + req.decoded.user._id + "." + extension);
    },
});
let productPictureStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/product-pictures");
    },
    filename: function (req, file, cb) {
        // The filename function defines how the uploaded files will be named
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        // @ts-ignore
        cb(null, (0, constants_1.hashFileName)(file.originalname) + "-" + Date.now() + "." + extension);
    },
});
exports.logoUploads = (0, multer_1.default)({ storage: logoStorage });
exports.productPicturesUpload = (0, multer_1.default)({ storage: productPictureStorage });
