import { create } from "zustand";

const useAuthStore = create((set) => ({
  // Authentication State
  user: null,
  role: null,
  userId: null,
  isAuthenticated: false,

  // Set authenticated user
  setUser: (user) =>
    set({
      user,
      role: user.role,
      userId: user.userId,
      isAuthenticated: true,
    }),

  // Clear authentication
  logout: () =>
    set({
      user: null,
      role: null,
      userId: null,
      isAuthenticated: false,
    }),
}));

export default useAuthStore;