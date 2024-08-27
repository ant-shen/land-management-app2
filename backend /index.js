const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
    //origin: 'http://localhost:8080', 
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type'],
    credentials: true 
  }));
app.use(express.json());

// Routing
app.use('/api/auth', require('./routes/auth'));
app.use('/api/login', require('./routes/loginRoute'));
app.use('/api/owners', require('./routes/owners'));
app.use('/api/landholdings', require('./routes/landHoldings'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
