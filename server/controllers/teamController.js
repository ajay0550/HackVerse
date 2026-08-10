import Team from "../models/Team.js";
import Hackathon from "../models/Hackathon.js";


 
export const createTeam = async (req, res) => {
  try {
    const { name, hackathon } = req.body;

    const existingHackathon = await Hackathon.findById(hackathon);

    if (!existingHackathon) {
      return res.status(404).json({
        message: "Hackathon not found",
      });
    }

    const existingTeam = await Team.findOne({
      hackathon,
      members: req.user.id,
    });

    if (existingTeam) {
      return res.status(400).json({
        message: "You are already in a team for this hackathon",
      });
    }

    const team = await Team.create({
      name,
      hackathon,
      leader: req.user.id,
      members: [req.user.id],
    });

    return res.status(201).json({
      message: "Team created successfully",
      team,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

 

export const joinTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({
        message: "Team not found",
      });
    }

    const hackathon = await Hackathon.findById(team.hackathon);

    if (!hackathon) {
      return res.status(404).json({
        message: "Hackathon not found",
      });
    }

    const existingTeam = await Team.findOne({
      hackathon: hackathon._id,
      members: req.user.id,
    });

    if (existingTeam) {
      return res.status(400).json({
        message: "You are already in a team for this hackathon",
      });
    }

    if (team.members.length >= hackathon.maxTeamSize) {
      return res.status(400).json({
        message: "Team is full",
      });
    }

    team.members.push(req.user.id);

    await team.save();

    return res.status(200).json({
      message: "Joined team successfully",
      team,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

 

export const sendJoinRequest = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({
        message: "Team not found",
      });
    }

 
    if (team.leader.toString() === req.user.id) {
      return res.status(400).json({
        message: "You are already the leader of this team",
      });
    }

     
    const existingTeam = await Team.findOne({
      hackathon: team.hackathon,
      members: req.user.id,
    });

    if (existingTeam) {
      return res.status(400).json({
        message: "You are already in a team for this hackathon",
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
        message: "Team is full",
      });
    }

     
    const existingRequest = team.joinRequests.find(
      (request) =>
        request.user.toString() === req.user.id &&
        request.status === "pending"
    );

    if (existingRequest) {
      return res.status(400).json({
        message: "Join request already sent",
      });
    }

    team.joinRequests.push({
      user: req.user.id,
      status: "pending",
    });

    await team.save();

    return res.status(201).json({
      message: "Join request sent successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

 

export const getJoinRequests = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate("joinRequests.user", "name email");

    if (!team) {
      return res.status(404).json({
        message: "Team not found",
      });
    }
 
    if (team.leader.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Only the team leader can view join requests",
      });
    }

    const pendingRequests = team.joinRequests.filter(
      (request) => request.status === "pending"
    );

    return res.status(200).json({
      requests: pendingRequests,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

 

export const acceptJoinRequest = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

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
        message: "Team is full",
      });
    }

    const request = team.joinRequests.id(req.params.requestId);

    if (!request) {
      return res.status(404).json({
        message: "Join request not found",
      });
    }

    if (request.status !== "pending") {
      return res.status(400).json({
        message: "This request has already been processed",
      });
    }
 
    const existingTeam = await Team.findOne({
      hackathon: team.hackathon,
      members: request.user,
    });

    if (existingTeam) {
      request.status = "rejected";

      await team.save();

      return res.status(400).json({
        message: "This user is already in a team for this hackathon",
      });
    }

    
    team.members.push(request.user);

    request.status = "accepted";

    await team.save();

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
    const team = await Team.findById(req.params.id);

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

    const request = team.joinRequests.id(req.params.requestId);

    if (!request) {
      return res.status(404).json({
        message: "Join request not found",
      });
    }

    if (request.status !== "pending") {
      return res.status(400).json({
        message: "This request has already been processed",
      });
    }

    request.status = "rejected";

    await team.save();

    return res.status(200).json({
      message: "Join request rejected",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};


 

export const leaveTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({
        message: "Team not found",
      });
    }

    if (!team.members.includes(req.user.id)) {
      return res.status(400).json({
        message: "You are not a member of this team",
      });
    }

    if (team.leader.toString() === req.user.id) {
      return res.status(400).json({
        message:
          "Leader cannot leave the team. Delete the team or transfer leadership.",
      });
    }

    team.members.pull(req.user.id);

    await team.save();

    return res.status(200).json({
      message: "Left team successfully",
      team,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

 

export const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({
        message: "Team not found",
      });
    }

    if (team.leader.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Only the leader can delete the team",
      });
    }

    await team.deleteOne();

    return res.status(200).json({
      message: "Team deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

 

export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find()
      .populate("leader", "name email")
      .populate("members", "name email")
      .populate("hackathon", "title");

    return res.status(200).json(teams);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

 

export const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate("leader", "name email")
      .populate("members", "name email")
      .populate("hackathon", "title");

    if (!team) {
      return res.status(404).json({
        message: "Team not found",
      });
    }

    return res.status(200).json(team);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

 

export const getMyTeams = async (req, res) => {
  try {
    const teams = await Team.find({
      members: req.user.id,
    })
      .populate("leader", "name email")
      .populate("members", "name email")
      .populate("hackathon", "title");

    return res.status(200).json({
      teams,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};


 

export const getHackathonTeams = async (req, res) => {
  try {
    const teams = await Team.find({
      hackathon: req.params.id,
    })
      .populate("leader", "name email")
      .populate("members", "name email");

    return res.status(200).json(teams);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};