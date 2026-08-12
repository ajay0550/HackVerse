import api from "./api";

export const createSubmission = async (payload) => {
  const { data } = await api.post(
    "/api/submissions",
    payload
  );

  return data;
};

export const getAllSubmissions = async () => {
  const { data } = await api.get(
    "/api/submissions"
  );

  return data;
};

export const getSubmissionById = async (id) => {
  const { data } = await api.get(
    `/api/submissions/${id}`
  );

  return data;
};

export const getHackathonSubmissions = async (hackathonId) => {
  const { data } = await api.get(
    `/api/submissions/hackathon/${hackathonId}`
  );

  return data;
};

export const updateSubmission = async (id, payload) => {
  const { data } = await api.put(
    `/api/submissions/${id}`,
    payload
  );

  return data;
};

export const judgeSubmission = async (id, payload) => {
  const { data } = await api.put(
    `/api/submissions/${id}/judge`,
    payload
  );

  return data;
};

export const getHackathonLeaderboard = async (hackathonId) => {
  const { data } = await api.get(
    `/api/submissions/hackathon/${hackathonId}/leaderboard`
  );

  return data;
};