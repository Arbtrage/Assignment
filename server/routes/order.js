import { addOrder, getOrder } from "../controllers/order.controller.js"; // Import addOrder and getOrder functions from the order.controller module
import express from "express"; // Import the Express framework
import auth from "../middleware/auth.middleware.js"; // Import the authentication middleware

const router = express.Router(); // Create a new router instance using Express

// Define routes for adding and getting orders
// Route to add an order
router.post('/add-order', auth, addOrder); // When a POST request is made to '/add-order', the auth middleware is executed first, followed by the addOrder function

// Route to get orders
router.get('/get-orders', auth, getOrder); // When a GET request is made to '/get-orders', the auth middleware is executed first, followed by the getOrder function

export default router; // Export the router to make it accessible to other parts of the application
