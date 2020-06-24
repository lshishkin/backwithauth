const Contact = require("../model/Contact");

// Create and Save a new Contact
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
    
      // Create a Contact
      const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
     });
    
      // Save Contact in the database
      contact
        .save(contact)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Contact."
          });
        });
};

// Retrieve all Contacts from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Contact.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving contacts."
      });
    });
};

// Find a single Contact with an _id
exports.findOne = (req, res) => {
  const _id = req.params._id;

  Contact.findById(_id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Contact with _id " + _id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Contact with _id=" + _id });
    });
};

// Update a Contact by the _id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const _id = req.params._id;

  Contact.findByIdAndUpdate(_id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Contact with _id=${_id}. Maybe Contact was not found!`
        });
      } else res.send({ message: "Contact was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Contact with _id=" + _id
      });
    });
};

// Delete a Contact with the specified _id in the request
exports.delete = (req, res) => {
  const _id = req.params._id;

  Contact.findByIdAndRemove(_id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Contact with _id=${_id}. Maybe Contact was not found!`
        });
      } else {
        res.send({
          message: "Contact was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Contact with _id=" + _id
      });
    });
};

// Delete all Contacts from the database.
exports.deleteAll = (req, res) => {
  Contact.deleteMany({})
  .then(data => {
    res.send({
      message: `${data.deletedCount} Contacts were deleted successfully!`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all contacts."
    });
  });
};

// Find all published Contacts
exports.findAllPublished = (req, res) => {
  Contact.find({ published: true })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving contacts."
    });
  });
};