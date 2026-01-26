import mongoose from "mongoose";

const rsvpSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const RSVP = mongoose.model("RSVP", rsvpSchema);

export default RSVP;
