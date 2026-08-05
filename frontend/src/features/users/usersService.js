import axiosInstance from "@/lib/axios";
import API_ENDPOINTS from "@/utils/apiEndpoints";

const normalizeAvatarPath = (avatarPath) => {
  if (!avatarPath) return "";
  if (typeof avatarPath !== "string") return String(avatarPath);
  if (avatarPath.startsWith("/uploads/avatars/")) {
    return avatarPath.replace("/uploads/avatars/", "/files/");
  }
  return avatarPath;
};

// Normalize a single user from the backend response to the shape
// the UI components expect. Field name changes only need updating here.
const normalizeUser = (raw) => ({
  id: raw.slNo ?? raw.id ?? raw.userId ?? raw.empId ?? "",
  slNo: raw.slNo ?? raw.id,
  empId: raw.empId ?? raw.employeeId ?? "",
  username: raw.username ?? "",
  name: raw.name ?? raw.fullName ?? "",
  email: raw.email ?? "",
  phone: raw.phoneNo ?? raw.phone ?? raw.mobile ?? "",
  phoneNo: raw.phoneNo ?? raw.phone ?? raw.mobile ?? "",
  avatar: normalizeAvatarPath(raw.photo ?? raw.avatar ?? raw.avatarUrl ?? ""),
  role: raw.role ?? "TELECALLER",
  college: raw.college ?? "",
  programme: raw.programme ?? "",
  course: raw.course ?? "",
  discipline: raw.discipline ?? "",
  status: raw.status ?? "ACTIVE",
  activeLeads: raw.activeLeads ?? raw.activeLeadCount ?? raw.assignedLeadsCount ?? raw.activeAssignedLeads ?? 0,
  defaultPassword: raw.defaultPassword ?? null,
});

// Normalize the paginated list response.
// Supports both Spring Page wrapper and flat arrays.
const normalizeListResponse = (responseData) => {
  const raw = responseData?.data ?? responseData;

  const users = Array.isArray(raw?.content)
    ? raw.content
    : Array.isArray(raw?.users)
    ? raw.users
    : Array.isArray(raw)
    ? raw
    : [];

  // Support Spring Page object ({ number, totalPages }) or flat counts
  const currentPage = raw?.page?.number ?? raw?.currentPage ?? 0;
  const totalPages = raw?.page?.totalPages ?? raw?.totalPages ?? 1;
  const totalItems =
    raw?.page?.totalElements ?? raw?.totalItems ?? users.length;

  return {
    users: users.map(normalizeUser),
    currentPage,
    totalPages,
    totalItems,
  };
};

const getUsers = async (params) => {
  const response = await axiosInstance.get(API_ENDPOINTS.USERS.LIST, {
    params,
  });
  return normalizeListResponse(response.data);
};

const createUser = async (payload) => {
  const response = await axiosInstance.post(
    API_ENDPOINTS.USERS.CREATE,
    payload
  );
  const raw = response.data?.data ?? response.data;
  return normalizeUser(raw);
};

const updateUser = async (payload) => {
  const { slNo, empId, ...rest } = payload;
  const response = await axiosInstance.put(
    `${API_ENDPOINTS.USERS.UPDATE}/${slNo ?? empId}`,
    rest
  );
  const raw = response.data?.data ?? response.data;
  return normalizeUser(raw);
};

const toggleUserStatus = async (slNo) => {
  const response = await axiosInstance.patch(
    API_ENDPOINTS.USERS.TOGGLE_STATUS(slNo)
  );
  const raw = response.data?.data ?? response.data;
  return normalizeUser(raw);
};

export default {
  getUsers,
  createUser,
  updateUser,
  toggleUserStatus,
};
