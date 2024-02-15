import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import dotenv from "dotenv"

dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET as string;

export const auth = (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    
    const token = req.get("Authorization")?.split(" ")[1];

    console.log(token)

    if (!token) {
      return res.status(403).json({ message: "TOKEN MISSING" });
    }

    const decoded = jwt.verify(token, TOKEN_SECRET);

    if (decoded) {
      // @ts-ignore
      console.log("DECODED TOKENNNN:", decoded);
      // @ts-ignore
      req.decoded = decoded;
      //@ts-ignore
      req.username = decoded.user.username;


      next();
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to verify JWT" });
  }
};
