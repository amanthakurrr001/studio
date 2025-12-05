import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BrainCircuit } from 'lucide-react';

export function Hero() {
  return (
    <section className="w-full py-20 md:py-32 lg:py-40 bg-card">
      <div className="container px-4 md:px-6">
        <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Generate, Play, and Learn with AI-Powered Quizzes
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Effortlessly create engaging quizzes with AI, or build them manually. Track your progress and master any subject. Your learning journey, supercharged.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/auth/login">
                  Get Started
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-72 h-72 bg-secondary rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <BrainCircuit className="w-36 h-36 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
