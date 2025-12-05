'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Info, Download, Play, Save, Trash2, Loader2, Sparkles, Users } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import { generateQuizFromTopic, type GenerateQuizFromTopicOutput } from '@/ai/flows/generate-quiz-from-topic';

const AIGenerator = ({ onQuizGenerated, isGuest }: { onQuizGenerated: (quiz: GenerateQuizFromTopicOutput) => void, isGuest: boolean }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [topic, setTopic] = useState("The Renaissance period in Europe");
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState("Medium");

  useEffect(() => {
    if (isGuest) {
      setApiKey('guest-key'); // Guests don't need a real key for this simulation
    } else {
      const savedKey = localStorage.getItem('gemini-api-key');
      if (savedKey) {
        setApiKey(savedKey);
      }
    }
  }, [isGuest]);


  const handleGenerate = async () => {
    if (!apiKey && !isGuest) {
      toast({
        variant: "destructive",
        title: "API Key Required",
        description: "Please save your Gemini API key before generating a quiz.",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await generateQuizFromTopic({
        topic,
        numQuestions,
        difficulty,
        apiKey: isGuest ? undefined : apiKey,
      });
      onQuizGenerated(result);
      toast({
        title: "Quiz Generated!",
        description: `Your quiz on "${topic}" is ready.`,
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "Something went wrong while generating the quiz. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Quiz Generator</CardTitle>
        <CardDescription>Generate a quiz by providing a topic and specifications.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="topic">Topic/Prompt</Label>
          <Textarea id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g., 'The Renaissance period in Europe'" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="questions">Number of Questions</Label>
            <Input id="questions" type="number" value={numQuestions} onChange={(e) => setNumQuestions(parseInt(e.target.value))} placeholder="5" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty</Label>
            <Input id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} placeholder="Medium" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleGenerate} disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
          {loading ? 'Generating...' : 'Generate Quiz'}
        </Button>
      </CardFooter>
    </Card>
  );
};

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

const ApiKeyManager = () => {
    const { toast } = useToast();
    const [apiKey, setApiKey] = useState('');

    useEffect(() => {
        const savedKey = localStorage.getItem('gemini-api-key');
        if (savedKey) {
            setApiKey(savedKey);
        }
    }, []);

    const handleSaveKey = () => {
        localStorage.setItem('gemini-api-key', apiKey);
        toast({
            title: "API Key Saved",
            description: "Your Gemini API key has been saved locally.",
        });
    };
    
    return (
        <Card className="mb-8">
            <CardHeader>
                <CardTitle>Gemini API Key</CardTitle>
                <CardDescription>
                    Your personal API key is required for AI quiz generation. It's stored securely in your browser.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
                <Input 
                    type="password" 
                    placeholder="Enter your Gemini API Key" 
                    className="flex-1" 
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                />
                <Button onClick={handleSaveKey}>Save Key</Button>
            </CardContent>
            <CardFooter>
                <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    How to get your Gemini API Key
                </a>
            </CardFooter>
        </Card>
    )
}

const QuizOutput = ({ quiz, onDiscard, isGuest, topic }: { quiz: GenerateQuizFromTopicOutput, onDiscard: () => void, isGuest: boolean, topic: string }) => {
    
    const { toast } = useToast();

    const downloadQuiz = () => {
      let content = `Quiz Title: ${topic}\n\n`;

      quiz.quiz.forEach((q, index) => {
        content += `${index + 1}. ${q.question}\n`;
        q.options.forEach((option, optionIndex) => {
          content += `    ${String.fromCharCode(97 + optionIndex)}. ${option}\n`;
        });
        content += `    Note: The correct answer is ${q.correctAnswer}.\n\n`;
      });

      const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(content);
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", `${topic.replace(/\s+/g, '_').toLowerCase()}_quiz.txt`);
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      toast({ title: "Quiz downloaded!" });
    }

    const saveQuiz = () => {
        // This is a placeholder for a real save to DB
        toast({ title: "Quiz saved!", description: "This quiz is now in your history." });
    }

    if (!quiz || quiz.quiz.length === 0) return null;

    return (
        <div className="mt-8">
            <h3 className="text-2xl font-bold font-headline mb-4">Your New Quiz</h3>
            <Card className="bg-secondary/50">
                 <CardHeader>
                    <Alert>
                        <Sparkles className="h-4 w-4" />
                        <AlertTitle>Quiz Generated on "{topic}"!</AlertTitle>
                        <AlertDescription>
                            You can now play, save, or download it.
                        </AlertDescription>
                    </Alert>
                </CardHeader>
                <CardContent>
                    {quiz.quiz.map((q, index) => (
                        <div key={index} className="mt-4 p-4 border rounded-lg bg-background first:mt-0">
                            <p className="font-semibold">{index + 1}. {q.question}</p>
                            <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                                {q.options.map(opt => (
                                    <li key={opt} className={opt === q.correctAnswer ? "text-primary font-medium" : ""}>
                                        {opt}
                                        {opt === q.correctAnswer && " (Correct)"}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </CardContent>
                <CardFooter className="gap-2">
                    {!isGuest && <Button onClick={saveQuiz}><Save /> Save</Button>}
                    <Button variant="secondary" onClick={downloadQuiz}><Download /> Download</Button>
                    <Button variant="secondary"><Play /> Play Quiz</Button>
                    <Button variant="destructive" className="ml-auto" onClick={onDiscard}><Trash2 /> Discard</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default function DashboardPage() {
  const [userType, setUserType] = useState<'guest' | 'authenticated' | null>(null);
  const [generatedQuiz, setGeneratedQuiz] = useState<GenerateQuizFromTopicOutput | null>(null);
  const [currentTopic, setCurrentTopic] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user') as 'guest' | 'authenticated' | null;
    setUserType(user);
  }, []);

  const handleQuizGenerated = (quizData: GenerateQuizFromTopicOutput) => {
    const topic = (document.getElementById('topic') as HTMLTextAreaElement)?.value || 'New Quiz';
    setCurrentTopic(topic);
    setGeneratedQuiz(quizData);
  }

  const handleDiscard = () => {
    setGeneratedQuiz(null);
  }

  if (userType === null) {
      return <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>
  }
  
  const isGuest = userType === 'guest';

  return (
    <>
      <h1 className="text-3xl font-bold font-headline mb-8">Workspace</h1>
      
      {!isGuest && <ApiKeyManager />}
      {isGuest && (
        <Alert className="mb-8 border-primary">
          <Users className="h-4 w-4" />
          <AlertTitle>You are in Guest Mode</AlertTitle>
          <AlertDescription>
            Certain features like saving quizzes and viewing history are disabled. <Link href="/auth/signup" className="font-bold text-primary hover:underline">Sign up</Link> to get full access.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="ai" className="w-full">
        <TabsList className={`grid w-full ${isGuest ? 'grid-cols-1' : 'grid-cols-2'}`}>
          <TabsTrigger value="ai">AI Generator</TabsTrigger>
          {!isGuest && <TabsTrigger value="manual">Manual Creator</TabsTrigger>}
        </TabsList>
        <TabsContent value="ai" className="mt-4">
          <AIGenerator onQuizGenerated={handleQuizGenerated} isGuest={isGuest} />
        </TabsContent>
        {!isGuest && <TabsContent value="manual" className="mt-4">
          <ManualCreator />
        </TabsContent>}
      </Tabs>

      {generatedQuiz && <QuizOutput quiz={generatedQuiz} onDiscard={handleDiscard} isGuest={isGuest} topic={currentTopic} />}
    </>
  );
}
