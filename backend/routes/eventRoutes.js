import express from "express";
import mongoose from "mongoose";
import Event from "../models/Event.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events" });
  }
});

//students
router.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid event ID" });
  }

  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch event" });
  }
});

//admin
router.post("/", protect, async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      venue,
      tags,
      coverImage,
    } = req.body;

    const event = await Event.create({
      title,
      description,
      date,
      venue,
      tags,
      coverImage,
      committee: req.admin.committee,
    });

    res.status(201).json(event);
  } catch (error) {
    console.error("CREATE EVENT ERROR:", error);
    res.status(500).json({ message: "Failed to create event" });
  }
});

//put
router.put("/:id", protect, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid event ID" });
  }

  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.committee !== req.admin.committee) {
      return res.status(403).json({ message: "Not authorized" });
    }

    Object.assign(event, req.body);
    const updated = await event.save();

    res.json(updated);
  } catch (error) {
    console.error("UPDATE EVENT ERROR:", error);
    res.status(500).json({ message: "Failed to update event" });
  }
});


//delete
router.delete("/:id", protect, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid event ID" });
  }

  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.committee !== req.admin.committee) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await event.deleteOne();
    res.json({ message: "Event deleted" });
  } catch (error) {
    console.error("DELETE EVENT ERROR:", error);
    res.status(500).json({ message: "Failed to delete event" });
  }
});

export default router;
