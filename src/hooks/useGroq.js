import { useState } from 'react';
import Groq from 'groq-sdk';
import { GROQ_MODEL } from '../config';
import { SYSTEM_PROMPT } from '../utils/prompt';

export function useGroq(apiKey) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState('');

  async function processTranscript(transcript) {
    if (!apiKey) {
      setError('Please enter your Groq API key above before processing.');
      return;
    }

    const groq = new Groq({ apiKey, dangerouslyAllowBrowser: true });

    setLoading(true);
    setError(null);
    setResult('');

    try {
      const stream = await groq.chat.completions.create({
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: transcript },
        ],
        stream: true,
      });

      let accumulated = '';
      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta?.content ?? '';
        accumulated += delta;
        setResult(accumulated);
      }
    } catch (err) {
      if (err.status === 429) {
        setError('Rate limit reached. Please wait a moment and try again.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  return { processTranscript, loading, error, result };
}
