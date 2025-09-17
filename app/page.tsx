import fs from 'fs/promises';
import path from 'path';

import Hero from '@/components/Hero';

export default async function Home() {
  const filePath = path.join(process.cwd(), 'data', 'professional-page.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const content = JSON.parse(fileContents);
  const { hero } = content;

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 pb-16 pt-32 sm:pt-36 md:gap-16 md:px-10 md:pt-40 lg:px-12">
      <Hero
        name={hero.name}
        jobTitle={hero.jobTitle}
        description={hero.description}
        techFocus={hero.techFocus}
        scrollTarget={hero.scrollTarget}
      />
    </main>
  );
}
