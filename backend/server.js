// Initializing Express app..
const express = require("express"),
  app = express();

// cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

// const cors = require("cors");
// app.use(cors({ origin: "http://localhost:51675" }));

//Configs
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

//Routes
const contactRoutes = require("./routes/contact");

//body parser
app.use(express.json());

//db
const connectDB = require("./config/db");
connectDB();

//Mount Routes
app.use("/contacts", contactRoutes);

//
module.exports = app;
