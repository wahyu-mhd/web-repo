import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { Skills } from '@/components/sections/Skills';
import { Contact } from '@/components/sections/Contact';
import { CylinderScroll } from '@/components/CylinderScroll';

export default function Home() {
  return (
    <CylinderScroll>
      <Hero />
      <About />
      <Experience />
      <FeaturedProjects />
      <Skills />
      <Contact />
    </CylinderScroll>
  );
}
