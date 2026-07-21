import axiosInstance from "@/lib/axios";
import API_ENDPOINTS from "@/utils/apiEndpoints";

const leadService = {
  createLead: async (payload) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.LEADS.CREATE, payload);
    return data;
  },

  updateLead: async (payload) => {
    const { data } = await axiosInstance.put(API_ENDPOINTS.LEADS.UPDATE, payload);
    return data;
  },

  deleteLead: async (enquiryNo) => {
    const { data } = await axiosInstance.delete(API_ENDPOINTS.LEADS.DELETE(enquiryNo));
    return data;
  },

  getLeadDetails: async (enquiryNo) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.LEADS.DETAIL(enquiryNo));
    return data;
  },

  assignLeads: async (payload) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.LEADS.ASSIGN, payload);
    return data;
  },

  transferLead: async (payload) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.LEADS.TRANSFER, payload);
    return data;
  },

  importLeads: async (payload, onUploadProgress) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.LEADS.IMPORT, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
    return data;
  },

  exportLeads: async (params) => {
    const response = await axiosInstance.get(API_ENDPOINTS.LEADS.EXPORT, {
      params,
      responseType: "blob",
    });
    return response;
  },

  getOverviewLeads: async (params) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.LEADS.LIST, { params });
    return data.data;
  },

  getFilterOptions: async () => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.LEADS.FILTER_OPTIONS);
    return data.data;
  },
};

export default leadService;
