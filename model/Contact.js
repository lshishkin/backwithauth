const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
});

// export model user with ContactSchema
module.exports = mongoose.model("contact", ContactSchema);