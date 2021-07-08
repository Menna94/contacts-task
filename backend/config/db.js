const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      //connection string
      "mongodb+srv://menna:menna1234@cluster0.t7obw.mongodb.net/contacts?retryWrites=true&w=majority",
      {
        //options
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    );
    console.log("Connected To DB SUCCESSFULLY~");
  } catch (error) {
    console.log(`ERROR in DB Connection ${error}`);
  }
};

module.exports = connectDB;
