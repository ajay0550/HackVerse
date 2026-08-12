import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
      unique: true,
    },

    hackathon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hackathon",
      required: true,
    },

    githubRepo: {
      type: String,
      required: true,
      trim: true,
    },

    demoVideo: {
      type: String,
      required: true,
      trim: true,
    },

    presentation: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    score: {
      type: Number,
      default: null,
      min: 0,
      max: 100,
    },

    feedback: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Submission", submissionSchema);