import axios from "axios";

const API_URL = "http://localhost:5268/api/Task";

export const getAllTasks = (status = null) => {
  // Chuyển đổi status string thành boolean cho API
  let queryParam = "";
  if (status === "Đang làm") {
    queryParam = "?isCompleted=false";
  } else if (status === "Hoàn thành") {
    queryParam = "?isCompleted=true";
  }
  // Nếu status là "Tất cả" hoặc null, không thêm query param
  
  return axios.get(`${API_URL}${queryParam}`);
};

export const getTaskById = (id) => axios.get(`${API_URL}/${id}`);

export const createTask = (data) => axios.post(API_URL, data);

export const updateTask = (id, data) => axios.put(`${API_URL}/${id}`, data);

export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);

