import axiosInstance from "@/lib/axios";
import API_ENDPOINTS from "@/utils/apiEndpoints";

const getUsers = async (params) => {
  const { data } = await axiosInstance.get(
    API_ENDPOINTS.USERS.LIST,
    {
      params,
    }
  );

  return data.data;
};

const createUser = async (payload) => {
  const { data } = await axiosInstance.post(
    API_ENDPOINTS.USERS.CREATE,
    payload
  );

  return data.data;
};

const updateUser = async (payload) => {
  const { data } = await axiosInstance.put(
    API_ENDPOINTS.USERS.UPDATE,
    payload
  );

  return data.data;
};

const toggleUserStatus = async (slNo) => {
  const { data } = await axiosInstance.patch(
    API_ENDPOINTS.USERS.TOGGLE_STATUS(slNo)
  );

  return data.data;
};

export default {
  getUsers,
  createUser,
  updateUser,
  toggleUserStatus,
};