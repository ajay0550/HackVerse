import Submission from "../models/Submission.js";
import Team from "../models/Team.js";
import Hackathon from "../models/Hackathon.js";


export const createSubmission = async (req, res) => {
    const {
        team,
        githubRepo,
        demoVideo,
        presentation,
        description,
    } = req.body;

    try {
        const existingTeam = await Team.findById(team);

        if (!existingTeam) {
            return res.status(404).json({
                message: "Team not found",
            });
        }

        if (existingTeam.leader.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Only the team leader can submit the project",
            });
        }

        const hackathon = await Hackathon.findById(existingTeam.hackathon);

        if (!hackathon) {
            return res.status(404).json({
                message: "Hackathon not found",
            });
        }

        const existingSubmission = await Submission.findOne({
            team,
        });

        if (existingSubmission) {
            return res.status(400).json({
                message: "Submission already exists",
            });
        }

        const submission = await Submission.create({
            team,
            hackathon: hackathon._id,
            githubRepo,
            demoVideo,
            presentation,
            description,
        });

        return res.status(201).json(submission);

    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};


export const getAllSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find()
            .populate("team", "name")
            .populate("hackathon", "title");

        return res.status(200).json(submissions);

    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};


export const getSubmissionById = async (req, res) => {
    try {
        const submission = await Submission.findById(req.params.id)
            .populate("team", "name")
            .populate("hackathon", "title");

        if (!submission) {
            return res.status(404).json({
                message: "Submission not found",
            });
        }

        return res.status(200).json(submission);

    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};


export const updateSubmission = async (req, res) => {
    const {
        githubRepo,
        demoVideo,
        presentation,
        description,
    } = req.body;

    try {
        const submission = await Submission.findById(req.params.id);

        if (!submission) {
            return res.status(404).json({
                message: "Submission not found",
            });
        }

        const team = await Team.findById(submission.team);

        if (team.leader.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Only the team leader can update the submission",
            });
        }

        const updatedSubmission = await Submission.findByIdAndUpdate(
            req.params.id,
            {
                githubRepo,
                demoVideo,
                presentation,
                description,
            },
            {
                new: true,
                runValidators: true,
            }
        )
            .populate("team", "name")
            .populate("hackathon", "title");

        return res.status(200).json(updatedSubmission);

    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

export const judgeSubmission = async (req, res) => {
    const { score, feedback } = req.body;

    try {
        const submission = await Submission.findById(req.params.id);

        if (!submission) {
            return res.status(404).json({
                message: "Submission not found",
            });
        }

        const hackathon = await Hackathon.findById(
            submission.hackathon
        );

        if (!hackathon) {
            return res.status(404).json({
                message: "Hackathon not found",
            });
        }

        
        if (hackathon.organizer.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Only the hackathon organizer can judge submissions",
            });
        }

        if (score === undefined || score === null) {
            return res.status(400).json({
                message: "Score is required",
            });
        }

        if (score < 0 || score > 100) {
            return res.status(400).json({
                message: "Score must be between 0 and 100",
            });
        }

        submission.score = score;
        submission.feedback = feedback || "";

        await submission.save();

        return res.status(200).json({
            message: "Submission judged successfully",
            submission,
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

export const getHackathonSubmissions = async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.hackathonId);

    if (!hackathon) {
      return res.status(404).json({
        message: "Hackathon not found",
      });
    }

    
    if (hackathon.organizer.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Only the hackathon organizer can view submissions",
      });
    }

    const submissions = await Submission.find({
      hackathon: req.params.hackathonId,
    })
      .populate("team", "name")
      .populate("hackathon", "title");

    return res.status(200).json(submissions);

  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const getHackathonLeaderboard = async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(
      req.params.hackathonId
    );

    if (!hackathon) {
      return res.status(404).json({
        message: "Hackathon not found",
      });
    }

    const submissions = await Submission.find({
      hackathon: req.params.hackathonId,
      score: { $ne: null },
    })
      .populate("team", "name")
      .sort({ score: -1 });

    return res.status(200).json(submissions);

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: err.message,
    });
  }
};