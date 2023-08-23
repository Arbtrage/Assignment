import { register, login } from "../controllers/auth.controller.js";
import express from "express";

const router = express.Router(); // Create a new Express router instance

// Define routes for user registration and login
router.post('/add-user', register); // POST request to register a new user
router.post('/login-user', login);   // POST request to log in a user

export default router; // Export the router for use in other files
