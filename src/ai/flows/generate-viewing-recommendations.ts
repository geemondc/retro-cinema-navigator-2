// src/ai/flows/generate-viewing-recommendations.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating personalized video recommendations based on user viewing history.
 *
 * - generateViewingRecommendations - A function that takes user viewing history as input and returns a list of recommended videos.
 * - GenerateViewingRecommendationsInput - The input type for the generateViewingRecommendations function.
 * - GenerateViewingRecommendationsOutput - The return type for the generateViewingRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateViewingRecommendationsInputSchema = z.object({
  viewingHistory: z
    .array(z.string())
    .describe('An array of video URLs representing the user viewing history.'),
  numberOfRecommendations: z
    .number()
    .default(5)
    .describe('The number of video recommendations to generate.'),
});
export type GenerateViewingRecommendationsInput = z.infer<
  typeof GenerateViewingRecommendationsInputSchema
>;

const GenerateViewingRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('An array of recommended video URLs.'),
});
export type GenerateViewingRecommendationsOutput = z.infer<
  typeof GenerateViewingRecommendationsOutputSchema
>;

export async function generateViewingRecommendations(
  input: GenerateViewingRecommendationsInput
): Promise<GenerateViewingRecommendationsOutput> {
  return generateViewingRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateViewingRecommendationsPrompt',
  input: {schema: GenerateViewingRecommendationsInputSchema},
  output: {schema: GenerateViewingRecommendationsOutputSchema},
  prompt: `You are a video recommendation expert. Given a user's viewing history, you will recommend new videos that the user might enjoy.

Viewing History: {{viewingHistory}}

Please provide {{numberOfRecommendations}} video recommendations as an array of URLs. The recommendations should be tailored to the user's viewing history. Try to provide a variety of recommendations and don't just provide different URLs for the same video.

Ensure that the output is a valid JSON array of strings.`, 
});

const generateViewingRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateViewingRecommendationsFlow',
    inputSchema: GenerateViewingRecommendationsInputSchema,
    outputSchema: GenerateViewingRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
