const { ObjectId } = require("mongodb");
const Contact = require("../models/Contact");

//Create a new contact
//POST /contacts
exports.addContact = async (req, res, next) => {
  const { name, phone, address, notes } = req.body;

  try {
    const newContact = await Contact.create({ name, phone, address, notes });

    if (!newContact) {
      return res.status(400).send({
        success: false,
        data: null,
      });
    }
    res.status(201).send({
      success: true,
      data: newContact,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      data: err,
    });
  }
};

//Fetch all contacts
//GET /contacts
exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();

    if (!contacts) {
      return res.status(400).send({
        success: false,
        data: null,
      });
    }
    res.status(200).send({
      success: true,
      data: contacts,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      data: err,
    });
  }
};

//Fetch one contact
//GET /contacts/:id
exports.getContact = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).send(`No record with this ID: ${id}`);
    }
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).send({
        success: false,
        data: null,
      });
    }
    res.status(200).send({
      success: true,
      data: contact,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      data: err,
    });
  }
};

//Update contact
//PUT /contacts/:id
exports.updateContact = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).send(`No record with this ID: ${id}`);
    }
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).send({
        success: false,
        data: null,
      });
    } else {
      const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedContact) {
        return res.status(400).send({
          success: false,
          data: null,
          msg: "Could'nt Update Contact",
        });
      }
      res.status(200).send({
        success: true,
        data: updatedContact,
        msg: "Contact Updated SUCCESSFULLY~",
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      data: err,
    });
  }
};

//Delete contact
//DELETE /contacts/:id
exports.delContact = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).send(`No record with this ID: ${id}`);
    }
    let contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).send({
        success: false,
        data: null,
      });
    }
    contact = await Contact.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      data: await Contact.find(),
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      data: err,
    });
  }
};
