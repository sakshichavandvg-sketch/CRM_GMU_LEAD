import { useMutation, useQueryClient } from "@tanstack/react-query";
import { telecallerFollowupService } from "../services/telecallerFollowupService";
import { toast } from "sonner";

/**
 * Helper: patch a single followup inside the React Query cache so the
 * workspace recalculates buckets immediately without waiting for a
 * potentially-stale GET refetch.
 */
const patchCachedFollowup = (queryClient, updatedItem) => {
  if (!updatedItem?.id) return;

  queryClient.setQueriesData({ queryKey: ["followups"] }, (old) => {
    if (!Array.isArray(old)) return old;
    return old.map((item) =>
      item.id === updatedItem.id ? { ...item, ...updatedItem } : item
    );
  });
};

export const useCreateFollowup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      console.log("[useCreateFollowup] mutationFn called", data);
      return await telecallerFollowupService.createFollowup(data);
    },
    onSuccess: (newItem) => {
      // Append the new item to every cached followups query
      queryClient.setQueriesData({ queryKey: ["followups"] }, (old) => {
        if (!Array.isArray(old)) return old;
        return [...old, newItem];
      });
      queryClient.invalidateQueries({ queryKey: ["followups"] });
      queryClient.invalidateQueries({ queryKey: ["telecallerDashboard"] });
      queryClient.invalidateQueries({ queryKey: ["telecaller", "lead"] });
      toast.success("Followup scheduled successfully");
    },
  });
};

export const useUpdateFollowup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      console.log("[useUpdateFollowup] mutationFn called");
      console.log("[useUpdateFollowup] ID:", id);
      console.log("[useUpdateFollowup] Data received:", JSON.stringify(data, null, 2));
      return await telecallerFollowupService.updateFollowup(id, data);
    },
    onSuccess: (updatedItem) => {
      console.log("[RESCHEDULE AUDIT] PATCH response (mapped):", JSON.stringify(updatedItem, null, 2));

      // Immediately patch the cache so the workspace recalculates buckets
      patchCachedFollowup(queryClient, updatedItem);

      // Trigger background refetch, then compare the GET result for this ID
      queryClient.invalidateQueries({ queryKey: ["followups"] }).then(() => {
        // After refetch completes, read the fresh cache
        const allCaches = queryClient.getQueriesData({ queryKey: ["followups"] });
        allCaches.forEach(([key, data]) => {
          if (!Array.isArray(data)) return;
          const match = data.find(item => item.id === updatedItem.id);
          if (match) {
            console.log("[RESCHEDULE AUDIT] GET response for same ID (from cache after refetch):", JSON.stringify(match, null, 2));
            console.log("[RESCHEDULE AUDIT] COMPARISON:", {
              patchDate: updatedItem.scheduledDate,
              getDate: match.scheduledDate,
              patchTime: updatedItem.scheduledTime,
              getTime: match.scheduledTime,
              patchStatus: updatedItem.status,
              getStatus: match.status,
              patchPriority: updatedItem.priority,
              getPriority: match.priority,
              datesMatch: updatedItem.scheduledDate === match.scheduledDate,
            });
          } else {
            console.log("[RESCHEDULE AUDIT] GET response: follow-up ID", updatedItem.id, "NOT FOUND in refetched data. Total records:", data.length);
          }
        });
      });

      queryClient.invalidateQueries({ queryKey: ["telecallerDashboard"] });
      toast.success("Followup updated successfully");
    },
  });
};

export const useDeleteFollowup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      return await telecallerFollowupService.deleteFollowup(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followups"] });
      queryClient.invalidateQueries({ queryKey: ["telecallerDashboard"] });
      toast.success("Followup removed");
    },
  });
};

export const useCompleteFollowup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      return await telecallerFollowupService.updateFollowup(id, { status: "Completed" });
    },
    onSuccess: (updatedItem) => {
      // Immediately patch the cache so the card disappears from active views
      patchCachedFollowup(queryClient, updatedItem);
      queryClient.invalidateQueries({ queryKey: ["followups"] });
      queryClient.invalidateQueries({ queryKey: ["telecallerDashboard"] });
      toast.success("Follow-up marked as completed");
    },
  });
};
