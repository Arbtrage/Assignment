import mongoose from "mongoose";
import bcrypt from "bcrypt"; // Import the bcrypt library for password hashing
const Schema = mongoose.Schema;

// Define the User schema
export const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Please provide unique Username"],
      unique: [true, "Username Exist"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      unique: false,
    },
    number: {
      type: Number,
      required: [true, "An account already exists with this number"],
      unique: true,
      min: [1000000000, "Number must be at least 10 digits"],
      max: [9999999999, "Number must be at most 10 digits"],
    },
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }], // Reference to the orders collection
  },
  { timestamps: true } // Automatically generate timestamps for createdAt and updatedAt
);

// Middleware executed before saving a user
UserSchema.pre("save", async function (next) {
  if (this.password === "") {
    return ""; // Skip hashing if password is empty
  }
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(10); // Generate a salt
      const hashedPassword = await bcrypt.hash(this.password, salt); // Hash the password
      this.password = hashedPassword; // Set the hashed password
    }
    next();
  } catch (error) {
    next(error); // Handle any errors
  }
});

// Method to validate user's password
UserSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password); // Compare hashed password
  } catch (error) {
    throw error; // Throw any errors that occur during comparison
  }
};

// Create and export the User model using the UserSchema
export default mongoose.model("User", UserSchema);
