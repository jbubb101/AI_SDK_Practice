'use client';
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function Page() {
  const { messages, sendMessage } = useChat({api: '/chat' }); // uses /api/chat
  const [input, setInput] = useState('');

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto gap-4">
      {messages.map(m => (
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
          onChange={(e) => setInput(e.currentTarget.value)}
          placeholder="Say something…"
        />
      </form>
    </div>
  );
}
