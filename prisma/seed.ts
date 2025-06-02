// prisma/seed.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Create a test user (with Elo 1200)
  const testUser = await prisma.user.upsert({
    where: { email: "alice@example.com" },
    update: {},
    create: {
      username: "alice",
      email: "alice@example.com",
      hashedPassword: "fakehashedpassword", // replace with a real hash in production
      eloRating: 1200
    },
  });
  console.log("Created user:", testUser.username);

  // 2. Seed a couple of base words and subwords
  // Example: WORD = "FOREST" (6 letters), SUBWORDS = ["SET", "TREE", "REST", "FORE", "FORT"]
  const baseWord1 = await prisma.word.upsert({
    where: { text: "FOREST" },
    update: {},
    create: {
      text: "FOREST",
      length: 6,
    },
  });

  // SubWords for "FOREST"
  const subWords1 = ["SET", "TREE", "REST", "FORE", "FORT"];
  for (const sw of subWords1) {
    await prisma.subWord.upsert({
      where: {
        // Unique constraint on (text, baseWordId) to avoid duplicates
        text_baseWordId: {
          text: sw,
          baseWordId: baseWord1.id,
        },
      },
      update: {},
      create: {
        text: sw,
        definition: `Definition of "${sw}" goes here.`, // In production, fetch real definitions
        baseWordId: baseWord1.id,
      },
    });
  }
  console.log(`Seeded "${baseWord1.text}" with ${subWords1.length} subwords.`);

  // 3. Another example: WORD = "ANAGRAM" (7 letters)
  const baseWord2 = await prisma.word.upsert({
    where: { text: "ANAGRAM" },
    update: {},
    create: {
      text: "ANAGRAM",
      length: 7,
    },
  });

  // SubWords for "ANAGRAM" (just a few examples)
  const subWords2 = ["RAG", "GRAM", "RAMA", "MARA", "ANNA"];
  for (const sw of subWords2) {
    await prisma.subWord.upsert({
      where: {
        text_baseWordId: {
          text: sw,
          baseWordId: baseWord2.id,
        },
      },
      update: {},
      create: {
        text: sw,
        definition: `Definition of "${sw}".`, // Replace with real definitions later
        baseWordId: baseWord2.id,
      },
    });
  }
  console.log(`Seeded "${baseWord2.text}" with ${subWords2.length} subwords.`);

  console.log("✅ Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
