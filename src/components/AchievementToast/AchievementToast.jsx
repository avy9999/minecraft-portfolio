import { useEffect } from "react";
import { playSound } from "../../utils/audioSystem";
import { useToastStore } from "../../Experience/stores/toastStore";
import "./AchievementToast.scss";

const AchievementToast = () => {
  const { showAchievementToast, hideAchievementToast } = useToastStore();

  useEffect(() => {
    if (!showAchievementToast) return;

    const timer = setTimeout(() => {
      playSound("RareAchievement");
    }, 200); // 🔥 2 sec AFTER ENTER WORLD

    const hideTimer = setTimeout(() => {
      hideAchievementToast();
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [showAchievementToast, hideAchievementToast]);

  if (!showAchievementToast) return null;

  return (
    <div className="mc-toast">
      <div className="mc-toast-icon"></div>
      <div className="mc-toast-content">
        <div className="mc-toast-title">Achievement Made!</div>
        <div className="mc-toast-body">Visitor!</div>
      </div>
    </div>
  );
};

export default AchievementToast;