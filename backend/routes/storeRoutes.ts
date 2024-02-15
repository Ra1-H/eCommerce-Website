import express from "express";
import StoreController from "../controllers/StoreController";
import { auth } from "../middleware/auth";
import { logoUploads } from "../middleware/multer";

const storeRouter = express.Router();

//receives the logo file from the input type="files" where the field name="logo" and makes it available for the req.file.The file information includes details like the filename, originalname, mimetype, size, and path.In our case, the filename is used to construct the logo path.
storeRouter.post(
  "/create",
  auth,
  logoUploads.single("logo"),
  StoreController.createStore
);

storeRouter.get("/:storeId", StoreController.getStoreById);

export default storeRouter;
