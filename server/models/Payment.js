const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({ 
    client_id: mongoose.Schema.ObjectId,
    settlement_id: mongoose.Schema.ObjectId,
    amount: Number,
    payment_date: String,
}, {collection: 'Payment'})

const paymentModel = mongoose.model('Payment', paymentSchema);
module.exports = paymentModel