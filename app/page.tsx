import fs from 'fs/promises';
import path from 'path';

import HeroSection from '@/components/ui/HeroSection';

export default async function Home() {
  const filePath = path.join(process.cwd(), 'data', 'professional-page.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const content = JSON.parse(fileContents);

  return (
    <main>
      <HeroSection title={content.hero.title} subtitle={content.hero.subtitle} />
    </main>
  );
}
