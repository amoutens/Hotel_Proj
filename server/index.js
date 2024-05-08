//mongodb+srv://Kate_Zhayvoronok_IS-22:1234321@cluster0.roihsld.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const express = require('express')
const connectDB = require('./db.js');
const cors = require('cors');
const mongoose  = require('mongoose');
const roomModel = require('./models/Rooms.js')
const clientsModel = require('./models/Clients.js')
const paymentModel = require('./models/Payment.js')
const settlementsModel = require('./models/Settlements.js');


const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.get('/', async (req, res) => {
    let rooms = await roomModel.find().lean();
    rooms.forEach(room => {
        room.room_number = parseInt(room.room_number);
    });
    rooms.sort((a, b) => a.room_number - b.room_number);
    const clients = await clientsModel.find().sort({ name: 1 });
    const payments = await paymentModel.find();
    const settlements = await settlementsModel.find().sort({check_in_date:1});
    return res.json({ Rooms: rooms, Clients: clients, Payments: payments, Settlements: settlements });
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
    .then(rooms => res.json(rooms))
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




app.delete('/deleteSettlement/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const settl = await settlementsModel.findByIdAndDelete(id);
        if (!settl) {
            return res.status(404).json({ message: 'Settlement not found' });
        }
        res.json(settl);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.post('/createSettlement', (req, res) => {
    settlementsModel.create(req.body)
    .then(settl => res.json(settl))
    .catch(err => res.json(err))
})

app.put('/updateSettlement/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const settl = await settlementsModel.findByIdAndUpdate(id, 
            {client_id: req.body.client_id,
                payment_id:req.body.payment_id,
                room_id:req.body.room_id,
                check_in_date: req.body.check_in_date,
                check_out_date: req.body.check_out_date
            });
        if (!settl) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.json(settl);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/getSettlement/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const settl = await settlementsModel.findById(id);
        if (!settl) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.json(settl);
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