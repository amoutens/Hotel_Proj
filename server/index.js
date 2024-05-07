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

app.delete('/deleteClient/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const client = await clientsModel.findByIdAndDelete(id);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.json(client);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/createClient', (req, res) => {
    clientsModel.create(req.body)
    .then(clients => res.json(clients))
    .catch(err => res.json(err))
})

app.post('/createRoom', (req, res) => {
    roomModel.create(req.body)
    .then(roms => res.json(rooms))
    .catch(err => res.json(err))
})
app.get('/getRoom/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const room = await roomModel.findById(id);
        if (!room) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.json(room);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.put('/updateRoom/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const room = await roomModel.findByIdAndUpdate(id, 
            {room_number: req.body.room_number,
                 capacity:req.body.capacity,
                 comfort_level:req.body.comfort_level,
                price: req.body.price});
        if (!room) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.json(room);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})
app.delete('/deleteRoom/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const room = await roomModel.findByIdAndDelete(id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json(room);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
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