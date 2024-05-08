const mongoose = require('mongoose');

const settlementsSchema = new mongoose.Schema({ 
    client_id: mongoose.Schema.ObjectId,
    payment_id: String || mongoose.Schema.ObjectId,
    room_id: mongoose.Schema.ObjectId,
    check_in_date: String,
    check_out_date: String,
}, {collection: 'Settlements'})

const settlementsModel = mongoose.model('Settlements', settlementsSchema);
module.exports = settlementsModel