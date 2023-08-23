import mongoose from "mongoose"; // Import the mongoose library

// Function to connect to the MongoDB database
const connect = async () => {
  try {
    // Use mongoose to connect to the MongoDB database using the provided URL
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // If the connection is successful, log a success message
    console.log("Database Connected");
  } catch (err) {
    // If an error occurs during connection, log the error message and exit the process
    console.error(err.message);
    process.exit(1);
  }
};

export default connect; // Export the connect function to use it in other parts of the application
