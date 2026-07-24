import axiosInstance from "@/lib/axios";
import { mapDashboard, mapAssignedLeads } from "@/features/users/utils/telecallerViewModelMapper";

const telecallerService = {
  getTelecallerDashboard: async (empId) => {
    // According to backend integration requirements: GET /api/leads/manager/users/{empId}/dashboard
    const response = await axiosInstance.get(`/api/leads/manager/users/${empId}/dashboard`);
    return mapDashboard(response.data.data);
  },

  getTelecallerLeads: async (empId, params) => {
    // According to backend integration requirements: GET /api/leads/manager/users/{empId}/leads
    const response = await axiosInstance.get(`/api/leads/manager/users/${empId}/leads`, { params });
    
    // Support pagination/search and normalize BOTH into the same model
    return {
      data: mapAssignedLeads(response.data.data.content || response.data.data),
      meta: {
        totalPages: response.data.data.totalPages || 0,
        totalElements: response.data.data.totalElements || 0,
      }
    };
  },

  updateTelecaller: async (empId, data) => {
    // PUT /api/leads/manager/users/{empId}/profile
    const response = await axiosInstance.put(`/api/leads/manager/users/${empId}/profile`, data);
    return response.data.data;
  },

  updateTelecallerStatus: async (slNo, status) => {
    // PATCH /api/leads/manager/users/{slNo}/active-status
    const response = await axiosInstance.patch(`/api/leads/manager/users/${slNo}/active-status`, { status });
    return response.data.data;
  },

  uploadTelecallerAvatar: async (empId, file) => {
    // POST /api/leads/manager/users/{empId}/avatar
    const formData = new FormData();
    formData.append("file", file);
    
    // Let Axios handle the Content-Type boundary for multipart/form-data
    const response = await axiosInstance.post(`/api/leads/manager/users/${empId}/avatar`, formData);
    return response.data.data;
  }
};

export default telecallerService;
