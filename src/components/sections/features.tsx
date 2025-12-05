import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Zap, Pencil, BarChart2 } from "lucide-react";

const featuresData = [
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "AI-Powered Generation",
    description: "Instantly create quizzes on any topic with our advanced AI. Just provide a prompt, and we'll handle the rest.",
  },
  {
    icon: <Pencil className="w-8 h-8 text-primary" />,
    title: "Manual Creation",
    description: "Have specific questions in mind? Use our intuitive editor to build your quizzes from scratch, with full control over content.",
  },
  {
    icon: <BarChart2 className="w-8 h-8 text-primary" />,
    title: "Track Your Growth",
    description: "Monitor your performance over time. Our detailed analytics help you identify strengths and areas for improvement.",
  },
];

export function Features() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Core Features</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Everything you need to create, play, and master quizzes.
            </p>
          </div>
        </div>
        <div className="mx-auto grid gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
          {featuresData.map((feature, index) => (
            <Card key={index} className="shadow-lg transition-transform transform hover:-translate-y-2">
              <CardHeader className="flex flex-col items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="font-headline">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
