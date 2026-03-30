/**
 * Service to interact with Azure OpenAI Service
 */

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatCompletionOptions {
  temperature?: number;
  max_tokens?: number;
  response_format?: { type: 'json_object' | 'text' };
}

class AzureOpenAIService {
  private endpoint: string;
  private apiKey: string;
  private deployment: string;
  private apiVersion: string;

  constructor() {
    this.endpoint = import.meta.env.VITE_AZURE_OPENAI_ENDPOINT || '';
    this.apiKey = import.meta.env.VITE_AZURE_OPENAI_API_KEY || '';
    this.deployment = import.meta.env.VITE_AZURE_OPENAI_DEPLOYMENT || 'gpt-4o';
    this.apiVersion = import.meta.env.VITE_AZURE_OPENAI_DEPLOYMENT_VERSION || '2024-02-15-preview';
  }

  async chatCompletion(messages: ChatMessage[], options: ChatCompletionOptions = {}) {
    if (!this.apiKey || !this.endpoint) {
      throw new Error('Azure OpenAI credentials not configured in .env');
    }

    const url = `${this.endpoint}/openai/deployments/${this.deployment}/chat/completions?api-version=${this.apiVersion}`;

    const body = {
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.max_tokens ?? 2000,
      response_format: options.response_format,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': this.apiKey,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Error calling Azure OpenAI');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }
}

export const azureAI = new AzureOpenAIService();
