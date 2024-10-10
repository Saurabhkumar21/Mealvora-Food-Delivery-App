import express from 'express'; // Correct ES6 import syntax
import Order from '../models/Orders.js'; // Assuming you are using ES6 module for your model as well

const router = express.Router();

router.post('/orderData', async (req, res) => {
    console.log("Test");
    
    let data = req.body.order_data;
    console.log(data);
    

    // Add order date at the beginning of the order data array
    data.splice(0, 0, { Order_date: req.body.order_date });

    try {
        let eId = await Order.findOne({ email: req.body.email });
        console.log(eId);

        if (eId === null) {
            // If no entry is found, create a new order record
            await Order.create({
                email: req.body.email,
                order_data: [data]
            });
            res.json({ success: true });
        } else {
            // If the user already exists, update the existing order data
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
            res.json({ success: true });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error: " + error.message);
    }
});

router.post('/myorderData', async (req, res) => {
try {
    let myData = await Order.findOne({'email':req.body.email})
    res.json({orderData:myData})
} catch (error) {
    res.send("Server Error", error.message)
}
})
export default router;
