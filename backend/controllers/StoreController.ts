import { Request, Response } from "express";
import Store from "../models/Store";
import User from "../models/User";

class StoreController {
  static async createStore(req: Request, res: Response) {
    try {
      // Get the logo path based on the uploaded file's filename
      // @ts-ignore
      const logoPath = "/logos/" + req.file.filename;

      // Extract the owner's ID from the decoded token
      // @ts-ignore
      const ownerId = req?.decoded.user._id;

      // Check if ownerId is missing in the token
      if (!ownerId) {
        res.status(400).json({ error: "Token missing ownerId!" });
      }

      // Extract necessary information from the request body
      const { name, description, location } = req.body;

      // Find the owner (user) based on the extracted ownerId
      const owner = await User.findById(ownerId);

      // Check if the owner exists
      if (!owner) {
        throw new Error("User does not exist");
      }

      // Check if the owner already owns a store
      if (owner?.toJSON().store) {
        return res.status(400).json({ error: "User already owns a store!" });
      }

      // Create a new store instance with the provided information
      const store = new Store({
        name,
        description,
        location,
        owner: ownerId,
        logo: logoPath,
      });

      // Validate the store model
      const error = store.validateSync();

      // Check if validation failed
      if (error) {
        console.log(error);
        return res.status(400).json({ error: "Failed to create store!" });
      }

      // Save the store to the database
      await store.save();

      // Update the owner's store reference
      owner.store = store._id;

      // Save the updated owner information
      await owner.save();

      res.json(store);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Failed to create store!" });
    }
  }

  static async getStoreById(req: Request, res: Response) {
    try {
      if (!req.params.storeId) {
        return;
      }

      const store = await Store.findOne({
        _id: req.params.storeId,
      });

      if (!store) {
        return res.status(404).json({ error: "Store not found!" });
      }

      res.json(store);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Internal server error, failed to fetch store!" });
    }
  }

  // TODO update store
  // TODO approve store by superadmin
  // TODO delete store
}

export default StoreController;
