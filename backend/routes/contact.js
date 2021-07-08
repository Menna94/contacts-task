const {
  addContact,
  getContacts,
  getContact,
  delContact,
  updateContact,
} = require("../controllers/conatct");

const express = require("express"),
  router = express.Router();

//Create a new contact
//POST /contacts
router.post("/", addContact);

//Fetch all contacts
//GET /contacts
router.get("/", getContacts);

//Fetch single contact
//GET /contacts/:id
router.get("/:id", getContact);

//Update contacts
//PUT /contacts/:id
router.put("/:id", updateContact);

//Delete a contact
//DELETE /contacts/:id
router.delete("/:id", delContact);

module.exports = router;
