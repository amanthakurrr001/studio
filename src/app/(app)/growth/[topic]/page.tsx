import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart"
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const chartData = [
  { date: "2024-05-01", score: 6 },
  { date: "2024-05-15", score: 7 },
  { date: "2024-06-01", score: 5 },
  { date: "2024-06-18", score: 8 },
  { date: "2024-07-10", score: 8 },
  { date: "2024-07-28", score: 9 },
]

const chartConfig = {
  score: {
    label: "Score",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export default function GrowthPage({ params }: { params: { topic: string } }) {
    const topicName = decodeURIComponent(params.topic).replace(/-/g, ' ');

    return (
        <>
            <div className="flex items-center gap-4 mb-8">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/history">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back to History</span>
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold font-headline capitalize">{topicName}</h1>
                    <p className="text-muted-foreground">Your performance trend over time.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Score History</CardTitle>
                    <CardDescription>This chart shows your scores for quizzes on "{topicName}".</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                        <LineChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12, top: 10, bottom: 10 }}>
                            <CartesianGrid vertical={false} />
                            <YAxis domain={[0, 10]} tickLine={false} axisLine={false} tickMargin={8} />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={10}
                                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="line" />}
                            />
                            <Line
                                dataKey="score"
                                type="monotone"
                                stroke="var(--color-score)"
                                strokeWidth={3}
                                dot={{ fill: "var(--color-score)", r: 5 }}
                            />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </>
    );
}
