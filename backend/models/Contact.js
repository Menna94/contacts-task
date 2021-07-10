const mongoose = require("mongoose");

/*

  contact :{
    name: "Ahmed",                          ---> 1) chars only  2) min: 3 chars  3) required
    phone: 123456789101,                    ---> 1) int only    2) 11 num        3) required    4) unique
    address:"Egypt",                        ---> min: 3 chars
    notes:"A doctor I met in the metro.."   ---> max:100 char
  }

*/

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please make sure to add a Name for your contact!"],
    pattern: /^[a-zA-Z]*$/,
    minlength: 3,
  },
  phone: [
    {
      type: Number,
      required: [
        true,
        "Please make sure to add a Phone Number for your contact!",
      ],
      unique: [true, "This Number Already Exists.."],
      maxlength: 99999999999,
    },
  ],
  address: {
    type: String,
    minlength: 3,
  },
  notes: {
    type: String,
    maxlength: 100,
  },
});

const Contact = mongoose.model("Contact", ContactSchema);
module.exports = Contact;
