const { default: mongoose } = require("mongoose")

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(
            "mongodb+srv://Kate_Zhayvoronok_IS-22:1234321@cluster0.roihsld.mongodb.net/IS-22_Hotel?retryWrites=true&w=majority&appName=Cluster0")
        console.log('MongoDB connected successfully');
        }
    catch {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;