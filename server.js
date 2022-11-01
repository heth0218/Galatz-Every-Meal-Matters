const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
    res.send({ msg: 'Welcome to Galatz' })
})

//Apis for different schemas
app.use('/api/users', require('./routes/users'));
app.use('/api/restaurant', require('./routes/restaurant'));
app.use('/api/menu', require('./routes/menu'));
app.use('/api/cart', require('./routes/cart'));

const PORT = 8020;

app.listen(PORT, () => {
    console.log(`Listening to post ${PORT}`)
})

module.exports = app;