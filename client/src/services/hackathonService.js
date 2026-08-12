import api from "./api";

export const getHackathons = async () => {
  const { data } = await api.get("/api/hackathons");
  return data;
};

export const getHackathonById = async (id) => {
  const { data } = await api.get(`/api/hackathons/${id}`);
  return data;
};

export const getMyHackathons = async () => {
  const { data } = await api.get("/api/hackathons/my");
  return data;
};