// Database
require("./connection");

// Server setup
const express = require("express");

const app = express();
const cookieSession = require("cookie-session");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

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


app.listen(port, () => console.log("Server has started"));
