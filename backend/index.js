import express from "express";
import { mongoDB } from "./db.js"; // MongoDB connection
import CreateUserRouter from './Routes/CreateUser.js'; // Correct path to the router
import DisplayDataRouter from './Routes/DisplayData.js';
import orderData from './Routes/OrderData.js';
import cors from "cors";
import Razorpay from 'razorpay';
import OrderPayment from './Routes/OrderPayment.js'

const razorpay = new Razorpay({
  key_id: '' ,  // Replace with Razorpay Key ID
  key_secret: ''  // Replace with Razorpay Key Secret
});


const port = 5000;
const app = express();

// Connect to MongoDB
mongoDB();

// Use CORS middleware to allow requests from your frontend (localhost:3000)
app.use(cors({
    origin: "http://localhost:3000", // Allow frontend requests from localhost:3000
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept"
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Use the CreateUser router for /api routes
app.use('/api', CreateUserRouter);

app.use('/api', DisplayDataRouter);

app.use('/api', orderData);

app.use('/api', OrderPayment);

// Basic route
app.get("/", (req, res) => {
    res.send("Hello World!---");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
