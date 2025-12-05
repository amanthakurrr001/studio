import { config } from 'dotenv';
config();

import '@/ai/flows/validate-generated-questions.ts';
import '@/ai/flows/generate-quiz-from-topic.ts';