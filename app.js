// dependencies
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

//app creation (intial step)
const app = express();

// global middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// mounting [SALE]
const saleRouter = require("./routes/saleRoutes");
app.use("/api/v1/sale", saleRouter);

module.exports = app;
