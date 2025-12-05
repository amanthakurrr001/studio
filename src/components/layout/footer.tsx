import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 flex items-center md:mb-0">
            <GraduationCap className="h-8 w-8 mr-2 text-primary" />
            <span className="text-2xl font-bold font-headline">QuizCraft AI</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © {new Date().getFullYear()} QuizCraft AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
