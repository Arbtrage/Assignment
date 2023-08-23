import express from "express"; // Import the Express framework
import cors from 'cors'; // Import the CORS middleware
import morgan from 'morgan'; // Import the Morgan logging middleware
import dotenv from 'dotenv'; // Import the dotenv library to manage environment variables
import connect from "./db.js"; // Import the database connection function
import user from "./routes/auth.js"; // Import the user routes
import order from "./routes/order.js"; // Import the order routes

dotenv.config(); // Load environment variables from the .env file

const app = express(); // Create an Express app instance

// Middlewares
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for all routes
app.use(morgan('tiny')); // Log HTTP requests
app.disable('x-powered-by'); // Disable the "x-powered-by" header
// Middlewares

const port = process.env.PORT || 3000; // Define the port for the server to listen on

// Use the user and order routes
app.use('/api', user); // Mount user routes under /api
app.use('/api', order); // Mount order routes under /api

// Start the server only when a valid database connection is established
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`);
        });
    } catch (error) {
        console.log('Cannot connect to the server');
    }
}).catch(error => {
    console.log("Invalid database connection...!");
});
