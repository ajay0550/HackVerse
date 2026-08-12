import Hackathon from "../models/Hackathon.js";


export const createHackathon = async (req, res) => {
    try {
        if (req.user.role !== "organiser") {
            return res.status(403).json({
                message: "Only organizers can create hackathons",
            });
        }
        const hackathon = await Hackathon.create({
            ...req.body,
            organizer: req.user.id,
        });

        return res.status(201).json(hackathon);
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};


export const getAllHackathons = async (req, res) => {
    try {
        const hackathons = await Hackathon.find()
            .populate("organizer", "name");

        return res.status(200).json(hackathons);
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};


export const getHackathonById = async (req, res) => {
    try {
        const hackathon = await Hackathon.findById(req.params.id)
            .populate("organizer", "name");

        if (!hackathon) {
            return res.status(404).json({
                message: "Hackathon not found",
            });
        }

        return res.status(200).json(hackathon);
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};


export const updateHackathon = async (req, res) => {
    try {
        const hackathon = await Hackathon.findById(req.params.id);

        if (!hackathon) {
            return res.status(404).json({
                message: "Hackathon not found",
            });
        }

        if (hackathon.organizer.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Not authorized",
            });
        }


        const {
            title,
            description,
            mode,
            location,
            startDate,
            endDate,
            registrationDeadline,
            prizePool,
            maxTeamSize,
        } = req.body;

        const updatedHackathon = await Hackathon.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                mode,
                location,
                startDate,
                endDate,
                registrationDeadline,
                prizePool,
                maxTeamSize,
            },
            {
                new: true,
                runValidators: true,
            }
        ).populate("organizer", "name");

        return res.status(200).json(updatedHackathon);
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};


export const deleteHackathon = async (req, res) => {
    try {
        const hackathon = await Hackathon.findById(req.params.id);

        if (!hackathon) {
            return res.status(404).json({
                message: "Hackathon not found",
            });
        }


        if (hackathon.organizer.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Not authorized",
            });
        }

        await hackathon.deleteOne();

        return res.status(200).json({
            message: "Hackathon deleted successfully",
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};
export const getMyHackathons = async (req, res) => {
  try {
    const hackathons = await Hackathon.find({
      organizer: req.user.id,
    }).populate("organizer", "name");

    return res.status(200).json(hackathons);

  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};