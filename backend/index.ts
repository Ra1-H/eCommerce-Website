import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";
import storeRouter from "./routes/storeRoutes";
import mongoose from "mongoose";
import reviewRouter from "./routes/reviewRoutes";
import productRouter from "./routes/productRoutes";
import orderRouter from "./routes/orderRoutes";

mongoose.set("strictQuery", false);

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/stores", storeRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderRouter);

mongoose
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

async function start() {
  // @ts-ignore
  await mongoose.connect(process.env.DATABASE_URL);
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}!`);
  });
}
