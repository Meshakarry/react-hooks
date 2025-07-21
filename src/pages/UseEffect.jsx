import { useCallback, useEffect, useRef, useState } from "react";
import { RNG } from "../randomNumberGenerator";

const videos = [
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
];

export const UseEffectShowcase = ({ slug }) => {
  const [count, setCount] = useState(0);
  const [videoVisible, setVideoVisible] = useState(true);
  const [src, setSrc] = useState(videos[0]);
  const videoRef = useRef(null);

  // Change body background to a random color
  const changeBodyColor = useCallback(() => {
    const color = `rgba(${RNG(255)}, ${RNG(255)}, ${RNG(255)}, 1)`;
    document.body.style.backgroundColor = color;
    console.log("Body color changed:", color);
  }, []);

  // Play video if it's visible
  const playVideo = useCallback(() => {
    const video = videoRef.current;
    if (videoVisible && video) {
      video.play().catch(() => {
        console.warn("Autoplay failed");
      });
    }
  }, [videoVisible]);

  // Button handlers
  const handleButtonClick = () => {
    setCount((prev) => prev + 1);
    changeBodyColor();
  };

  // Change body color on slug change if it matches
  useEffect(() => {
    if (slug === "test") {
      changeBodyColor();
    }
  }, [slug, changeBodyColor]);

  // Register global keypress listener
  useEffect(() => {
    window.addEventListener("keypress", changeBodyColor);
    console.log("Registered keypress event");

    return () => {
      window.removeEventListener("keypress", changeBodyColor);
      console.log("Cleaned up keypress event");
    };
  }, [changeBodyColor]);

  // Play video on source or visibility change

  useEffect(() => {
    const video = videoRef.current;
  
    if (!video || !videoVisible) return;
  
    const handleCanPlay = () => {
      video.play().catch(() => {
        console.warn("Autoplay failed on canplay");
      });
    };
  
    video.addEventListener("canplay", handleCanPlay);
  
    return () => {
      video.pause();
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [src, videoVisible]);
  

  // Change video source every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const nextSrc = videos[RNG(videos.length)];
      console.log("Switching video to:", nextSrc);
      setSrc(nextSrc);
    }, 3000);

    return () => clearInterval(interval);
  }, [playVideo]);

  return (
    <div className="container">
      <h3>Button 2 pressed {count} times</h3>

      <div>
        <label>
          <input
            type="checkbox"
            checked={videoVisible}
            onChange={() => setVideoVisible((v) => !v)}
          />
          Show video
        </label>
      </div>

      <button onClick={changeBodyColor}>Button 1</button>
      <button onClick={handleButtonClick}>Button 2</button>

      {videoVisible && (
        <video
          ref={videoRef}
          src={src}
          loop
          playsInline
          muted
          style={{ width: "100%", maxWidth: 600 }}
        />
      )}
    </div>
  );
};
