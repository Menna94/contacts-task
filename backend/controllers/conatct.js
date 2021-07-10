const { ObjectId } = require("mongodb");
const Contact = require("../models/Contact");

/*
    Create a new contact
    POST /contacts
    private
*/
exports.addContact = async (req, res, next) => {
  const { name, phone, address, notes } = req.body;

  try {
    const newContact = await Contact.create({ name, phone, address, notes });

    //Error in Creating a Contact
    if (!newContact) {
      return res.status(400).send({
        success: false,
        data: null,
      });
    }

    //Successfully add new contact
    res.status(201).send({
      success: true,
      data: newContact,
    });
  } catch (err) {
    //Server Error
    res.status(500).send({
      success: false,
      data: err,
    });
  }
};

/*
    Fetch all contacts
    GET /contacts
    public
*/
exports.getContacts = async (req, res, next) => {
  try {
    const reqQuery = { ...req.query };

    //Fields to execlude
    const removedFields = ["sort", "page", "orderby"];

    //Loop over removedFields and delete them from req.query
    removedFields.forEach((param) => delete reqQuery[param]);

    //Create query string
    let queryStr = JSON.stringify(reqQuery);

    //Finding resource
    let query = Contact.find(JSON.parse(queryStr));

    //Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      if (req.query.orderby === 0) {
        query = query.sort({ sortBy: -1 });
      }
      query = query.sort({ sortBy: 1 });
    } else {
      query = query.sort({ name: 1 });
    }

    //Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Contact.countDocuments();

    query = query.skip(startIndex).limit(limit);

    //Executing query
    const results = await query;

    //Pagination Result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    if (results) {
      return res.status(201).send({
        success: true,
        count: results.length,
        msg: "All Data Fetched SUCCESSFULLY~",
        pagination,
        data: results,
      });
    }
    return res.status(404).send({
      success: false,
      msg: "Couldn't Fetch Data!",
      data: null,
    });
  } catch (err) {
    //Server Error
    res.status(500).send({
      success: false,
      data: err,
    });
  }
};

/*
    Fetch single contact
    GET /contacts/:id
    public
*/
exports.getContact = async (req, res, next) => {
  try {
    const id = req.params.id;
    // Check if the id is a valid mongoose objectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).send(`No record with this ID: ${id}`);
    }
    const contact = await Contact.findById(id);

    //Error in Fetching SIngle Record
    if (!contact) {
      return res.status(404).send({
        success: false,
        data: null,
      });
    }
    //Fetching Contact Successfully
    res.status(200).send({
      success: true,
      data: contact,
    });
  } catch (err) {
    //Server Error
    res.status(500).send({
      success: false,
      data: err,
    });
  }
};

/*
    Update contact
    PUT /contacts/:id
    private
*/
exports.updateContact = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Check if the id is a valid mongoose objectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).send(`No record with this ID: ${id}`);
    }

    //First: Check if the Contact exists in the Database
    const contact = await Contact.findById(id);

    //No Contact With Such ID
    if (!contact) {
      return res.status(404).send({
        success: false,
        data: null,
      });
    } else {
      //If Contact exists: Update
      const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
        new: true, //retuen the updated version
        runValidators: true, //turn on validation for the updated version
      });

      //Error in Update Query
      if (!updatedContact) {
        return res.status(400).send({
          success: false,
          data: null,
          msg: "Could'nt Update Contact",
        });
      }

      //Updating Successfully
      res.status(200).send({
        success: true,
        data: updatedContact,
        msg: "Contact Updated SUCCESSFULLY~",
      });
    }
  } catch (err) {
    //Server Error
    res.status(500).send({
      success: false,
      data: err,
    });
  }
};

/*
    Delete a contact
    DELETE /contacts/:id
    private
*/
exports.delContact = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Check if the id is a valid mongoose objectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).send(`No record with this ID: ${id}`);
    }

    //First: Check if the Contact exists in the Database
    let contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).send({
        success: false,
        data: null,
      });
    }

    //then: Delete
    contact = await Contact.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      data: await Contact.find(),
    });
  } catch (err) {
    //Server Error
    res.status(500).send({
      success: false,
      data: err,
    });
  }
};
