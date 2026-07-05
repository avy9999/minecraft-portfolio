import { useEffect, useState } from "react";
import { playSound } from "../../utils/audioSystem";

const AchievementToast = ({ trigger }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!trigger) return;

    const timer = setTimeout(() => {
      setShow(true);
      playSound("RareAchievement");
    }, 2000); // 🔥 2 sec AFTER ENTER WORLD

    const hideTimer = setTimeout(() => {
      setShow(false);
    }, 7000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [trigger]);

  if (!show) return null;

  return (
    <div className="mc-toast">
      <div className="mc-toast-icon">✨</div>
      <div className="mc-toast-content">
        <div className="mc-toast-title">Achievement Made!</div>
        <div className="mc-toast-body">Visitor!</div>
      </div>
    </div>
  );
};

export default AchievementToast;