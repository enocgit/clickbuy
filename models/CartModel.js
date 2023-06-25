import { Schema, model, models } from "mongoose";

const cartSchema = new Schema({
    products: [
        {
            product_id: {
                type: Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number,
                required: [true, "Product quantity in required in cart"],
                min: [1, "Quantity must be at least 1"]
            },
            isSelected: {
                type: Boolean,
                default: false
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: [true, "Total price should be specified"]
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: [true, "Cart should be assigned to a user"],
        ref: "User"
    }
})

export default models.Cart || model("Cart", cartSchema)