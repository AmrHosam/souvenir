import Mongoose from 'mongoose'

const orderSchema = Mongoose.Schema({

    user: {
        Type: Mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'

    },

    orderItems: [
        {
            name: { type: String, required: True },
            qty: { type: Number, required: True },
            image: { type: String, required: True },
            price: { type: Number, required: True },
            product: {
                Type: Mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            }
        }
    ],

    shippingAddress: {
        address: { type: String, required: True },
        city: { type: String, required: True },
    },

    paymentMethod: {
        Type: String,
        required: true,

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