'use server';

/**
 * @fileOverview A smart contract analysis AI agent.
 *
 * - analyzeContract - A function that handles the contract analysis process.
 * - SmartContractAnalysisInput - The input type for the analyzeContract function.
 * - SmartContractAnalysisOutput - The return type for the analyzeContract function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartContractAnalysisInputSchema = z.object({
  contractDataUri: z
    .string()
    .describe(
      "A vendor contract document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SmartContractAnalysisInput = z.infer<typeof SmartContractAnalysisInputSchema>;

const SmartContractAnalysisOutputSchema = z.object({
  riskAssessment: z.string().describe('An assessment of potential risks in the contract.'),
  optimizationSuggestions: z.string().describe('Suggestions for optimizing the contract terms.'),
});
export type SmartContractAnalysisOutput = z.infer<typeof SmartContractAnalysisOutputSchema>;

export async function analyzeContract(input: SmartContractAnalysisInput): Promise<SmartContractAnalysisOutput> {
  return smartContractAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartContractAnalysisPrompt',
  input: {schema: SmartContractAnalysisInputSchema},
  output: {schema: SmartContractAnalysisOutputSchema},
  prompt: `You are an AI expert in contract law. Analyze the contract and provide a risk assessment and optimization suggestions.

Contract: {{media url=contractDataUri}}`,
});

const smartContractAnalysisFlow = ai.defineFlow(
  {
    name: 'smartContractAnalysisFlow',
    inputSchema: SmartContractAnalysisInputSchema,
    outputSchema: SmartContractAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
