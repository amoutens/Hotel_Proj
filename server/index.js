//mongodb+srv://Kate_Zhayvoronok_IS-22:1234321@cluster0.roihsld.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const express = require('express')
const connectDB = require('./db.js');
const cors = require('cors');
const mongoose  = require('mongoose');
const roomModel = require('./models/Rooms.js')
const clientsModel = require('./models/Clients.js')
const paymentModel = require('./models/Settlements.js')
const settlementsModel = require('./models/Settlements.js');

const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.get('/', async (req, res) => {
    const rooms = await roomModel.find();
    const clients = await clientsModel.find();
    const payments = await paymentModel.find();
    const settlements = await settlementsModel.find();
    return res.json({Rooms: rooms, Clients: clients, Payments: payments, Settlements: settlements});
})

// app.get('/getClient/:id', (req, res) => {
//     const id = req.params.id;
//     clientsModel.findOne({_id: id})
//     .then(client => res.json(client))
//     .catch(err => res.status(500).json({ error: err.message }));
// });
app.get('/getClient/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const client = await clientsModel.findById(id);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.json(client);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.put('/updateClient/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const client = await clientsModel.findByIdAndUpdate(id, 
            {name: req.body.name,
                 phone:req.body.phone,
                 passport:req.body.passport});
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.json(client);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})


app.post('/createClient', (req, res) => {
    clientsModel.create(req.body)
    .then(clients => res.json(clients))
    .catch(err => res.json(err))
})

// app.get('/collections', async (req, res) => {
//     try {
//       const collections = await mongoose.connection.db.listCollections().toArray();
//       res.json({ collections });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });

app.listen(3000, () => {
    console.log("app is running");
})