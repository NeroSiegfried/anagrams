import { useEffect, useState } from 'react';

interface TimerProps {
    initialSeconds: number;
    onExpire: () => void;
}

export default function Timer({ initialSeconds, onExpire }: TimerProps) {
    const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

    useEffect(() => {
        if (secondsLeft <= 0) {
            onExpire();
            return;
        }
        const intervalId = setInterval(() => {
            setSecondsLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [secondsLeft, onExpire]);

    const minutes = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;
    const paddedSecs = secs < 10 ? `0${secs}` : secs;

    return (
        <div className="font-mono text-lg text-[var(--forest-primary)]">
            {minutes}:{paddedSecs}
        </div>
    );
}