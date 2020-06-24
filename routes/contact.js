const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth")

const contacts = require("../controllers/contact.controller.js");

// Create a new Contacts
router.post("/", auth, contacts.create);

// Retrieve all Contacts
router.get("/", auth, contacts.findAll);

// Retrieve all published Contacts
//router.get("/published", auth, contacts.findAllPublished);

// Retrieve a single Contact with id
router.get("/:_id", auth, contacts.findOne);

// Update a Contact with id
router.put("/:_id", auth, contacts.update);

// Delete a Contact with id
router.delete("/:_id", auth, contacts.delete);

// Create a new Contact
router.delete("/", auth, contacts.deleteAll);

module.exports = router;