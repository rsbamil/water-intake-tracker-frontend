import api from "./api";


const getMyProfile = async () => {
  const response = await api.get("/users/me");

  return response.data;
};

const updateMyGoal = async (dailyGoal) => {
  const response = await api.put("/users/me/goal", {
    dailyGoal,
  });

  return response.data;
};

const deleteMyAccount = async () => {
  const response = await api.delete("/users/me");

  return response.data;
};

/*
 * Admin APIs
 */

const getAllUsers = async () => {
  const response = await api.get("/users");

  return response.data;
};

const getUserIntakeHistory = async (userId) => {
  const response = await api.get(`/users/${userId}/intake`);

  return response.data;
};

const updateUserGoal = async (userId, dailyGoal) => {
  const response = await api.put(`/users/${userId}/goal`, {
    dailyGoal,
  });

  return response.data;
};

const deleteUser = async (userId) => {
  const response = await api.delete(`/users/${userId}`);

  return response.data;
};

const userService = {
  getMyProfile,
  updateMyGoal,
  deleteMyAccount,
  getAllUsers,
  getUserIntakeHistory,
  updateUserGoal,
  deleteUser,
};

export default userService;