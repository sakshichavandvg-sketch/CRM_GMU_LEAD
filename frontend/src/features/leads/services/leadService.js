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

  getLeadDetails: async (leadId) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.LEADS.DETAIL(leadId));
    console.log("📡 [SERVICE] getLeadDetails raw envelope:", data);
    return data.data; // Return the nested data object
  },

  getLeadTimeline: async (leadId) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.LEADS.TIMELINE(leadId));
    return data.data;
  },

  getLeadNotes: async (leadId) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.LEADS.NOTES(leadId));
    return data.data;
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

  getGeoStates: async () => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.LEADS.GEO.STATES);
    const list = data?.data || data || [];
    return Array.isArray(list) ? list.map(item => ({
      label: item?.name || item?.label || item,
      value: item?.id || item?.value || item?.name || item
    })) : [];
  },

  getGeoDistricts: async (state) => {
    if (!state) return [];
    const { data } = await axiosInstance.get(API_ENDPOINTS.LEADS.GEO.DISTRICTS(state));
    const list = data?.data || data || [];
    return Array.isArray(list) ? list.map(item => ({
      label: item?.name || item?.label || item,
      value: item?.id || item?.value || item?.name || item
    })) : [];
  },

  getGeoTaluks: async (district) => {
    if (!district) return [];
    const { data } = await axiosInstance.get(API_ENDPOINTS.LEADS.GEO.TALUKS(district));
    const list = data?.data || data || [];
    return Array.isArray(list) ? list.map(item => ({
      label: item?.name || item?.label || item,
      value: item?.id || item?.value || item?.name || item
    })) : [];
  },
};

export default leadService;
