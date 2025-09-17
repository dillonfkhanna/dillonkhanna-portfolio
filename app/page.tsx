import fs from 'fs/promises';
import path from 'path';

import Hero from '@/components/Hero';

export default async function Home() {
  const filePath = path.join(process.cwd(), 'data', 'professional-page.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const content = JSON.parse(fileContents);

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 py-16 md:gap-16 md:px-10 lg:px-12">
      <Hero title={content.hero.title} subtitle={content.hero.subtitle} />
    </main>
  );
}
