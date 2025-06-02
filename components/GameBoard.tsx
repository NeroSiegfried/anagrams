"use client";

import { useEffect, useState, useRef } from "react";
import Tile from "./Tile";
import Slot from "./Slot";
import Timer from "./Timer";
import VolumeControls from "./VolumeControls";
import { motion } from "framer-motion";

// Initial letter set for demonstration
const INITIAL_LETTTERS = ["G", "E", "O", "S", "R", "T"];

export default function GameBoard() {
    // State and handlers omitted for brevity

    return (
        <div className="flex flex-col items-center gap-6">
            {/* Top Bar with Timer and Volume Controls */}
            <div className="w-full flex justify-between items-center px-4">
                <Timer initialSeconds={60} onExpire={() => {}} />
                <VolumeControls />
            </div>

            {/* Tile Pool */}
            <div className="flex flex-wrapp justify-center gap-2">
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
                    <Slot
                        key={idx}
                        letter={letter || undefined}
                        status={status}
                    />
                ))}
            </div>

            {/* Buttons: Shuffle and Submit */}
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
                    `}
                >
                    Submit
                </button>
            </div>

            {/* Score Display */}
            <div className="mt-6 text-2xl font-bold text-[var(--forest-primary)]">
                Score: {score}
            </div>

            {/* Time's Up Message */}
            {timeUp && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 text-xl font-semibold text-red-600"
                >
                    Time's Up!
                </motion.div>
            )}

        </div>
    );
}