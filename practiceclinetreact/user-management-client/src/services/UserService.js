import axios from "axios";

const API_URL = "http://localhost:5239/api/UsersManagment";

export const getAllUsers = () => {
  return axios.get(`${API_URL}/GetAllUsers`);
};

export const updateUser = (users) => {
  return axios.post(`${API_URL}/updateUsers`, users);
};
