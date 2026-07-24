import axiosInstance from "@/lib/axios";
import API_ENDPOINTS from "@/utils/apiEndpoints";

// Normalize a single user from the backend response to the shape
// the UI components expect. Field name changes only need updating here.
const normalizeUser = (raw) => ({
  slNo: raw.slNo ?? raw.id,
  empId: raw.empId ?? raw.employeeId ?? "",
  username: raw.username ?? "",
  name: raw.name ?? raw.fullName ?? "",
  phoneNo: raw.phoneNo ?? raw.phone ?? raw.mobile ?? "",
  college: raw.college ?? "",
  programme: raw.programme ?? "",
  course: raw.course ?? "",
  discipline: raw.discipline ?? "",
  status: raw.status ?? "ACTIVE",
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
