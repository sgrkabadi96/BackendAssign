const mongoose = require("mongoose");

// Define valid types
const Types = [
  "int",
  "float",
  "double",
  "char",
  "bool",
  "long",
  "short",
  "unsigned int",
  "unsigned long",
  "string",
];

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  parameters: [
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
