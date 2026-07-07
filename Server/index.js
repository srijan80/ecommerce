require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./models/Product");
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payment');
const orderRoutes = require('./routes/orders');

const app = express();

// Test route BEFORE middleware (to diagnose blocking)
app.get("/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

app.use(cors());
app.use(express.json());
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payment', paymentRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

// MongoDB Connection with better error handling
const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    console.log("MONGO_URI:", process.env.MONGO_URI);
    
    await mongoose.connect(process.env.MONGO_URI, {
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 10000,
    });
    
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error(" MongoDB Connection Error:", err.message);
  }
};

// Connect to database
connectDB();

// Listen for connection events
mongoose.connection.on('error', (err) => {
  console.error(" MongoDB connection error:", err.message);
});

mongoose.connection.on('disconnected', () => {
  console.warn(" MongoDB disconnected - attempting to reconnect...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
