// Initializing Express app..
const express = require("express"),
  app = express();

//Configs
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

// cors
const cors = require("cors");
app.use(cors({ origin: "http://localhost:4200" }));

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
app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
