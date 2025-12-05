'use server';

/**
 * @fileOverview Generates a quiz from a given topic and specifications (number of questions, difficulty).
 *
 * - generateQuizFromTopic - A function that generates a quiz from a topic.
 * - GenerateQuizFromTopicInput - The input type for the generateQuizFromTopic function.
 * - GenerateQuizFromTopicOutput - The return type for the generateQuizFromTopic function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

const GenerateQuizFromTopicInputSchema = z.object({
  topic: z.string().describe('The topic of the quiz.'),
  numQuestions: z.number().describe('The number of questions in the quiz.'),
  difficulty: z.string().describe('The difficulty level of the quiz (e.g., easy, medium, hard).'),
});

export type GenerateQuizFromTopicInput = z.infer<typeof GenerateQuizFromTopicInputSchema>;

const QuizQuestionSchema = z.object({
  question: z.string().describe('The text of the question.'),
  options: z.array(z.string()).describe('The possible answer options for the question.'),
  correctAnswer: z.string().describe('The correct answer to the question.'),
});

const GenerateQuizFromTopicOutputSchema = z.object({
  quiz: z.array(QuizQuestionSchema).describe('The generated quiz questions.'),
});

export type GenerateQuizFromTopicOutput = z.infer<typeof GenerateQuizFromTopicOutputSchema>;

export async function generateQuizFromTopic(input: GenerateQuizFromTopicInput): Promise<GenerateQuizFromTopicOutput> {
  return generateQuizFromTopicFlow(input);
}

const generateQuizPrompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  input: {schema: GenerateQuizFromTopicInputSchema},
  output: {schema: GenerateQuizFromTopicOutputSchema},
  prompt: `You are a quiz generator. Generate a quiz with the following specifications:\n\nTopic: {{{topic}}}\nNumber of Questions: {{{numQuestions}}}\nDifficulty: {{{difficulty}}}\n\nThe quiz should be in JSON format, with an array of questions. Each question should have the following format:\n\n{\n  "question": "The text of the question.",\n  "options": ["Option 1", "Option 2", "Option 3", "Option 4"],\n  "correctAnswer": "The correct answer to the question."\n}\n\nEnsure that the correct answer is one of the options provided. Make sure options are distinct.  Do not include any intro or outro text, just the JSON.
\nHere is an example:\n\n[{\n  "question": "What is the capital of France?",\n  "options": ["Paris", "London", "Berlin", "Rome"],\n  "correctAnswer": "Paris"\n}]`,
});

const generateQuizFromTopicFlow = ai.defineFlow(
  {
    name: 'generateQuizFromTopicFlow',
    inputSchema: GenerateQuizFromTopicInputSchema,
    outputSchema: GenerateQuizFromTopicOutputSchema,
  },
  async input => {
    const {output} = await generateQuizPrompt({
        ...input,
    }, {
        model: googleAI.model('gemini-1.5-flash-latest'),
    });
    return output!;
  }
);
