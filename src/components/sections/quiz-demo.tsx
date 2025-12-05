'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, XCircle } from 'lucide-react';

const demoQuizzes = {
  science: [
    {
      question: "What is the chemical symbol for water?",
      options: ["O2", "H2O", "CO2", "NaCl"],
      correctAnswer: "H2O",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars",
    },
    {
      question: "What is the powerhouse of the cell?",
      options: ["Nucleus", "Ribosome", "Mitochondrion", "Chloroplast"],
      correctAnswer: "Mitochondrion",
    },
  ],
  history: [
      {
        question: "In which year did World War II end?",
        options: ["1945", "1942", "1950", "1939"],
        correctAnswer: "1945",
      },
      {
        question: "Who was the first President of the United States?",
        options: ["Thomas Jefferson", "Abraham Lincoln", "George Washington", "John Adams"],
        correctAnswer: "George Washington",
      },
  ]
};

type QuizTopic = keyof typeof demoQuizzes;

export function QuizDemo() {
  const [topic, setTopic] = useState<QuizTopic>('science');
  const quizData = useMemo(() => demoQuizzes[topic], [topic]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

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
  
  const handleTopicChange = (newTopic: QuizTopic) => {
    setTopic(newTopic);
    handleRestart();
  }

  const progress = ((currentQuestionIndex) / quizData.length) * 100;

  const resultsData = [
    { name: 'Correct', value: finalScore },
    { name: 'Incorrect', value: quizData.length - finalScore },
  ];

  return (
    <section id="demo" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Try It Out!</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Experience the quiz interface firsthand. Choose a topic and see how it works.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-2xl mt-12">
            <Card className="shadow-2xl">
              <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="capitalize font-headline text-2xl">{topic} Quiz</CardTitle>
                    <Select onValueChange={(value: QuizTopic) => handleTopicChange(value)} defaultValue={topic}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Change Topic" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="science">Science</SelectItem>
                            <SelectItem value="history">History</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
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
              <CardFooter>
                {showResult ? (
                  <Button onClick={handleRestart} className="w-full">Restart Demo</Button>
                ) : (
                  <Button onClick={handleNext} disabled={!selectedAnswer} className="w-full">
                    {currentQuestionIndex < quizData.length - 1 ? 'Next Question' : 'Finish Quiz'}
                  </Button>
                )}
              </CardFooter>
            </Card>
        </div>
      </div>
    </section>
  );
}
