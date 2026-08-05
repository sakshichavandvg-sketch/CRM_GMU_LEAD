import axiosInstance from "@/lib/axios";
import API_ENDPOINTS from "@/utils/apiEndpoints";

export const telecallerLeadService = {
  getMyLeads: async (params) => {
    const { page = 0, size = 10, search = "", ...filters } = params;
    
    const queryParams = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });

    if (search) queryParams.append("search", search);
    
    // Add remaining filters dynamically
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });

    const response = await axiosInstance.get(
      `${API_ENDPOINTS.TELECALLER.LEADS}?${queryParams.toString()}`
    );

    return response.data.data;
  },

  getLeadDetails: async (enquiryNo) => {
    const response = await axiosInstance.get(API_ENDPOINTS.TELECALLER.LEAD_DETAILS(enquiryNo));
    return response.data.data;
  },

  updateLead: async (enquiryNo, data) => {
    const response = await axiosInstance.patch(API_ENDPOINTS.TELECALLER.LEAD_DETAILS(enquiryNo), data);
    return response.data.data;
  },

  getLeadTimeline: async (enquiryNo) => {
    const response = await axiosInstance.get(API_ENDPOINTS.TELECALLER.LEAD_TIMELINE(enquiryNo));
    return response.data.data;
  },

  getLeadNotes: async (enquiryNo) => {
    const response = await axiosInstance.get(API_ENDPOINTS.TELECALLER.LEAD_NOTES(enquiryNo));
    return response.data.data;
  },

  updateLeadNote: async (enquiryNo, noteId, content) => {
    const response = await axiosInstance.patch(`${API_ENDPOINTS.TELECALLER.LEAD_NOTES(enquiryNo)}/${noteId}`, { content });
    return response.data.data;
  },

  getFilterOptions: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.TELECALLER.LEAD_FILTER_OPTIONS);
    return response.data.data;
  }
};
