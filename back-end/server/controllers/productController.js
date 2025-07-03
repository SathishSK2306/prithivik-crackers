const Product = require("../models/Product");
const { sendEmail } = require("../utils/emailService");
const { sendWhatsAppMessage } = require("../utils/whatsappService");

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ stock: { $gt: 0 } });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Create new product
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Admin: Update product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Admin: Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Process order
exports.processOrder = async (req, res) => {
  try {
    const { customer, items, total } = req.body;

    // Update stock for each product
    for (const item of items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity },
      });
    }

    // Send email to customer
    await sendEmail({
      to: customer.email,
      subject: "Your Order Confirmation",
      text: `Thank you for your order! Total: ₹${total}`,
      html: `<p>Thank you for your order!</p><p>Total: ₹${total}</p>`,
    });

    // Send WhatsApp message
    await sendWhatsAppMessage(
      customer.phone,
      `Thank you for your order! Total: ₹${total}`
    );

    // Send email to admin
    await sendEmail({
      to: "admin@kavinacrackers.com",
      subject: "New Order Received",
      text: `New order from ${customer.name}. Total: ₹${total}`,
      html: `<p>New order from ${customer.name}.</p><p>Total: ₹${total}</p>`,
    });

    res.status(200).json({ message: "Order processed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
