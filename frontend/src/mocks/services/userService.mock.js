import { users as initialUsers } from "../database/users";

let usersDB = [...initialUsers];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const randomDelay = () => delay(Math.floor(Math.random() * 400) + 200);

export const getUsers = async (params = {}) => {
  await randomDelay();

  // Optional random error simulation
  // if (Math.random() < 0.05) throw new Error("Unable to fetch telecallers.");

  const {
    page = 0,
    size = 10,
    search = "",
    status = "",
    programme = "",
    course = "",
  } = params;

  let filteredUsers = usersDB;

  if (search) {
    const s = search.toLowerCase();
    filteredUsers = filteredUsers.filter(
      (u) =>
        u.name?.toLowerCase().includes(s) ||
        u.empId?.toLowerCase().includes(s) ||
        u.phoneNo?.includes(s) ||
        u.username?.toLowerCase().includes(s)
    );
  }

  if (status) {
    filteredUsers = filteredUsers.filter((u) => u.status === status);
  }

  if (programme) {
    filteredUsers = filteredUsers.filter((u) => u.programme === programme);
  }

  if (course) {
    filteredUsers = filteredUsers.filter((u) => u.course === course);
  }

  const totalItems = filteredUsers.length;
  const pageSize = parseInt(size, 10);
  const totalPages = Math.ceil(totalItems / pageSize);
  const currentPage = parseInt(page, 10);

  const startIndex = currentPage * pageSize;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + pageSize);

  return {
    success: true,
    message: "Users fetched successfully",
    data: {
      users: paginatedUsers,
      currentPage,
      totalPages,
      totalItems,
      pageSize,
    },
    errors: null,
  };
};

export const createUser = async (payload) => {
  await randomDelay();

  const newSlNo = usersDB.length ? Math.max(...usersDB.map((u) => u.slNo)) + 1 : 1;
  const newEmpId = `EMP${String(newSlNo).padStart(3, "0")}`;

  const newUser = {
    slNo: newSlNo,
    empId: newEmpId,
    status: "ACTIVE",
    defaultPassword: "GMU@123",
    ...payload,
  };

  usersDB = [newUser, ...usersDB];

  return {
    success: true,
    message: "User created successfully",
    data: newUser,
    errors: null,
  };
};

export const updateUser = async (payload) => {
  await randomDelay();

  const index = usersDB.findIndex((u) => u.slNo === payload.slNo || u.empId === payload.empId);
  if (index === -1) {
    throw new Error("User not found");
  }

  const updatedUser = { ...usersDB[index], ...payload };
  usersDB[index] = updatedUser;

  return {
    success: true,
    message: "User updated successfully",
    data: updatedUser,
    errors: null,
  };
};

export const toggleUserStatus = async (slNo) => {
  await randomDelay();

  const index = usersDB.findIndex((u) => u.slNo === slNo);
  if (index === -1) {
    throw new Error("User not found");
  }

  const user = { ...usersDB[index] };
  user.status = user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
  usersDB[index] = user;

  return {
    success: true,
    message: "User status toggled successfully",
    data: user,
    errors: null,
  };
};

export default {
  getUsers,
  createUser,
  updateUser,
  toggleUserStatus,
};
