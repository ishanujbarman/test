"use client";
import { useState, useRef, useEffect } from "react";
import Confetti from "react-confetti";

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const audioRef = useRef<HTMLAudioElement>(null);

  const yesButtonSize = noCount * 20 + 16;

  // Track window size for Confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    // Set initial size
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const handleYesClick = () => {
    setYesPressed(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch((e) => console.log("Audio play failed:", e));
    }
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure?",
      "Really sure?",
      "Think again!",
      "Last chance!",
      "Surely not?",
      "You might regret this!",
      "Give it another thought!",
      "Are you absolutely certain?",
      "This could be a mistake!",
      "Have a heart!",
      "Don't be so cold!",
      "Change of heart?",
      "Wouldn't you reconsider?",
      "Is that your final answer?",
      "You're breaking my heart ;(",
    ];
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
      <div className="flex flex-col items-center justify-center h-dvh w-screen bg-pink-50 text-center p-4 overflow-hidden relative">
        <audio ref={audioRef} src="/music.mp3" loop />

        {yesPressed && (
            <div className="absolute top-0 left-0 w-full h-full z-50 pointer-events-none">
              <Confetti width={windowSize.width} height={windowSize.height} />
            </div>
        )}

        {yesPressed ? (
            <div className="flex flex-col items-center justify-center animate-bounce">
              <img
                  src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
                  className="max-w-[80vw] max-h-[40vh] object-contain"
                  alt="Bears kissing"
              />
              <div className="text-4xl md:text-6xl font-bold my-4 text-rose-600">
                Woohoo!!! ❤️
              </div>
              <div className="text-4xl md:text-6xl font-bold my-4 text-rose-600">
                Thank you for accepting my request Miss Ates Fangirl, Be ready for Valentine!!!
              </div>
            </div>
        ) : (
            <div className="flex flex-col items-center gap-6 w-full max-w-md">
              <img
                  className="max-w-[80vw] max-h-[35vh] object-contain drop-shadow-lg rounded-lg"
                  src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif"
                  alt="Bear with roses"
              />

              <h1 className="text-3xl md:text-5xl font-extrabold text-rose-600 px-4 leading-tight">
                Will you be my Valentine Miss Rameshwaram?
              </h1>

              <div className="flex flex-wrap justify-center items-center gap-4 w-full px-2">
                <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-110"
                    style={{ fontSize: yesButtonSize }}
                    onClick={handleYesClick}
                >
                  Yes
                </button>

                <button
                    onClick={handleNoClick}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300"
                >
                  {noCount === 0 ? "No" : getNoButtonText()}
                </button>
              </div>
            </div>
        )}
      </div>
  );
}