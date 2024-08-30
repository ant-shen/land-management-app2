const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
//file upload
const fileRoutes = require('./routes/fileRoutes'); 
//app.use('/api', fileRoutes);

app.use(cors({
    origin: 'https://master--tourmaline-praline-8590d5.netlify.app/', 
    //origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true 
  }));
  
app.use(express.json());

// Routing
app.use('/api/auth', require('./routes/auth'));
app.use('/api/login', require('./routes/loginRoute'));
app.use('/api/owners', require('./routes/owners'));
app.use('/api/landholdings', require('./routes/landHoldings'));
app.use('/api/upload', require('./routes/fileRoutes'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
