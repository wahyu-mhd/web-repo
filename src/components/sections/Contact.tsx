'use client';
import { useState } from 'react';
import { ArrowUpRight, Send } from 'lucide-react';
import { sendContactEmail } from '@/app/actions/contact';
import { profile } from '@/data/profile';
export function Contact() {
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [copied, setCopied] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const result = await sendContactEmail({
        name: String(data.get('name')),
        email: String(data.get('email')),
        message: String(data.get('message')),
      });
      if (result.error) setStatus('error');
      else {
        setStatus('success');
        form.reset();
      }
    } catch {
      setStatus('error');
    }
  }
  return (
    <section id="contact" className="section-space contact-section">
      <div>
        <p className="eyebrow">05 / SAY HELLO</p>
        <h2>
          Good things start
          <br />
          <em>with a conversation.</em>
        </h2>
        <p>
          Get in touch about internships, engineering,
          <br />
          or a project we could work on together.
        </p>
        <a className="contact-email" href={`mailto:${profile.email}`}>
          {profile.email} <ArrowUpRight size={18} />
        </a>
        <button
          className="copy-email"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(profile.email);
              setCopied(true);
            } catch {
              setCopied(false);
            }
          }}
        >
          {copied ? 'Email copied' : 'Copy email address'}
        </button>
      </div>
      <form onSubmit={submit} className="contact-form">
        <div className="form-pair">
          <label htmlFor="name">
            Your name
            <input
              id="name"
              name="name"
              autoComplete="name"
              maxLength={100}
              required
            />
          </label>
          <label htmlFor="email">
            Email address
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              required
            />
          </label>
        </div>
        <label htmlFor="message">
          What’s on your mind?
          <textarea
            id="message"
            name="message"
            maxLength={10000}
            required
            rows={4}
          />
        </label>
        <div className="form-bottom">
          <span className="form-status" role="status">
            {status === 'success'
              ? 'Thanks! Your message has been sent.'
              : status === 'error'
                ? 'Could not send. Please try again or email me directly.'
                : ''}
          </span>
          <button className="button-primary" disabled={status === 'loading'}>
            {status === 'loading' ? 'Sending…' : 'Send message'}
            <Send size={15} />
          </button>
        </div>
      </form>
    </section>
  );
}
