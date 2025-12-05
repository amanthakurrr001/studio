'use server';

/**
 * @fileOverview A flow to validate AI-generated questions with a given source.
 *
 * - validateGeneratedQuestions - A function that validates generated questions.
 * - ValidateGeneratedQuestionsInput - The input type for the validateGeneratedQuestions function.
 * - ValidateGeneratedQuestionsOutput - The return type for the validateGeneratedQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidateGeneratedQuestionsInputSchema = z.object({
  questions: z.array(z.string()).describe('The AI-generated questions to validate.'),
  source: z.string().describe('The source document to validate the questions against.'),
});
export type ValidateGeneratedQuestionsInput = z.infer<typeof ValidateGeneratedQuestionsInputSchema>;

const ValidateGeneratedQuestionsOutputSchema = z.object({
  validatedQuestions: z.array(z.string()).describe('The validated questions.'),
});
export type ValidateGeneratedQuestionsOutput = z.infer<typeof ValidateGeneratedQuestionsOutputSchema>;

export async function validateGeneratedQuestions(
  input: ValidateGeneratedQuestionsInput
): Promise<ValidateGeneratedQuestionsOutput> {
  return validateGeneratedQuestionsFlow(input);
}

const validateGeneratedQuestionsPrompt = ai.definePrompt({
  name: 'validateGeneratedQuestionsPrompt',
  input: {schema: ValidateGeneratedQuestionsInputSchema},
  output: {schema: ValidateGeneratedQuestionsOutputSchema},
  prompt: `You are an expert quiz validator. You are given a list of questions and a source document. Your task is to validate each question against the source document and return only the questions which are relevant and can be answered from the provided source.

Source Document: {{{source}}}

Questions: {{#each questions}}{{{this}}}\n{{/each}}`,
});

const validateGeneratedQuestionsFlow = ai.defineFlow(
  {
    name: 'validateGeneratedQuestionsFlow',
    inputSchema: ValidateGeneratedQuestionsInputSchema,
    outputSchema: ValidateGeneratedQuestionsOutputSchema,
  },
  async input => {
    const {output} = await validateGeneratedQuestionsPrompt(input);
    return output!;
  }
);
