'use server';

import {
  generateViewingRecommendations,
  type GenerateViewingRecommendationsInput,
} from '@/ai/flows/generate-viewing-recommendations';

export async function getAIRecommendations(
  input: GenerateViewingRecommendationsInput
) {
  try {
    const result = await generateViewingRecommendations(input);
    if (!result || !result.recommendations) {
        return { error: 'Failed to get recommendations.' };
    }
    return { recommendations: result.recommendations };
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return { error: 'An unexpected error occurred while fetching recommendations.' };
  }
}
