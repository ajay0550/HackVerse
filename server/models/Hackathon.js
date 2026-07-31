import mongoose from "mongoose";

const hackathonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mode: {
      type: String,
      enum: ["Online", "Offline", "Hybrid"],
      required: true,
    },
    location: {
      type: String,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    registrationDeadline: {
      type: Date,
      required: true,
    },
    prizePool: {
      type: Number,
      default: 0,
    },
    maxTeamSize: {
      type: Number,
      default: 4,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Hackathon", hackathonSchema);