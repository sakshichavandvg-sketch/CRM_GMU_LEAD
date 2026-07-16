import { create } from "zustand";

const useAuthStore = create((set) => ({
  // Authentication state
  isAuthenticated: false,
  loading: true,

  // Logged in user
  user: null,

  // Login
  login: (user) =>
    set({
      user,
      isAuthenticated: true,
      loading: false,
    }),

  // Update user after /me
  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      loading: false,
    }),

  // Loading state
  setLoading: (loading) =>
    set({
      loading,
    }),

  // Logout
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      loading: false,
    }),
}));

export default useAuthStore;