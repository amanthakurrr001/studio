'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Play, BarChart3 } from "lucide-react";
import Link from "next/link";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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

const quizHistory = [
    { topic: "Renaissance Art", date: "2024-07-28", lastScore: "10/10" },
    { topic: "World War II", date: "2024-07-25", lastScore: "6/10" },
    { topic: "Basics of Chemistry", date: "2024-07-22", lastScore: "9/10" },
];

export default function HistoryPage() {
    return (
        <>
            <h1 className="text-3xl font-bold font-headline mb-2">Quiz History</h1>
            <p className="text-muted-foreground mb-8">Review your past quizzes and track your performance.</p>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Recent Growth for "Renaissance Art"</CardTitle>
                    <CardDescription>Your score trend for the most recently practiced topic.</CardDescription>
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
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Topic</TableHead>
                                <TableHead>Date Created</TableHead>
                                <TableHead>Last Score</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {quizHistory.map(quiz => (
                                <TableRow key={quiz.topic}>
                                    <TableCell className="font-medium">{quiz.topic}</TableCell>
                                    <TableCell>{quiz.date}</TableCell>
                                    <TableCell>{quiz.lastScore}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="outline" size="icon" asChild>
                                            <Link href={`/growth/${encodeURIComponent(quiz.topic.toLowerCase().replace(/\s+/g, '-'))}`}><BarChart3 className="h-4 w-4" /></Link>
                                        </Button>
                                        <Button variant="outline" size="icon"><Download className="h-4 w-4" /></Button>
                                        <Button size="icon" asChild><Link href="/quiz/play"><Play className="h-4 w-4" /></Link></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
}