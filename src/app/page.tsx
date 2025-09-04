'use client';


import { useChat } from '@ai-sdk/react';
import { useMemo, useState } from 'react';

export default function Page() {
  const [mode, setMode] = useState<'chat' | 'research'>('chat');

  const api = useMemo(
    () => (mode === 'research' ? '/api/researh' : '/api/chat'),
    [mode]
  );
  
  const { messages, sendMessage } = useChat({ api }); // uses /api/chat
  const [input, setInput] = useState('');

  return (
      <div className="flex flex-col w-full max-w-md py-24 mx-auto gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm">Mode:</label>
          <button
            className="px-3 py-1 rounded border"
            onClick={() => setMode(m => (m === 'chat' ? 'research' : 'chat'))}
            title="Toggle research mode"
          >
            {mode}
          </button>
        </div>

        {messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap">
            <b>{m.role === 'user' ? 'You' : 'AI'}:</b>{' '}
            {m.parts.map((p, i) => (p.type === 'text' ? <span key={i}>{p.text}</span> : null))}
          </div>
        ))}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!input.trim()) return;
            sendMessage({ text: input });
            setInput('');
          }}
        >
          <input
            className="w-full p-2 border rounded"
            value={input}
            placeholder={mode === 'research'
              ? 'Ask a complex, sourced question…'
              : 'Chat…'}
            onChange={(e) => setInput(e.currentTarget.value)}
          />
        </form>
      </div>
    );
  }