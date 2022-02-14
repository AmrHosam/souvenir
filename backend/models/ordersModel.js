import Mongoose from 'mongoose'

const orderSchema = Mongoose.Schema({
    user: {
        type: Mongoose.Schema.Types.ObjectId,
        unique: true,
        required: true,
        ref: 'User',
    },
    orderItems: [
        {
            name: {
                type: String,

            },
            image: {
                type: String,

            },
            price: {
                type: Number,

                default: 0,
            },
            product: {
                type: Mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
            quantity: { type: Number, required: true},
        }
    ],

    shippingAddress: {
        address: { type: String, required: true, },
        city: { type: String, required: true, },
        phone: { type: Number, required: true, }
    },

    paymentMethod: {
        type: String,
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

    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
      },
      paidAt: {
        type: Date,
      },
      isDelivered: {
        type: Boolean,
        required: true,
        default: false,
      },
      deliveredAt: {
        type: Date,
      },

},
    {
        timestamps: true,
    }
)
const Order = Mongoose.model('orders', orderSchema)
export default Order