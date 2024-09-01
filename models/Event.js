const mongoose = require("mongoose");

// Define valid types
const Types = ["Int", "Float", "Double", "String", "Boolean", "Long", "Short"];

const eventSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Parameters: [
    {
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: Types,
        required: true,
      },
    },
  ],
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
