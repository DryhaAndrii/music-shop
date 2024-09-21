const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        products: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
                quantity: { type: Number, required: true },
            }
        ],
        totalPrice: { type: Number, required: true },
        name: { type: String, required: true },
        surname: { type: String, required: true },
        phone: { type: String, required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
        status: { type: String, default: 'created' }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);