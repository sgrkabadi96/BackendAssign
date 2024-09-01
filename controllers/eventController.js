const Event = require("../models/Event");
const { convertPlaintextToJSON } = require("../utils/textToJson");

exports.postEvents = async (req, res) => {
  const eventsText = req.body;
  const events = convertPlaintextToJSON(eventsText);

  try {
    if (!Array.isArray(events) || events.length === 0) {
      return res.status(400).json({
        message: "Invalid input: events should be a non-empty array.",
      });
    }

    for (const event of events) {
      if (
        !event.Name ||
        typeof event.Name !== "string" ||
        event.Name.trim() === ""
      ) {
        return res.status(400).json({
          message: `Event name "${event.Name}" is invalid.`,
        });
      }

      for (const param of event.Parameters) {
        if (
          !param.name ||
          typeof param.name !== "string" ||
          param.name.trim() === ""
        ) {
          return res.status(400).json({
            message: `Parameter name "${param.name}" is invalid.`,
          });
        }
      }

      const existingEvent = await Event.findOne({ Name: event.Name });
      if (existingEvent) {
        return res.status(400).json({
          message: `Event name "${event.Name}" already exists.`,
        });
      }
    }

    const result = await Event.insertMany(events);
    res
      .status(201)
      .json({ message: "Events created successfully", data: result });
  } catch (err) {
    console.error("Error creating events:", err);

    if (err.code === 11000) {
      res
        .status(400)
        .json({ message: "One or more event names are already in use." });
    } else if (err.name === "ValidationError") {
      res
        .status(400)
        .json({ message: "One or more events have invalid data." });
    } else {
      res.status(500).json({
        message: "An unexpected error occurred while creating events.",
      });
    }
  }
};

exports.getParameters = async (req, res) => {
  const { eventName } = req.params;
  const { paramName } = req.query;

  try {
    const event = await Event.findOne({ Name: eventName });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (paramName) {
      const parameter = event.Parameters.find(
        (param) => param.name === paramName
      );
      if (parameter) {
        return res.json({ type: parameter.type });
      } else {
        return res.status(404).json({ message: "Parameter not found" });
      }
    }

    return res.json(event.Parameters);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server error" });
  }
};
