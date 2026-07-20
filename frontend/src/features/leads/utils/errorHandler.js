import { toast } from "sonner";

export const handleLeadError = (error, fallbackMessage = "An unexpected error occurred.") => {
  if (!error.response) {
    if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
      toast.error("The request timed out. Please try again.");
    } else {
      toast.error("Unable to connect to the server. Please check your internet connection.");
    }
    return;
  }

  const status = error.response.status;

  if (status === 400) {
    toast.error(error.response?.data?.message || "Invalid request data. Please check your inputs.");
  } else if (status === 401) {
    toast.error("Session expired. Please log in again.");
    // Note: Global axios interceptor usually handles the actual redirect
  } else if (status === 403) {
    toast.error("Access denied. You do not have permission to perform this action.");
  } else if (status === 404) {
    toast.error("The requested resource was not found.");
  } else if (status === 409) {
    toast.error(error.response?.data?.message || "Conflict detected (e.g. Lead already exists).");
  } else if (status === 422) {
    toast.error(error.response?.data?.message || "Validation failed for one or more fields.");
  } else if (status >= 500) {
    toast.error("An internal server error occurred. Please try again later.");
  } else {
    toast.error(error.response?.data?.message || fallbackMessage);
  }
};
