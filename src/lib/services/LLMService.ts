/**
 * Unified Service to interact with both standard OpenAI and Azure OpenAI
 */

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatCompletionOptions {
  temperature?: number;
  max_tokens?: number;
  response_format?: { type: 'json_object' | 'text' };
  model?: string; // Optional override for standard OpenAI
}

class UnifiedLLMService {
  private azureEndpoint: string;
  private azureApiKey: string;
  private azureDeployment: string;
  private azureApiVersion: string;
  
  private openAIApiKey: string;
  private defaultOpenAIModel: string;

  constructor() {
    // Azure OpenAI Config
    this.azureEndpoint = import.meta.env.VITE_AZURE_OPENAI_ENDPOINT || '';
    this.azureApiKey = import.meta.env.VITE_AZURE_OPENAI_API_KEY || '';
    this.azureDeployment = import.meta.env.VITE_AZURE_OPENAI_DEPLOYMENT || 'gpt-4o';
    this.azureApiVersion = import.meta.env.VITE_AZURE_OPENAI_DEPLOYMENT_VERSION || '2024-02-15-preview';

    // Standard OpenAI Config
    this.openAIApiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
    this.defaultOpenAIModel = import.meta.env.VITE_OPENAI_DEFAULT_MODEL || 'gpt-4o';
  }

  /**
   * Automatically routes the completion request based on the configured environment variables.
   * If Standard OpenAI API key is detected, it takes precedence unless only Azure is configured.
   */
  async chatCompletion(messages: ChatMessage[], options: ChatCompletionOptions = {}) {
    // Both providers share the same initial body structure
    const body: any = {
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.max_tokens ?? 2000,
      response_format: options.response_format,
    };

    let url = '';
    let headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Route logic
    if (this.openAIApiKey) {
      // Use Standard OpenAI
      url = 'https://api.openai.com/v1/chat/completions';
      headers['Authorization'] = `Bearer ${this.openAIApiKey}`;
      body.model = options.model ?? this.defaultOpenAIModel;
    } else if (this.azureApiKey && this.azureEndpoint) {
      // Use Azure OpenAI
      url = `${this.azureEndpoint}/openai/deployments/${this.azureDeployment}/chat/completions?api-version=${this.azureApiVersion}`;
      headers['api-key'] = this.azureApiKey;
    } else {
      throw new Error('No AI credentials configured. Please set VITE_OPENAI_API_KEY or VITE_AZURE_OPENAI_API_KEY in .env');
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Error calling AI provider');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }
}

export const ai = new UnifiedLLMService();
