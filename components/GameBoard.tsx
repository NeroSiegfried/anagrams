// components/GameBoard.tsx

"use client";

import { useEffect, useState, useRef } from "react";
import Tile from "./Tile";
import Slot from "./Slot";
import Timer from "./Timer";
import VolumeControls from "./VolumeControls";
import { motion } from "framer-motion";

interface GameBoardProps {
  // (If you later want to pass props, define them here)
}

// For this initial scaffold, we’ll use a fixed six-letter example.
const INITIAL_LETTERS = ["G", "E", "O", "S", "R", "T"];

export default function GameBoard(_: GameBoardProps) {
  // === STATE ===

  // Pool of clickable tiles
  const [pool, setPool] = useState<string[]>([...INITIAL_LETTERS]);

  // Slots above, one per letter
  const [slots, setSlots] = useState<(string | null)[]>(
    Array(INITIAL_LETTERS.length).fill(null)
  );

  // Current score
  const [score, setScore] = useState<number>(0);

  // "idle" | "correct" | "wrong" | "bonus"
  const [status, setStatus] = useState<"idle" | "correct" | "wrong" | "bonus">(
    "idle"
  );

  // Whether time has run out
  const [timeUp, setTimeUp] = useState<boolean>(false);

  // === HANDLERS ===

  function handleTileClick(letter: string, indexInPool: number) {
    if (timeUp) return;
    if (slots.every((s) => s !== null)) return;

    setPool((prev) => {
      const next = [...prev];
      next.splice(indexInPool, 1);
      return next;
    });

    setSlots((prev) => {
      const next = [...prev];
      const firstEmpty = next.findIndex((s) => s === null);
      if (firstEmpty >= 0) {
        next[firstEmpty] = letter;
      }
      return next;
    });
  }

  function shufflePool() {
    if (timeUp) return;
    setPool((prev) => [...prev].sort(() => Math.random() - 0.5));
  }

  function submitWord() {
    if (timeUp) return;

    const word = slots.filter((l) => l !== null).join("");
    if (word.length < 3) {
      flashWrong();
      return;
    }

    // Stub: treat any 3+ as valid
    const isValid = true;

    const earned =
      word.length === 3
        ? 100
        : word.length === 4
        ? 300
        : word.length === 5
        ? 1200
        : word.length === 6
        ? 2000
        : 2000 + 400 * (word.length - 6);

    if (isValid) {
      if (word.length >= 6) {
        flashBonus();
      } else {
        flashCorrect();
      }
      setScore((prev) => prev + earned);

      setPool((prev) => [...prev, ...slots.filter((l) => l !== null) as string[]]);
      setSlots(Array(INITIAL_LETTERS.length).fill(null));
    } else {
      flashWrong();
    }
  }

  function flashCorrect() {
    setStatus("correct");
    setTimeout(() => {
      setStatus("idle");
    }, 300);
  }

  function flashBonus() {
    setStatus("bonus");
    setTimeout(() => {
      setStatus("idle");
    }, 500);
  }

  function flashWrong() {
    setStatus("wrong");
    setTimeout(() => {
      setSlots(Array(INITIAL_LETTERS.length).fill(null));
      setPool([...INITIAL_LETTERS]);
      setStatus("idle");
    }, 300);
  }

  function handleExpire() {
    setTimeUp(true);
  }

  // === Multiplayer heartbeat/disconnect stub ===

  // In the browser, setInterval returns a number (the timer ID)
  const heartbeatRef = useRef<number | null>(null);
  const disconnectedAtRef = useRef<number | null>(null);

  useEffect(() => {
    // Example: 
    // heartbeatRef.current = window.setInterval(() => {
    //   emitPingToServer();
    //   // if no pong after 10s, record disconnectedAtRef.current = Date.now()
    // }, 5000);

    return () => {
      if (heartbeatRef.current !== null) {
        clearInterval(heartbeatRef.current);
      }
    };
  }, []);

  // === Keyboard Controls ===

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (timeUp) return;
      if ((e.target as HTMLElement).tagName === "INPUT") return;

      const key = e.key.toUpperCase();

      if (key === "ENTER") {
        submitWord();
      } else if (key === "BACKSPACE") {
        // Remove last placed tile
        setSlots((prevSlots) => {
          const nextSlots = [...prevSlots];
          // Find index of last non-null
          let lastFilledIndex = -1;
          for (let i = nextSlots.length - 1; i >= 0; i--) {
            if (nextSlots[i] !== null) {
              lastFilledIndex = i;
              break;
            }
          }
          if (lastFilledIndex >= 0) {
            const letterToReturn = nextSlots[lastFilledIndex] as string;
            nextSlots[lastFilledIndex] = null;
            setPool((prevPool) => [...prevPool, letterToReturn]);
          }
          return nextSlots;
        });
      } else if (key === "DELETE") {
        setSlots(Array(INITIAL_LETTERS.length).fill(null));
        setPool([...INITIAL_LETTERS]);
      } else {
        if (/^[A-Z]$/.test(key)) {
          const idxInPool = pool.findIndex((l) => l === key);
          if (idxInPool !== -1) {
            handleTileClick(key, idxInPool);
          }
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [pool, slots, timeUp]);

  // === RENDER ===
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Top Bar */}
      <div className="w-full flex justify-between items-center px-4">
        <Timer initialSeconds={60} onExpire={handleExpire} />
        <VolumeControls />
      </div>

      {/* Tile Pool */}
      <div className="flex flex-wrap justify-center gap-2">
        {pool.map((letter, idx) => (
          <Tile
            key={`${letter}-${idx}`}
            letter={letter}
            onClick={() => handleTileClick(letter, idx)}
            isDisabled={timeUp}
          />
        ))}
      </div>

      {/* Slots Below */}
      <div className="flex justify-center gap-2">
        {slots.map((letter, idx) => (
          <Slot key={idx} letter={letter || undefined} status={status} />
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={shufflePool}
          disabled={timeUp}
          className={`
            px-4 py-2 
            bg-[var(--forest-primary)] 
            hover:bg-[var(--forest-secondary)] 
            text-[var(--forest-text-light)] 
            rounded-md transition
            ${timeUp ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          Shuffle
        </button>
        <button
          onClick={submitWord}
          disabled={timeUp}
          className={`
            px-4 py-2 
            bg-[var(--forest-primary)] 
            hover:bg-[var(--forest-secondary)] 
            text-[var(--forest-text-light)] 
            rounded-md transition
            ${timeUp ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          Submit
        </button>
      </div>

      {/* Score */}
      <div className="mt-6 text-2xl font-bold text-[var(--forest-primary)]">
        Score: {score}
      </div>

      {/* Time’s Up Message */}
      {timeUp && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-xl font-semibold text-red-600"
        >
          Time’s up!
        </motion.div>
      )}
    </div>
  );
}
