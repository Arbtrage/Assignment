import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import createError from "http-errors";

// Register a new user
export const register = async (req, res) => {
  const { userName, number, password } = req.body;
  try {
    // Check if a user with the provided number already exists
    const doesExists = await User.findOne({ number: number });
    if (doesExists)
      throw createError.Conflict(
        `A user with this ${number} number already exists!!`
      );

    // Create a new user
    const user = new User({ userName, number, password });
    await user.save();

    // Send a success response
    res.status(201).json({ Message: "User registered successfully" });
  } catch (error) {
    // Handle registration errors
    res.status(400).json({ message: error.message });
  }
};

// User login
export const login = async (req, res) => {
  const { number, password } = req.body;
  try {
    // Check if the phone number is of 10 digits
    if (number.length !== 10)
      throw createError.NotAcceptable("Phone number must be of 10 digits");

    // Find the user by their phone number
    const user = await User.findOne({ number: number });
    if (!user) throw createError.NotFound("User not registered");

    // Check if the password is valid
    const isMatch = await user.isValidPassword(password);
    if (!isMatch)
      throw createError.Unauthorized("Username/password not valid");

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);

    // Send the token in the response
    res.json({ message: "Login successful", token: token });
  } catch (error) {
    // Handle login errors
    res.status(400).json({ message: error.message });
  }
};
