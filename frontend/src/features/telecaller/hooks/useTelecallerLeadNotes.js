import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { telecallerLeadService } from "../services/telecallerLeadService";
import { toast } from "sonner";

export const useTelecallerLeadNotes = (enquiryNo) => {
  return useQuery({
    queryKey: ["telecaller", "leads", enquiryNo, "notes"],
    queryFn: async () => {
      return await telecallerLeadService.getLeadNotes(enquiryNo);
    },
    enabled: !!enquiryNo,
    staleTime: 5 * 60 * 1000,
  });
};

export const useUpdateTelecallerLeadNote = (enquiryNo) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ noteId, content }) => {
      return await telecallerLeadService.updateLeadNote(enquiryNo, noteId, content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["telecaller", "leads", enquiryNo, "notes"] });
      queryClient.invalidateQueries({ queryKey: ["telecaller", "lead", enquiryNo] });
      toast.success("Note updated successfully");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to update note");
    },
  });
};
