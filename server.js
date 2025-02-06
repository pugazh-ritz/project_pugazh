require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const walletRoutes = require('./routes/walletRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/wallet', walletRoutes);
const MONGO_URI = 'mongodb://localhost:27017/wallet';
const JWT_SECRET = 'mySuperSecretKey123!';
console.log('MONGO_URI:', MONGO_URI);
console.log('JWT_SECRET:', JWT_SECRET);


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.listen(5000, () => console.log('Server running on port 5000'));




