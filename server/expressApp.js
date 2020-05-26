// Database
require("./connection");

// Server setup
const express = require("express");

const app = express();
const cookieSession = require("cookie-session");
const cors = require("cors");
require("express-async-errors");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  cookieSession({
    name: "LoginSession",
    secret: "GuppA4Lyf3-geeks",
    // maxAge: 24 * 60 * 60 * 1000, //24 hours
    maxAge: 1000 * 60 * 60, //1 hour
    // maxAge: 30 * 60 * 1000, //30 minutes
    // maxAge: 60 * 1000, //1 minute
    // maxAge: 15 * 1000, //15 seconds
    // maxAge: 10 * 1000, //10 seconds
    // maxAge: 5 * 1000, //5 seconds
    sameSite: "strict",
    httpOnly: true,
    secure: false,
  })
);

const port = process.env.PORT || 8080;
// const path = require('path');

// Routers
const usersRouter = require("./routes/usersRoute");
const sessionRouter = require('./routes/sessionRoute')
const productRouter = require("./routes/productsRoute");
const orderRouter = require("./routes/orderRoute");
const shipmentRouter = require("./routes/shipmentRoute");

// app.use

app.use("/api/users", usersRouter);
app.use('/sessions', sessionRouter)
app.use('/api/products', productRouter)
app.use("/api/orders", orderRouter);
app.use("/api/shipments", shipmentRouter);

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);


//handle 404 errors
app.use(function (req, res) {
  res.status(404).json({ message: "The resource does not exist" });
});

//Global error handler
app.use(function (error, req, res, next) {
  console.error(error);
  next(error);
});

app.use(function (error, req, res, next) {
  if (!error.statusCode) {
    error.statusCode = 500;
  }
  res.status(error.statusCode).json({ message: error.message });
});

app.listen(port, () => console.log("Server has started"));
