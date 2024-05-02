const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({ 
    room_number: Number,
    capacity: Number,
    comfort_level: String,
    price: Number
}, {collection: 'Rooms'})

const roomModel = mongoose.model('Rooms', roomSchema);
module.exports = roomModel