import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { profileService } from "../services/profileService";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      return await profileService.getProfile();
    },
    staleTime: 10 * 60 * 1000, // 10 minutes cache
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      return await profileService.updateProfile(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (data) => {
      return await profileService.changePassword(data);
    },
  });
};

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => {
      return await profileService.uploadAvatar(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      queryClient.invalidateQueries({ queryKey: ["telecallerDashboard"] });
    },
  });
};
