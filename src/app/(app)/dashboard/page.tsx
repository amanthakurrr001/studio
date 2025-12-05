import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Info, Download, Play, Save } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";

// These would be client components with form logic, but for now they are placeholders.
const AIGenerator = () => (
  <Card>
    <CardHeader>
      <CardTitle>AI Quiz Generator</CardTitle>
      <CardDescription>Generate a quiz by providing a topic and specifications.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="topic">Topic/Prompt</Label>
        <Textarea id="topic" placeholder="e.g., 'Generate a 5 question quiz about The Renaissance period in Europe with medium difficulty.'" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="questions">Number of Questions</Label>
          <Input id="questions" type="number" placeholder="5" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="difficulty">Difficulty</Label>
          <Input id="difficulty" placeholder="Medium" />
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <Button>Generate Quiz</Button>
    </CardFooter>
  </Card>
);

const ManualCreator = () => (
  <Card>
    <CardHeader>
      <CardTitle>Manual Quiz Creator</CardTitle>
      <CardDescription>Build your own quiz, question by question.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Label>Question 1</Label>
        <Input placeholder="Enter your question" />
      </div>
       <div className="space-y-2">
        <Label>Options</Label>
        <Input placeholder="Correct Answer" />
        <Input placeholder="Option 2" />
        <Input placeholder="Option 3" />
        <Input placeholder="Option 4" />
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="outline">Add Another Question</Button>
    </CardFooter>
  </Card>
);

const ApiKeyManager = () => (
    <Card className="mb-8">
        <CardHeader>
            <CardTitle>Gemini API Key</CardTitle>
            <CardDescription>
                Your personal API key is required for AI quiz generation. It's stored securely and only used by you.
            </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
            <Input type="password" placeholder="Enter your Gemini API Key" className="flex-1" />
            <Button>Save Key</Button>CardContent>
        <CardFooter>
            <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-2">
                <Info className="w-4 h-4" />
                How to get your Gemini API Key
            </a>
        </CardFooter>
    </Card>
)

const QuizOutput = () => (
    <div className="mt-8">
        <h3 className="text-2xl font-bold font-headline mb-4">Your New Quiz</h3>
        <Card className="bg-secondary/50">
            <CardContent className="p-6">
                <Alert>
                    <AlertTitle>Quiz Generated!</AlertTitle>
                    <AlertDescription>
                        Here's your quiz on "The Renaissance". You can now play, save, or download it.
                    </AlertDescription>
                </Alert>
                <div className="mt-4 p-4 border rounded-lg bg-background">
                    <p className="font-semibold">1. Who painted the Mona Lisa?</p>
                    <ul className="list-disc pl-5 mt-2 text-muted-foreground">
                        <li className="text-primary font-medium">Leonardo da Vinci (Correct)</li>
                        <li>Michelangelo</li>
                        <li>Raphael</li>
                        <li>Donatello</li>
                    </ul>
                </div>
            </CardContent>
            <CardFooter className="gap-2">
                <Button><Save /> Save</Button>
                <Button variant="secondary"><Download /> Download</Button>
                <Button variant="secondary"><Play /> Play Quiz</Button>
                <Button variant="destructive" className="ml-auto">Discard</Button>
            </CardFooter>
        </Card>
    </div>
)


export default function DashboardPage() {
  return (
    <>
      <h1 className="text-3xl font-bold font-headline mb-8">Workspace</h1>
      
      <ApiKeyManager />

      <Tabs defaultValue="ai" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ai">AI Generator</TabsTrigger>
          <TabsTrigger value="manual">Manual Creator</TabsTrigger>
        </TabsList>
        <TabsContent value="ai" className="mt-4">
          <AIGenerator />
        </TabsContent>
        <TabsContent value="manual" className="mt-4">
          <ManualCreator />
        </TabsContent>
      </Tabs>

      {/* This would be shown conditionally after a quiz is created */}
      <QuizOutput />
    </>
  );
}
