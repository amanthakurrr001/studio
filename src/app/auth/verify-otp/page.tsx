'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MailCheck } from 'lucide-react';

export default function VerifyOtpPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically verify the OTP.
    // We'll simulate success and redirect to onboarding.
    router.push('/onboarding');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <MailCheck className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-headline">Check your Email</CardTitle>
          <CardDescription>We've sent a verification code to your Gmail.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">Verification Code</Label>
              <Input id="otp" type="text" inputMode="numeric" pattern="[0-9]*" placeholder="123456" required />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Verify Account</Button>
          </CardFooter>
        </form>
         <div className="p-6 pt-0 text-center text-sm">
            <p className="text-muted-foreground">Didn't receive a code?{' '}
                <Link href="/auth/login" className="text-primary hover:underline">
                    Resend
                </Link>
            </p>
        </div>
      </Card>
    </div>
  );
}
