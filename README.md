# 🍽️ Mealvora Food Delivery App

**Mealvora** is a web-based food delivery application where users can browse meals, add them to their cart, and place orders. The app features user authentication and order tracking, with a sleek interface powered by React and Node.js.

## 📋 Features
- **User Authentication**: Sign up, Login
- **Browse Meal Items**: View details
- **Add Items**: To the cart
- **Place Orders**: Track previous orders

## 🛠️ Technologies Used
- **Frontend**: React, Bootstrap
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)

## 🚀 Installation
To run the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/Mealvora-Food-Delivery-App.git
   cd Mealvora-Food-Delivery-App

2. **Install dependencies: Navigate to both the frontend and backend directories and run**:
   ```bash
    # For frontend
    cd frontend
    npm install

    # For backend
    cd ../backend
    npm install

3. **Set environment variables: Create a .env file in the backend folder with**:
   ```bash
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key

4. **Run the project: Open two terminals, one for the client and one for the server**:
   ```bash
    # Client (React)
    cd frontend
    npm start
    
    # Server (Node.js)
    cd backend
    npm start
5. **Access the application**:
   - **Frontend**: Client runs on http://localhost:3000
   - **Frontend**: Server runs on http://localhost:5000

## Folder Structure
```bash
  Mealvora-Food-Delivery-App
  ├── backend               # Node.js backend
  │   ├── models            # Database models
  │   ├── routes            # API routes
  │   └── server.js         # Main server file
  ├── frontend              # React frontend
  │   ├── src               # Frontend source code
  │   └── public
  ├── .gitignore
  ├── README.md
  └── package.json

Contributing
Contributions are welcome! Feel free to fork this project and submit a pull request.




