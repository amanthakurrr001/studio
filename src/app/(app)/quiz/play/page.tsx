'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
};

type StoredQuiz = {
    title: string;
    quizData: QuizQuestion[];
};

export default function QuizPlayPage() {
  const router = useRouter();
  const [quiz, setQuiz] = useState<StoredQuiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  useEffect(() => {
    const storedQuiz = localStorage.getItem('currentQuiz');
    if (storedQuiz) {
        setQuiz(JSON.parse(storedQuiz));
    }
  }, []);

  if (!quiz) {
    return (
        <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
             <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>
        </div>
    )
  }

  const { title: quizTitle, quizData } = quiz;

  const handleNext = () => {
    const isCorrect = selectedAnswer === quizData[currentQuestionIndex].correctAnswer;
    
    if (currentQuestionIndex < quizData.length - 1) {
      if(isCorrect) setScore(score + 1);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      const currentScore = score + (isCorrect ? 1 : 0);
      setFinalScore(currentScore);
      setShowResult(true);
    }
  };
  
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setFinalScore(0);
    setShowResult(false);
  };

  const progress = ((currentQuestionIndex) / quizData.length) * 100;

  const resultsData = [
    { name: 'Correct', value: finalScore },
    { name: 'Incorrect', value: quizData.length - finalScore },
  ];

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <Card className="w-full max-w-2xl shadow-2xl">
            <CardHeader>
                <CardTitle className="capitalize font-headline text-2xl">{quizTitle}</CardTitle>
            </CardHeader>
            <CardContent>
            {showResult ? (
                <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Quiz Completed!</h3>
                <p className="text-xl mb-4">Your score: {finalScore} / {quizData.length}</p>
                    <div className="w-full h-64">
                    <ResponsiveContainer>
                        <BarChart data={resultsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip cursor={{fill: 'hsl(var(--muted))'}} />
                        <Bar dataKey="value">
                            {resultsData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index === 0 ? 'hsl(var(--primary))' : 'hsl(var(--accent))'} />
                            ))}
                        </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                </div>
            ) : (
                <>
                <Progress value={progress} className="mb-4" />
                <h3 className="text-lg font-semibold mb-4">
                    {currentQuestionIndex + 1}. {quizData[currentQuestionIndex].question}
                </h3>
                <RadioGroup onValueChange={setSelectedAnswer} value={selectedAnswer || ''} className="space-y-2">
                    {quizData[currentQuestionIndex].options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`}>{option}</Label>
                    </div>
                    ))}
                </RadioGroup>
                </>
            )}
            </CardContent>
            <CardFooter className='flex-col gap-4'>
            {showResult ? (
                <>
                    <Button onClick={handleRestart} className="w-full">Play Again</Button>
                    <Button onClick={() => router.push('/history')} variant="outline" className="w-full">Back to History</Button>
                </>
            ) : (
                <Button onClick={handleNext} disabled={!selectedAnswer} className="w-full">
                {currentQuestionIndex < quizData.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </Button>
            )}
            </CardFooter>
        </Card>
    </div>
  );
}