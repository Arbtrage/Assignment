import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define the schema for the Order model
export const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, // Reference to User model's ObjectId
        ref: "User", // Referencing the "users" collection
    },
    orderName: {
        type: String,
        required: [true, "Please insert an order"],
    },
});

// Create and export the Order model using the OrderSchema
export default mongoose.model("Order", OrderSchema);
