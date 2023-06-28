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
            is_selected: {
                type: Boolean,
                default: false
            }
        }
    ],
    total_price: {
        type: Number,
        required: [true, "Total price should be specified"]
    },
    // user_id: {
    //     type: Schema.Types.ObjectId,
    //     required: [true, "Cart should be assigned to a user"],
    //     ref: "User"
    // }
    user_id: {
        type: String,
        required: [true, "Cart should to associated with a user"]
    }
})

export default models.Cart || model("Cart", cartSchema)