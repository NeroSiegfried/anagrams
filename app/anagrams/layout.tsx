import Link from "next/link";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-[var(--forest-primary)] text-[var(--forest-text-light)] p-4 flex justify-between items-center shadow-lg">
        <h2 className="text-2xl font-semibold">Anagrams</h2>
        <Link href="/" className="hover:text-[var(--forest-neutral)]">
          Home
        </Link>
      </header>

      {/* Main Game Area */}
      <div className="flex-grow flex items-center justify-center">
        {children}
      </div>

      {/* Footer */}
      <footer className="bg-[var(--forest-neutral)] text-[var(--forest-text)] p-4 flex justify-center gap-4">
        {/* Placeholder for Volume Controls or other info */}
        <div>Background Music: ◉ | SFX: ◉</div>
      </footer>
    </div>
  );
}
