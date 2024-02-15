import { Request, Response } from "express";
import Product from "../models/Product";
import Store from "../models/Store";

class ProductController {
  // Other methods...

  static async createProduct(req: Request, res: Response) {
    try {
      // @ts-ignore
      const productPictures = req.files.map(
        (file: any) => `/product-pictures/${file.filename}`
      );
      // @ts-ignore
      const userId = req.decoded.user._id;

      const store = await Store.findOne({
        owner: userId,
      });

      if (!store || !store.approved) {
        console.log(Store);
        return res.status(400).json({
          error:
            "You either don't have a store or Your store isn't yet approved!",
        });
      }

      const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        store: store._id,
        pictures: productPictures,
      });

      const error = product.validateSync();

      if (error) {
        console.log(error);
        return res.status(400).json({ error: "Failed to validate product!" });
      }

      await product.save();

      res.json({ message: "product created: ", product });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "failed to create product" });
    }
  }

  static async getAllProducts(req: Request, res: Response) {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "failed to get products" });
    }
  }

  static async getProductById(req: Request, res: Response) {
    try {
      if (!req.params.productId) {
        return;
      }

      const product = await Product.findOne({
        _id: req.params.productId,
      });

      res.json(product);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Failed to get product!" });
    }
  }

  static async getCartProducts(req: Request, res: Response) {
    try {
      console.log(req.body);
      const { cart } = req.body;

      if (!cart.length) {
        return res.json({ error: "empty cart" });
      }
      console.log(cart);

      const products = await Product.find({
        _id: { $in: cart },
      }).exec();

      res.json({ message: "products in cart", products });

    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Failed to get products from cart!" });
    }
  }

  // TODO delete product only by store owner
  // TODO update product
}

export default ProductController;
