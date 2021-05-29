require('dotenv').config();
const express = require("express");
const cors = require("cors");
const helmet = require('helmet')
const morgan = require('morgan')
const compression = require('compression')
const userRoute = require('./routes/userRoute')


const PORT = process.env.PORT || 5000
const app = express();

// Middlewares
app.use(compression())
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    res.send("Hello world")
})

// Routes
app.use('/user', userRoute)

app.listen(PORT, () => {
    console.log(`Listening to the PORT ${PORT}`)
})

