import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

/**
 * GET /api/events
 * Public – get all events
 */
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events" });
  }
});

/**
 * GET /api/events/:id
 * Public – get single event
 */
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Invalid event ID" });
  }
});

export default router;
