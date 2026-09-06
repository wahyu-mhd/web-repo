'use client';
import { useRef, useState } from 'react';
export function CopyCode({ children }: { children: React.ReactNode }) {
  const pre = useRef<HTMLPreElement>(null);
  const [message, setMessage] = useState('Copy');
  return (
    <div className="code-block">
      <button
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(pre.current?.innerText ?? '');
            setMessage('Copied');
          } catch {
            setMessage('Select code to copy');
          }
        }}
        aria-label="Copy code"
      >
        <span role="status">{message}</span>
      </button>
      <pre ref={pre} tabIndex={0}>
        {children}
      </pre>
    </div>
  );
}
