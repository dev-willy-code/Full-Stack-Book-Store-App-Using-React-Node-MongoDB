const mongoose = require('mongoose'); //de nodejs
//import mongoose from 'mongoose'; //de js , necesitas type: "module"

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        city: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        zipcode: {
            type: String,
            required: true,
        }
    },
    phone: {
        type: Number,
        required: true,
    },
    productIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            required: true
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
    {
        timestamps: true
    });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;