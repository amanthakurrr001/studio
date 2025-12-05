'use client'

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Play, BarChart3, AlertTriangle } from "lucide-react";
import Link from "next/link";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { useRouter } from "next/navigation";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const chartData = [
  { month: "January", desktop: 8 },
  { month: "February", desktop: 7 },
  { month: "March", desktop: 9 },
  { month: "April", desktop: 6 },
  { month: "May", desktop: 8 },
  { month: "June", desktop: 10 },
]

const chartConfig = {
  desktop: {
    label: "Score",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

type QuizHistoryItem = {
    id: string;
    topic: string;
    date: string;
    lastScore: string;
    quizData: any;
};

export default function HistoryPage() {
    const router = useRouter();
    const [quizHistory, setQuizHistory] = useState<QuizHistoryItem[]>([]);

    useEffect(() => {
        const storedHistory = localStorage.getItem('quizHistory');
        if (storedHistory) {
            setQuizHistory(JSON.parse(storedHistory));
        }
    }, []);

    const handlePlayQuiz = (quiz: QuizHistoryItem) => {
        localStorage.setItem('currentQuiz', JSON.stringify({ title: quiz.topic, quizData: quiz.quizData }));
        router.push('/quiz/play');
    }

    const downloadQuiz = (quiz: QuizHistoryItem) => {
        let content = `Quiz Title: ${quiz.topic}\n\n`;
  
        quiz.quizData.forEach((q: any, index: number) => {
          content += `${index + 1}. ${q.question}\n`;
          q.options.forEach((option: string, optionIndex: number) => {
            content += `    ${String.fromCharCode(97 + optionIndex)}. ${option}\n`;
          });
          content += `    Note: The correct answer is ${q.correctAnswer}.\n\n`;
        });
  
        const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(content);
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${quiz.topic.replace(/\s+/g, '_').toLowerCase()}_quiz.txt`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    return (
        <>
            <h1 className="text-3xl font-bold font-headline mb-2">Quiz History</h1>
            <p className="text-muted-foreground mb-8">Review your past quizzes and track your performance.</p>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Recent Growth</CardTitle>
                    <CardDescription>Your score trend for the most recently practiced topics.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                        <BarChart accessibilityLayer data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            />
                            <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                            />
                            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>All Quizzes</CardTitle>
                </CardHeader>
                <CardContent>
                    {quizHistory.length === 0 ? (
                         <Alert>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>No History Found</AlertTitle>
                            <AlertDescription>
                                You haven't saved any quizzes yet. Go to the <Link href="/dashboard" className="font-bold text-primary hover:underline">Workspace</Link> to create and save a new quiz!
                            </AlertDescription>
                        </Alert>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Topic</TableHead>
                                    <TableHead>Date Saved</TableHead>
                                    <TableHead>Last Score</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {quizHistory.map(quiz => (
                                    <TableRow key={quiz.id}>
                                        <TableCell className="font-medium">{quiz.topic}</TableCell>
                                        <TableCell>{quiz.date}</TableCell>
                                        <TableCell>{quiz.lastScore}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button variant="outline" size="icon" asChild>
                                                <Link href={`/growth/${encodeURIComponent(quiz.topic.toLowerCase().replace(/\s+/g, '-'))}`}><BarChart3 className="h-4 w-4" /></Link>
                                            </Button>
                                            <Button variant="outline" size="icon" onClick={() => downloadQuiz(quiz)}><Download className="h-4 w-4" /></Button>
                                            <Button size="icon" onClick={() => handlePlayQuiz(quiz)}><Play className="h-4 w-4" /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </>
    );
}
