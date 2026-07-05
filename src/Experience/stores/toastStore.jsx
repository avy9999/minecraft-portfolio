import { create } from "zustand";

export const useToastStore = create((set) => ({
  showAchievementToast: false,
  triggerAchievementToast: () => set({ showAchievementToast: true }),
  hideAchievementToast: () => set({ showAchievementToast: false }),
}));