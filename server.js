const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');
const authRoutes = require('./routes/auth.routes');
const visitorRoutes = require('./routes/visitor.routes');
const productRoutes = require('./routes/product.routes');
const subscriptionRoutes = require('./routes/subscription.routes');
require('dotenv').config();

const app = express();

// Fix Mongoose strictQuery warning
mongoose.set('strictQuery', true);

// Configure CORS to allow specific origins
const allowedOrigins = [
  'http://localhost:4200', // For local development
  'https://print-me-rosy.vercel.app' ,// Your deployed front-end URL
  'https://print-me-two.vercel.app/' // Your deployed front-end URL
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Allow cookies or Authorization headers if needed
}));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/visitor', visitorRoutes);
app.use('/api/product', productRoutes);
app.use('/api/subscription', subscriptionRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://sinnerman:sinnerman@cluster0.mqepi.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

module.exports.handler = serverless(app);