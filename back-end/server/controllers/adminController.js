const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

// Admin: Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email")
      .populate("items.product", "name image");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = req.body.status || order.status;
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get sales statistics
exports.getSalesStats = async (req, res) => {
  try {
    const orders = await Order.find({ status: "delivered" });

    const totalSales = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );
    const totalOrders = orders.length;

    res.json({
      totalSales,
      totalOrders,
      averageOrderValue: totalSales / totalOrders || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
