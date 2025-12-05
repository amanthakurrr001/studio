'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/componentsui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/auth/verify-otp');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <GraduationCap className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-headline">Welcome to QuizCraft AI</CardTitle>
          <CardDescription>Enter your Gmail to receive a verification code.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Gmail Address</Label>
              <Input id="email" type="email" placeholder="your.name@gmail.com" required />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Verify Gmail</Button>
          </CardFooter>
        </form>
        <div className="p-6 pt-0 text-center text-sm">
            <Link href="/" className="text-primary hover:underline">
                Back to Home
            </Link>
        </div>
      </Card>
    </div>
  );
}
