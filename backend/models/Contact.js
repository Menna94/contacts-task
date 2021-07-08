const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please make sure to add a Name for your contact!"],
    pattern: /^[a-zA-Z]*$/,
  },
  phone: [
    {
      type: Number,
      required: [
        true,
        "Please make sure to add a Phone Number for your contact!",
      ],
    },
  ],
  address: {
    type: String,
    minlength: 3,
    maxlength: 50,
  },
  notes: {
    type: String,
    minlength: 3,
    maxlength: 200,
  },
});

const Contact = mongoose.model("Contact", ContactSchema);
module.exports = Contact;
