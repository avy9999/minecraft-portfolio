import { useState, useEffect, useRef } from "react";

import "./LoadingScreen.scss";

import { useProgress } from "@react-three/drei";

import Button from "../Button/Button";

import { playSound, playBackgroundMusic } from "../../utils/audioSystem";
import { useAudioStore } from "../../Experience/stores/audioStore";
import { useToastStore } from "../../Experience/stores/toastStore";

const LoadingScreen = () => {
  const { progress } = useProgress();
  const [isRevealed, setIsRevealed] = useState(false);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);
  const { setIsAudioEnabled } = useAudioStore();
  const { triggerAchievementToast } = useToastStore();
  const [localProgress, setLocalProgress] = useState(0);
  const [gifFinished, setGifFinished] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const toastTimerRef = useRef(null);

  useEffect(() => {
    const duration = 2500; // 2.5s
    const start = performance.now();

    const animate = (time) => {
        const elapsed = time - start;
        const percent = Math.min((elapsed / duration) * 100, 100);

        setLocalProgress(percent);

        if (percent < 100) {
        requestAnimationFrame(animate);
        } else {
        setGifFinished(true);
        }
    };

    requestAnimationFrame(animate);
    }, []);

  const handleReveal = () => {
    setIsExiting(true);
    setIsAudioEnabled(true);

    playBackgroundMusic();
    playSound("buttonClick");

    toastTimerRef.current = setTimeout(() => {
      triggerAchievementToast();
    }, 1600);

    setTimeout(() => {
      setIsRevealed(true);
    }, 50);
  };

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const handleAnimationFinished = () => {
    setIsAnimationFinished(true);
  };

  if (isAnimationFinished) {
    return null;
  }

  return (
    <>
      <div className="loading-screen">
        <div
          className={`background-top-half ${isRevealed ? "revealed" : ""}`}
          onTransitionEnd={handleAnimationFinished}
        ></div>
        <div
          className={`background-bottom-half ${isRevealed ? "revealed" : ""}`}
        ></div>
        <div className="loading-screen-info-container">
            {!isExiting && (
                <>
                    <div className="loading-percentage">
                    {Math.round(localProgress)}%
                    </div>

                    <div className="loading-gif-container">
                    <img src="/images/loading.gif" className="loading-gif" />
                    </div>

                    <div className={`instructions-container ${isRevealed ? "revealed" : ""}`}>
                      🖱️ Drag/Scroll Up/Down to Navigate~ 👈
                    </div>

                    <div className={`instructions-container ${isRevealed ? "revealed" : ""}`}>
                      🖥️ Use a Computer for better experience~
                    </div>
                </>
                )}
          {gifFinished && progress >= 100 && !isRevealed ? (
            <Button onClick={handleReveal}>
                &nbsp; &nbsp; Enter World &nbsp; &nbsp;
            </Button>
            ) : null}
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;