// Database
require("./connection")

// Server setup
const express = require('express')

const cors = require('cors')
const app = express()
const cookieSession = require('cookie-session')

const port = process.env.PORT || 8080
const path = require('path');

// Routers
// const usersRouter = require('./Routes/usersRoute')
// const sessionRouter = require('/Routes/sessionRoute')
// const productRouter = require('/Routes/productRoute')
// const orderRouter = require('/Routes/orderRoute')
// const shipmentRouter = require('/Routes/shipmentRoute')



// app.use
// app.use('/api/users', usersRouter)
// app.use('/api/sessions', sessionRouter)
// app.use('/api/products', productRouter)
// app.use('/api/orders', orderRouter)
// app.use('/api/shipments', shipmentRouter)

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000']
}))
app.use(cookieSession({
    name: 'LoginSession',
    secret: 'GuppA4Lyf3-geeks',
    // maxAge: 24 * 60 * 60 * 1000, //24 hours
    maxAge: 1000 * 60 * 60  , //1 hour
    // maxAge: 30 * 60 * 1000, //30 minutes
    // maxAge: 60 * 1000, //1 minute
    // maxAge: 15 * 1000, //15 seconds
    // maxAge: 10 * 1000, //10 seconds
    // maxAge: 5 * 1000, //5 seconds
    sameSite: 'strict',
    httpOnly: true,
    secure: false,
}))


app.listen(port, () => console.log('Server has started'))