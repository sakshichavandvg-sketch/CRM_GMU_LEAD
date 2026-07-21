import axiosInstance from "@/lib/axios";
import API_ENDPOINTS from "@/utils/apiEndpoints";

const reportsService = {
  getTelecallers: async () => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.REPORTS.USERS);
    // Based on PDF, this returns a plain array of user objects: [{ empId, name, activeLeads }]
    // It's wrapped in the standard envelope if the backend is consistent, so `data.data`.
    return data.data; 
  },
};

export default reportsService;
