import { Input } from 'postcss';
import { useState } from 'react';

export default function VolumeControls() {
    const [musicVolume, setMusicVolume] = useState(50);
    const [sfxVolume, setSfxVolume] = useState(50);
    const [musicMuted, setMusicMuted] = useState(false);
    const [sfxMuted, setSfxMuted] = useState(false);

    return (
        <div className="flex items-center gap-6">
            {/* Music Slider */}
            <div className="flex items-center gap-2">
                <label className="text-sm text[var(--forest-text)]">Music</label>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={musicMuted ? 0 : musicVolume}
                    onChange={(e) => {
                        setMusicVolume(parseInt(e.target.value, 10));
                        if (musicMuted)
                            setMusicMuted(false);
                    }}
                    className="accent-[var(--forest-primary)]"
                />
                <button
                    onClick={() => setMusicMuted(!musicMuted)}
                    className={`ml-1  text-[var(--forest-primary)] hover:text-[var(--forest-secondary)]`}
                >
                    {musicMuted ? "🔈" : "🔊"}
                </button>
            </div>

            {/* SFX Slider */}
            <div className="flex items-center gap-2">
                <label className="text-sm text[var(--forest-text)]">SFX</label>
                <input
                    type="range"
                    min={0}
                    max={100}
                    value={sfxMuted ? 0 : sfxVolume}
                    onChange={(e) => {
                        setSfxVolume(parseInt(e.target.value, 10));
                        if (sfxMuted)
                            setSfxMuted(false);
                    }}
                    className="accent-[var(--forest-primary)]"
                />
                <button
                    onClick={() => setSfxMuted(!sfxMuted)}
                    className={`ml-1 text-[var(--forest-primary)] hover:text-[var(--forest-secondary)]`}
                >
                    {sfxMuted ? "🔈" : "🔊"}
                </button>
            </div>
        </div>
    );
}