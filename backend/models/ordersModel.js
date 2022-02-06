import Mongoose from 'mongoose'

const orderSchema = Mongoose.Schema({

    orderItems: [
        {
            name: {
                type: String,

            },
            image: {
                type: String,

            },
            description: {
                type: String,

            },
            category: {
                type: String,

            },
            countInStock: {
                type: Number,

                default: 0,
            },
            price: {
                type: Number,

                default: 0,
            }
        }
    ],

    shippingAddress: {
        address: { type: String },
        city: { type: String },
        phone: { type: Number }
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

        default: 0.0,

    },

    totalPrice: {
        type: Number,

        default: 0.0,

    }

},
    {
        timestamps: true,
    }
)
const Order = Mongoose.model('orders', orderSchema)
export default Order