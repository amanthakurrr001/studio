'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would save user info.
    // We'll simulate success and redirect to dashboard.
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <UserPlus className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-headline">Just one more step!</CardTitle>
          <CardDescription>Let's set up your profile. This helps personalize your experience.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" placeholder="John Doe" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="profession">Profession (Optional)</Label>
                <Input id="profession" type="text" placeholder="Student" />
                </div>
                <div className="space-y-2">
                <Label htmlFor="age">Age (Optional)</Label>
                <Input id="age" type="number" placeholder="25" />
                </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Continue to Dashboard</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
