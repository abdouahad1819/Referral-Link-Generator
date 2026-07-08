import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Book } from '@/components/sections/Book';
import { Processes } from '@/components/sections/Processes';
import { Landforms } from '@/components/sections/Landforms';
import { SeaLevel } from '@/components/sections/SeaLevel';
import { Videos } from '@/components/sections/Videos';
import { Review } from '@/components/sections/Review';
import { Quiz } from '@/components/sections/Quiz';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Book />
        <Processes />
        <Landforms />
        <SeaLevel />
        <Videos />
        <Review />
        <Quiz />
      </main>
      <Footer />
    </div>
  );
}
