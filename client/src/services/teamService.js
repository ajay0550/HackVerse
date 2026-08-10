import api from "./api";

export const createTeam = async (payload) => {
  const { data } = await api.post("/api/teams", payload);
  return data;
};

export const getTeams = async () => {
  const { data } = await api.get("/api/teams");
  return data;
};

export const getMyTeams = async () => {
  const { data } = await api.get("/api/teams/my");
  return data;
};

export const getHackathonTeams = async (hackathonId) => {
  const { data } = await api.get(`/api/teams/hackathon/${hackathonId}`);
  return data;
};

export const getTeamById = async (id) => {
  const { data } = await api.get(`/api/teams/${id}`);
  return data;
};

export const leaveTeam = async (id) => {
  const { data } = await api.post(`/api/teams/${id}/leave`);
  return data;
};

export const deleteTeam = async (id) => {
  const { data } = await api.delete(`/api/teams/${id}`);
  return data;
};

export const sendJoinRequest = async (teamId) => {
  const { data } = await api.post(`/api/teams/${teamId}/request`);
  return data;
};

export const getJoinRequests = async (teamId) => {
  const { data } = await api.get(`/api/teams/${teamId}/requests`);
  return data;
};

export const acceptJoinRequest = async (teamId, requestId) => {
  const { data } = await api.post(
    `/api/teams/${teamId}/requests/${requestId}/accept`
  );
  return data;
};

export const rejectJoinRequest = async (teamId, requestId) => {
  const { data } = await api.post(
    `/api/teams/${teamId}/requests/${requestId}/reject`
  );
  return data;
};