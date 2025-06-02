// app/page.tsx

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-[var(--forest-primary)] mb-4">
        Anagrams
      </h1>
      <p className="text-lg text-[var(--forest-text)] mb-8">
        A cozy, forest-themed anagram challenge. No signup required—just play!
      </p>
      <Link href="/anagrams">
        <button className="px-6 py-3 bg-[var(--forest-primary)] hover:bg-[var(--forest-secondary)] text-[var(--forest-text-light)] rounded-lg transition">
          Play Now
        </button>
      </Link>
    </main>
  );
}
