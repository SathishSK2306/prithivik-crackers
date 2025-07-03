const Order = require("../models/Order");
const Product = require("../models/Product");
const { sendEmail } = require("../utils/emailService");
const { sendWhatsAppMessage } = require("../utils/whatsappService");

exports.createOrder = async (req, res) => {
  try {
    const { items, deliveryAddress, deliveryCharge } = req.body;

    // Calculate total amount
    let totalAmount = 0;
    const products = await Product.find({
      _id: { $in: items.map((item) => item.product) },
    });

    // Validate items and calculate total
    const orderItems = items.map((item) => {
      const product = products.find((p) => p._id.equals(item.product));
      if (!product) {
        throw new Error(`Product ${item.product} not found`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }

      totalAmount += product.price * item.quantity;

      return {
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      };
    });

    totalAmount += deliveryCharge;

    // Create order
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalAmount,
      deliveryCharge,
      deliveryAddress,
    });

    // Update product stock
    await Promise.all(
      orderItems.map(async (item) => {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: -item.quantity },
        });
      })
    );

    // Get user details
    const user = await User.findById(req.user._id);

    // Send notifications
    await sendEmail({
      to: user.email,
      subject: "Your Order Confirmation",
      html: `<h1>Thank you for your order!</h1>
             <p>Order ID: ${order._id}</p>
             <p>Total Amount: ₹${totalAmount}</p>`,
    });

    await sendWhatsAppMessage(
      user.phone,
      `Your order has been placed successfully. Order ID: ${order._id}, Total: ₹${totalAmount}`
    );

    // Send notification to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: "New Order Received",
      html: `<h1>New Order</h1>
             <p>Order ID: ${order._id}</p>
             <p>Customer: ${user.name}</p>
             <p>Total Amount: ₹${totalAmount}</p>`,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.product", "name image");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (
      order.user._id.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "items.product",
      "name image price"
    );
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
