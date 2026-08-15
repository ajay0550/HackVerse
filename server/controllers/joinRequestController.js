import Team from "../models/Team.js";
import JoinRequest from "../models/JoinRequest.js";
import Hackathon from "../models/Hackathon.js";


export const createJoinRequest = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);

        if (!team) {
            return res.status(404).json({
                message: "Team not found",
            });
        }

        
        if (team.members.some(member => member.toString() === req.user.id)) {
            return res.status(400).json({
                message: "You are already a member of this team",
            });
        }

       
        const existingRequest = await JoinRequest.findOne({
            team: req.params.id,
            user: req.user.id,
            status: "Pending",
        });

        if (existingRequest) {
            return res.status(400).json({
                message: "Join request already sent",
            });
        }

        const request = await JoinRequest.create({
            team: req.params.id,
            user: req.user.id,
        });

        return res.status(201).json(request);

    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};


export const getJoinRequests = async (req, res) => {
    try {
        const teams = await Team.find({
            leader: req.user.id,
        });

        const teamIds = teams.map(team => team._id);

        const requests = await JoinRequest.find({
            team: { $in: teamIds },
            status: "Pending",
        })
            .populate("user", "name email")
            .populate("team", "name");

        return res.status(200).json(requests);

    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};


export const acceptJoinRequest = async (req, res) => {
    try {
        const request = await JoinRequest.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                message: "Join request not found",
            });
        }

        if (request.status !== "Pending") {
            return res.status(400).json({
                message: "Request has already been processed",
            });
        }

        const team = await Team.findById(request.team);

        if (!team) {
            return res.status(404).json({
                message: "Team not found",
            });
        }

        
        if (team.leader.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Only the team leader can accept requests",
            });
        }

        const hackathon = await Hackathon.findById(team.hackathon);

        if (!hackathon) {
            return res.status(404).json({
                message: "Hackathon not found",
            });
        }

       
        if (team.members.length >= hackathon.maxTeamSize) {
            return res.status(400).json({
                message: "Team is already full",
            });
        }

        
        const existingTeam = await Team.findOne({
            hackathon: hackathon._id,
            members: request.user,
        });

        if (existingTeam) {
            return res.status(400).json({
                message: "User is already in another team for this hackathon",
            });
        }

      
        team.members.push(request.user);
        await team.save();

       
        request.status = "Accepted";
        await request.save();

       
        const hackathonTeams = await Team.find({
            hackathon: hackathon._id,
        });

        const teamIds = hackathonTeams.map(team => team._id);

       
        await JoinRequest.updateMany(
            {
                user: request.user,
                team: { $in: teamIds },
                status: "Pending",
                _id: { $ne: request._id },
            },
            {
                status: "Rejected",
            }
        );

        return res.status(200).json({
            message: "Join request accepted",
            team,
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};


export const rejectJoinRequest = async (req, res) => {
    try {
        const request = await JoinRequest.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                message: "Join request not found",
            });
        }

        if (request.status !== "Pending") {
            return res.status(400).json({
                message: "Request has already been processed",
            });
        }

        const team = await Team.findById(request.team);

        if (!team) {
            return res.status(404).json({
                message: "Team not found",
            });
        }

        
        if (team.leader.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Only the team leader can reject requests",
            });
        }

        request.status = "Rejected";
        await request.save();

        return res.status(200).json({
            message: "Join request rejected",
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};