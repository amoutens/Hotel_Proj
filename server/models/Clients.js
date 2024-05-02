const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({ 
    name: String,
    phone: String,
    passport: String,
}, {collection: 'Clients'})

const clientModel = mongoose.model('Clients', clientSchema);
module.exports = clientModel