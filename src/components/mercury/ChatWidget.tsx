'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguageStore } from '@/stores/language-store';
import { getDictionary } from '@/lib/i18n';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  id: string;
}

export default function ChatWidget() {
  const { locale, dir } = useLanguageStore();
  const dict = getDictionary(locale);
  const t = dict.chatbot;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input when chat opens, return focus to toggle button when it closes
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    } else {
      toggleButtonRef.current?.focus();
    }
  }, [isOpen]);

  // Show welcome message on first open
  useEffect(() => {
    if (isOpen && !hasShownWelcome) {
      setHasShownWelcome(true);
      setMessages([
        {
          role: 'assistant',
          content: t.welcome,
          id: `welcome-${Date.now()}`,
        },
      ]);
    }
  }, [isOpen, hasShownWelcome, t.welcome]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMessage: ChatMessage = {
        role: 'user',
        content: text.trim(),
        id: `user-${Date.now()}`,
      };

      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInput('');
      setIsLoading(true);

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: updatedMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        const data = await res.json();

        if (data.success && data.response) {
          const aiMessage: ChatMessage = {
            role: 'assistant',
            content: data.response,
            id: `ai-${Date.now()}`,
          };
          setMessages((prev) => [...prev, aiMessage]);
        } else {
          const errorMsg: ChatMessage = {
            role: 'assistant',
            content: t.error,
            id: `err-${Date.now()}`,
          };
          setMessages((prev) => [...prev, errorMsg]);
        }
      } catch {
        const errorMsg: ChatMessage = {
          role: 'assistant',
          content: t.error,
          id: `err-${Date.now()}`,
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setIsLoading(false);
        inputRef.current?.focus();
      }
    },
    [messages, isLoading, t.error]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestedQuestion = (question: string) => {
    sendMessage(question);
  };

  const isUserMsg = (role: string) => {
    if (dir === 'rtl') return role === 'assistant';
    return role === 'user';
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={
              'flex flex-col overflow-hidden rounded-2xl border border-border shadow-xl'
            }
            role="dialog"
            aria-label="Chat with Mercury GP product advisor"
            aria-modal="true"
            style={{
              width: 'min(100vw - 3rem, 400px)',
              height: 'min(70vh, 560px)',
              maxHeight: '560px',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between border-b border-border bg-card px-4 py-3"
              onKeyDown={(e) => {
                if (e.key === 'Escape') setIsOpen(false);
              }}
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-mercury-gold/15">
                  <Bot className="h-4.5 w-4.5 text-mercury-gold-dark" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {t.title}
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    {t.welcomeTitle}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages area */}
            <div
              className="flex-1 overflow-y-auto bg-background px-4 py-3"
              dir={dir}
            >
              <div className="flex flex-col gap-3">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start gap-2 ${
                      isUserMsg(msg.role) ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                        msg.role === 'user'
                          ? 'bg-mercury-gold text-white'
                          : 'bg-mercury-gold/15 text-mercury-gold-dark'
                      }`}
                    >
                      {msg.role === 'user' ? (
                        <User className="h-3.5 w-3.5" />
                      ) : (
                        <Bot className="h-3.5 w-3.5" />
                      )}
                    </div>
                    <div
                      className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-mercury-gold text-white rounded-br-sm'
                          : 'bg-muted text-foreground rounded-bl-sm'
                      }`}
                      lang={locale === 'en' ? 'en' : 'fa'}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2"
                  >
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mercury-gold/15 text-mercury-gold-dark">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                    <div className="rounded-2xl rounded-bl-sm bg-muted px-4 py-3 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-mercury-gold [animation-delay:0ms]" />
                        <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-mercury-gold [animation-delay:150ms]" />
                        <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-mercury-gold [animation-delay:300ms]" />
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Suggested questions - show only when first opened with no user messages */}
                {messages.length === 1 &&
                  messages[0].role === 'assistant' &&
                  !isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex flex-wrap gap-2 pt-1"
                    >
                      {t.suggestedQuestions.map((q) => (
                        <button
                          key={q}
                          onClick={() => handleSuggestedQuestion(q)}
                          className="rounded-full border border-mercury-gold/30 bg-mercury-warm px-3 py-1.5 text-xs text-foreground transition-colors hover:border-mercury-gold hover:bg-mercury-gold/10"
                        >
                          {q}
                        </button>
                      ))}
                    </motion.div>
                  )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input area */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-border bg-card px-3 py-2.5"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.placeholder}
                aria-label={t.placeholder}
                disabled={isLoading}
                className="flex-1 rounded-xl border border-input bg-background px-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-mercury-gold focus:outline-none focus:ring-1 focus:ring-mercury-gold/50 disabled:opacity-50"
                dir={dir}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="h-9 w-9 shrink-0 rounded-xl bg-mercury-gold text-white hover:bg-mercury-gold-dark disabled:opacity-40"
                aria-label={t.send}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating toggle button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          ref={toggleButtonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full bg-mercury-gold text-white shadow-lg hover:bg-mercury-gold-dark"
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <MessageCircle className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>
    </div>
  );
}
