import express from "express";
import RSVP from "../models/RSVP.js";
import Event from "../models/Event.js";
import mongoose from "mongoose";


const router = express.Router();

//students RSVP to event
router.post("/:id/rsvp", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid event ID" });
    }

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const rsvp = await RSVP.create({
      event: event._id,
      name,
      email,
    });

    res.status(201).json(rsvp);
  } catch (error) {
    console.error("RSVP POST ERROR:", error);
    res.status(500).json({ message: "Failed to submit RSVP" });
  }
});


//get RSVPs for an event
router.get("/:id/rsvps", async (req, res) => {
  try {
    const rsvps = await RSVP.find({ event: req.params.id })
      .sort({ createdAt: -1 });

    res.json(rsvps);
  } catch (error) {
    console.error("RSVP ERROR:", error);
    res.status(500).json({ message: "Failed to fetch RSVPs" });
  }
});

export default router;
