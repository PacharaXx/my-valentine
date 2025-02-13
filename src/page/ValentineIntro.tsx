import { useState, useEffect } from "react";
import maImage from "../assets/ma.jpg";
import muImage from "../assets/mu.jpg";
import couple1Image from "../assets/couple/couple1.jpg";
import couple2Image from "../assets/couple/couple2.jpg";
import couple3Image from "../assets/couple/couple3.jpg";
import couple4Image from "../assets/couple/couple4.jpg";
import couple5Image from "../assets/couple/couple5.jpg";
import couple6Image from "../assets/couple/couple6.jpg";
import couple7Image from "../assets/couple/couple7.jpg";
import heartBallon from "../assets/1x/HeartBallon.png";
import loveSong from "../assets/love-song.mp3";

const coupleImages = [
  couple1Image,
  couple2Image,
  couple3Image,
  couple4Image,
  couple5Image,
  couple6Image,
  couple7Image,
];
// Previous components remain the same
const ValentineText = () => (
  <div className="text-white">
    <h1 className="text-5xl md:text-7xl hugh text-center">
      Happy Valentine&apos;s Day
    </h1>
    <p className="text-2xl hugh text-center">
      Roses are red, violets are blue, sugar is sweet, and so are you.
    </p>
    <div className="flex justify-center">
      <button
        className="bg-pink-500 px-6 py-2 rounded-full hover:bg-pink-600 mt-8"
        onClick={playSong}
      >
        Next
      </button>
    </div>
  </div>
);

function playSong() {
  const audio = new Audio(loveSong);
  audio.play();
}

const LoveMessage = () => (
  <div className="text-white">
    <h2 className="text-4xl PinkyCupid text-center">
      Roses bloom and fade away,
      <br />
      But my love&apos;s here every day.
      <br />
      You&apos;re the star that guides me through—
      <br />
      Valentine&apos;s is sweet with you.
    </h2>
    <div className="flex gap-4 justify-center">
      <button className="bg-pink-500 px-6 py-2 rounded-full hover:bg-pink-600 mt-4">
        Next
      </button>
    </div>
  </div>
);

const OurImage = () => (
  <div className="text-white">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center items-center">
      <div className="flex justify-center">
        <img
          src={muImage}
          alt="First person"
          className="w-auto h-80 rounded-2xl object-cover"
        />
      </div>
      <div className="flex justify-center">
        <HeartShape size="large" />
      </div>
      <div className="flex justify-center">
        <img
          src={maImage}
          alt="Second person"
          className="w-auto h-80 rounded-2xl object-cover"
        />
      </div>
    </div>
    <div className="flex gap-4 justify-center">
      <button className="bg-pink-500 px-6 py-2 rounded-full hover:bg-pink-600 mt-4">
        Next
      </button>
    </div>
  </div>
);

const CoupleImage = ({ imagePath }) => (
  <div className="text-white">
    <div className="flex justify-center items-center">
      <img
        src={imagePath}
        alt="Couple moment"
        className="w-auto h-screen max-h-96 rounded-2xl object-cover"
      />
    </div>
    <div className="flex gap-4 justify-center">
      <button className="bg-pink-500 px-6 py-2 rounded-full hover:bg-pink-600 mt-4">
        Next
      </button>
    </div>
  </div>
);

// Updated HeartShape component with size prop
const HeartShape = ({ size = "medium" }) => {
  const sizeClasses = {
    tiny: "w-4 h-4 text-sm",
    small: "w-8 h-8 text-xl",
    medium: "w-16 h-16 text-3xl",
    large: "w-32 h-32 text-6xl",
    huge: "w-48 h-48 text-8xl",
  };

  return (
    <div
      className={`${sizeClasses[size]} text-red-500 flex items-center justify-center`}
    >
      💝
    </div>
  );
};

const ComponentCycler = ({ components = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const handleClick = () => {
    setShow(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % components.length);
      setShow(true);
    }, 500);
  };

  const CurrentComponent = components[currentIndex];

  return (
    <div
      onClick={handleClick}
      className="relative z-10 text-center animate-pulse-slow cursor-pointer transition-transform duration-300 hover:scale-105"
    >
      <div
        className={`transition-all duration-500
          ${
            show
              ? "opacity-100 transform-none"
              : "opacity-0 translate-y-4 md:translate-y-8"
          }`}
      >
        <CurrentComponent />
      </div>
    </div>
  );
};

const ValentineIntro = () => {
  const [loaded, setLoaded] = useState(false);

  const componentList = [
    ValentineText,
    LoveMessage,
    // huge heart shape
    () => <HeartShape size="huge" />,
    OurImage,
    ...coupleImages.map((imagePath) => () => (
      <CoupleImage imagePath={imagePath} />
    )),
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Function to get random size for floating hearts
  const getRandomHeartSize = () => {
    const sizes = ["tiny", "small", "medium"];
    return sizes[Math.floor(Math.random() * sizes.length)];
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-pink-400">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-pink-200 to-pink-400" />

      {/* Floating hearts */}
      <div
        className={`fixed inset-0 ${
          loaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-1000`}
      >
        {Array(8)
          .fill()
          .map((_, i) => (
            <div
              key={i}
              className="absolute animate-float-slow"
              style={{
                top: `${10 + Math.random() * 60}%`,
                left: `${i * 12.5 + Math.random() * 10}%`,
                animationDelay: `${Math.random() * 8}s`,
                transform: `scale(${0.7 + Math.random() * 0.5})`,
              }}
            >
              <img
                src={heartBallon}
                alt="heart"
                className="w-24 h-24 md:w-32 md:h-32 opacity-80"
              />
            </div>
          ))}
      </div>

      {/* Floating heart shapes */}
      <div
        className={`fixed inset-0 ${
          loaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-1000`}
      >
        {Array(32)
          .fill()
          .map((_, i) => (
            <div
              key={`heart-${i}`}
              className="absolute animate-float-slow"
              style={{
                top: `${Math.random() * 90}%`,
                left: `${Math.random() * 90}%`,
                animationDelay: `${Math.random() * 8}s`,
              }}
            >
              <HeartShape size={getRandomHeartSize()} />
            </div>
          ))}
      </div>

      {/* Cycling Components */}
      <ComponentCycler components={componentList} />

      {/* Sparkles */}
      <div className="fixed inset-0 pointer-events-none">
        {Array(32)
          .fill()
          .map((_, i) => {
            const size = Math.random() < 0.3 ? 8 : 4;
            return (
              <div
                key={i}
                className="absolute rounded-full animate-twinkle"
                style={{
                  width: size,
                  height: size,
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 8}s`,
                }}
              />
            );
          })}
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg) scale(1);
          }
          50% {
            transform: translateY(-20px) rotate(5deg) scale(1.05);
          }
        }
        .animate-float-slow {
          animation: float 8s ease-in-out infinite;
        }
        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 1.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ValentineIntro;
