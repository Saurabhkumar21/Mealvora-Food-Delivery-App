import mongoose from "mongoose";

const mongoURI = "mongodb+srv://saurabhkumar8301094:chhapra8986348868@cluster0.zqlo8.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0";

export const mongoDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoURI);
        console.log("Connected to DB successfully!");

        // Fetch food items
        let fetched_data = mongoose.connection.db.collection("food-items");
        let food_items = await fetched_data.find({}).toArray();

        // Fetch food categories
        let foodCategoryCollection = mongoose.connection.db.collection("foodCategory");
        let foodCategory = await foodCategoryCollection.find({}).toArray();

        // Store in global variables
        global.food_items = food_items;
        global.foodCategory = foodCategory;

        // Log data for confirmation
        // console.log(global.food_items);
        // console.log(global.foodCategory);
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};
