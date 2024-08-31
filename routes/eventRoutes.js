const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

router.post("/events", eventController.postEvents);

router.get("/events/:eventName/parameters", eventController.getParameters);

module.exports = router;
