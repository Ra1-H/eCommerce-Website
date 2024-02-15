import multer from "multer";
import { hashFileName } from "../shared/constants";

// Configure multer storage for storing logos
let logoStorage = multer.diskStorage({
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

let productPictureStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/product-pictures");
  },
  filename: function (req, file, cb) {
    // The filename function defines how the uploaded files will be named
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    // @ts-ignore
    cb(
      null,
      hashFileName(file.originalname) + "-" + Date.now() + "." + extension
    );
  },
});

export const logoUploads = multer({ storage: logoStorage });

export const productPicturesUpload = multer({ storage: productPictureStorage });
