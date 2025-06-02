"use  client";
import {  motion } from "framer-motion";

interface  TileProps {
    letter: string;
    onClick?: () => void;
    isDisabled?: boolean;
}

export default function Tile({ letter, onClick, isDisabled }: TileProps) {
    return (
        <motion.div
            onClick={isDisabled ? undefined : onClick}
            className={`
                w-12 h-12 md:w-14 md:h-14
                bg-[var(--forest-tile)]
                border-2 border-[var(--forest-tile-border)]
                rounded-lg flex items-center justify-center
                text-xl font-semibold
                text-[var(--forest-text)]
                ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                `}
                whileHover={{ scale: isDisabled ? 1 : 1.1 }}
                whileTap={{ scale: isDisabled ? 1 : 0.9 }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                }}
            >
                {letter}
        </motion.div>
    );
}
