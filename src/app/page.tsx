import { PublicHeader } from '@/components/layout/public-header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { QuizDemo } from '@/components/sections/quiz-demo';
import { Features } from '@/components/sections/features';
import { Faq } from '@/components/sections/faq';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="flex-1">
        <Hero />
        <QuizDemo />
        <Features />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
