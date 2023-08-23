import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import createError from "http-errors";

// Add a new order
export const addOrder = async (req, res) => {
  // Get the user ID from the authenticated user (assuming req.user contains the user information)
  const { userId } = req.user;
  
  const { orderName } = req.body;
  try {
    // Find the user by their ID
    const user = await User.findById(userId);
    if (!user) throw createError.NotFound("User not found");

    // Create a new order linked to the user
    const order = new Order({ user: user._id, orderName });
    await order.save();

    // Add the order reference to the user's orders array
    user.orders.push(order._id);
    await user.save();

    // Send a success response
    res.status(201).json({ message: "Order added successfully" });
  } catch (error) {
    // Handle errors
    res.status(400).json({ message: error.message });
  }
};

// Get orders for a user
export const getOrder = async (req, res) => {
  // Get the user ID from the authenticated user (assuming req.user contains the user information)
  const { userId } = req.user;
  try {
    // Find all orders associated with the user's ID
    const orders = await Order.find({ user: userId });
    if (!orders || orders.length === 0)
      throw createError.NotFound("No orders found for this user");

    // Send the orders in the response
    res.json({ orders });
  } catch (error) {
    // Handle errors
    res.status(400).json({ message: error.message });
  }
};
