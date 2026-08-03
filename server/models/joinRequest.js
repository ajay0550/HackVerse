import mongoose from "mongoose";

const joinRequestSchema = new mongoose.Schema(
    {
        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            required: true,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        status: {
            type: String,
            enum: ["Pending", "Accepted", "Rejected"],
            default: "Pending",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("JoinRequest", joinRequestSchema);