const express = require('express');
const connectDB = require('./config/db');

const app = express();

// connect DATAbase
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// define routes

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/job', require('./routes/api/job'));
app.use('/api/aprofile', require('./routes/api/aprofile'));
app.use('/api/rprofile', require('./routes/api/rprofile'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on Port ${PORT}`));