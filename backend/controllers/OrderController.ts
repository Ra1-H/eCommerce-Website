import { Request, Response } from "express";
import Order from "../models/Order";
import Product from "../models/Product";

class OrderController {
  static async createOrder(req: Request, res: Response) {
    try {
      // @ts-ignore
      const userId = req?.decoded.user._id;

      if (!userId) {
        res.status(400).json({ error: "Token missing userId!" });
      }

      const { cart } = req.body;

      const order = new Order({
        user: userId,
        products: cart,
      });

      const error = order.validateSync();

      if (error) {
        console.log(error);
        return res.status(400).json({ error: "Failed to validate order!" });
      }

      await order.save();

      res.json({ message: "order created successfully", order });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "interbal server error, Failed to create order!" });
    }
  }

  static async getMyOrders(req: Request, res: Response) {
    try {
      // @ts-ignore
      const userId = req?.decoded.user._id;

      if (!userId) {
        return res.status(400).json({ error: "Token missing userId!" });
      }

      const orders = await Order.find({ user: userId }).exec();

      let populatedOrders: any = [];

      //   iterates over each order found for the user
      for await (const order of orders) {
        // order.products contains an object where the keys are product IDs and the values are quantities.
        const productQuantities = order.products;

        // This line queries the Product model to find all products whose IDs are in the array.In other words, it retrieves all products that are part of the current order.
        let products = await Product.find({
          _id: { $in: Object.keys(productQuantities) },
        }).exec();

        // For each product found, it maps the product's information along with the corresponding quantity from productQuantities. This creates an array of products with additional quantity information.
        // @ts-ignore
        products = products.map((product) => {
          return {
            ...product.toJSON(),
            quantity: productQuantities[product.id],
          };
        });

        // The order information is spread (...order.toJSON()) to include all properties of the order, and the products property is replaced with the array of products generated in the previous step
        populatedOrders.push({ ...order.toJSON(), products: products });
      }

      //   he response sent to the client includes an array of orders, and each order contains an array of products with their quantities.
      res.json(populatedOrders);
      
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Failed to get orders!" });
    }
  }

  static async getStoreOrders(req: Request, res: Response) {
    try {
      // @ts-ignore
      const storeId = req?.decoded.user.store;

      if (!storeId) {
        return res.status(400).json({ error: "Store ID not found!" });
      }

      //This line queries the Order model to find all orders. The populate method is used to replace the product field in the products array of each order with the actual product details. The model: Product option specifies that the product details should come from the Product model
      const orders = await Order.find()
        .populate({
          path: "products.product",
          model: Product,
        })
        .exec();

      // After fetching all orders, this code filters them to include only those related to the specified store (storeId)
      const storeOrders = orders.filter((order) =>
        order.products.some(
          (product: any) =>
            product.product.store.toString() === storeId.toString()
        )
      );

      res.json(storeOrders);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Failed to get store orders!" });
    }
  }

  static async changeOrderStatus(req: Request, res: Response) {
    try {
      // @ts-ignore
      const orderId = req.params.orderId;
      const { newStatus } = req.body;

      if (!orderId || !newStatus) {
        return res
          .status(400)
          .json({ error: "Order ID and status are required!" });
      }

      const order = await Order.findById(orderId);

      if (!order) {
        return res.status(404).json({ error: "Order not found!" });
      }

      order.status = newStatus;
      await order.save();

      res.json(order);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Failed to change order status!" });
    }
  }
}

export default OrderController;
