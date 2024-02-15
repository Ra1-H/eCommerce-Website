import { Request, Response } from "express";
import User from "../models/User";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Product from "../models/Product";
dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const saltRounds = 10;

class UserController {
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return;
      }

      const hashedPassword = bcrypt.hashSync(password, saltRounds);
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });

      const error = user.validateSync();
      if (error) {
        console.log(error);
        return res.status(400).json({ error: "Failed to register!" });
      }

      await user.save();
      console.log("registered: ", user);

      const tokenPayload = {
        user: { ...user?.toJSON(), password: "" },
        username: user?.name,
      };

      // @ts-ignore
      const token = jwt.sign(tokenPayload, TOKEN_SECRET);

      res.json({ token, username: user?.name });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Internal server error, Failed to create User!" });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        email,
      });

      if (!user) {
        res.status(401).json({ error: "User not found! Please register" });
      }

      // verify password
      // @ts-ignore
      const verification = bcrypt.compareSync(password, user.password);

      if (!verification) {
        return res.status(400).json({ error: "Wrong Credentials!" });
      }

      console.log("Successful log-in: ", user);

      const tokenPayload = {
        user: { ...user?.toJSON(), password: "" },
        username: user?.name, // Assuming your username field is 'name', modify accordingly
      };

      //@ts-ignore
      const token = jwt.sign(tokenPayload, TOKEN_SECRET);

      res.json({ token, username: user?.name });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error,Failed to login!" });
    }
  }

  //to get products added by the logged-in user
  static async getProducts(req: express.Request, res: express.Response) {
    try {
      // @ts-ignore
      const userId = req?.decoded.user._id;

      if (!userId) {
        res.status(400).json({ error: "Token missing userId!" });
        return;
      }

      const user = await User.findById(userId);

      if (!user) {
        throw new Error("Invalid user");
      }

      let userProducts;

      if (user.store) {
        // If the user has a store, fetch products associated with the store
        userProducts = await Product.find({ store: user.store });
      }

      console.log("Fetched user products:", userProducts);

      // Respond with the user's products in JSON format
      res.json(userProducts);
      
    } catch (error) {
      console.error("Error fetching user products:", error);
      res.status(400).json({ error: "Failed to get user products!" });
    }
  }
}

export default UserController;
