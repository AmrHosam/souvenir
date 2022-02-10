import Mongoose from 'mongoose'

const orderSchema = Mongoose.Schema({
    user: {
        type: Mongoose.Schema.Types.ObjectId,
        default: '620016904c565ac0084256a5',
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
        type: String,
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