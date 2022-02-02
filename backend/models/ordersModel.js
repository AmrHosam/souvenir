import Mongoose from 'mongoose'

const orderSchema = Mongoose.Schema({

    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
        }
    ],

    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
    },

    paymentMethod: {
        Type: String,
    },

    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email: { type: String }

    },

    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0,

    },

    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,

    }

},
    {
        timestamps: true,
    }
)
const Order = Mongoose.model('orders', orderSchema)
export default Order