interface SlotProps {
    letter?: string;
    status?: "idle" | "correct" | "wrong" | "bonus";
}

export default function Slot({ letter, status = "idle" }: SlotProps) {
    // Determine the background/border styles based on the status
    let statusClasses = "";
    if (status === "correct") {
        statusClasses = "bg-green-200 border-green-400";
    }
    if (status === "wrong") {
        statusClasses = "bg-red-200 border-red-400";
    }
    if (status === "bonus") {
        statusClasses = "bg-yellow-200 border-yellow-400";
    }

    return (
        <div 
            className={`
                w-12 h-12 md:w-14 md:h-14
                border-2 rounded-lg
                flex items-center justify-center
                text-xl font-semibold
                ${status === "idle"
                    ? "border-[var(--forest-tile-border)] bg-[var(--forest-neutral)] text-[var(--forest-text)]"
                    : statusClasses}
                `}
        >
            {letter || ""}
        </div>
    );
}