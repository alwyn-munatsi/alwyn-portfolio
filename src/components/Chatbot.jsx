import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Loader2, Minimize2 } from 'lucide-react'
import { chatbotContext } from '../data/portfolio'

const WELCOME = "Hi! I'm Alwyn's AI assistant 👋 Ask me anything about his experience, skills, projects, or availability. I'm here to help!"

export default function Chatbot() {
  const [open, setOpen]         = useState(false)
  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: WELCOME }
  ])
  const bottomRef = useRef(null)
  const inputRef  = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  async function send(overrideText) {
    const text = (overrideText ?? input).trim()
    if (!text || loading) return
    setInput('')

    const userMsg = { role: 'user', content: text }
    const history = [...messages, userMsg]
    setMessages(history)
    setLoading(true)

    const apiKey = import.meta.env.VITE_GROQ_API_KEY

    if (!apiKey) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '⚠️ No API key found. Please add VITE_GROQ_API_KEY to your .env file and restart the dev server.',
      }])
      setLoading(false)
      return
    }

    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          max_tokens: 500,
          messages: [
            { role: 'system', content: chatbotContext },
            ...history
              .filter(m => !(m.role === 'assistant' && m.content === WELCOME))
              .map(m => ({ role: m.role, content: m.content })),
          ],
        }),
      })

      const data = await res.json()

      if (data.error) throw new Error(data.error.message)

      const reply = data?.choices?.[0]?.message?.content || "Sorry, I couldn't get a response. Please try again."
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `❌ Error: ${err.message}. Check your VITE_GROQ_API_KEY in the .env file.`,
      }])
    } finally {
      setLoading(false)
    }
  }

  function onKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  const suggestions = [
    "What is Alwyn's current role?",
    "What are his top skills?",
    "Tell me about his projects",
    "Is he open to work?",
  ]

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
        style={{ background: '#38bdf8' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={open ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <MessageCircle size={24} style={{ color: '#060b14' }} />
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ border: '2px solid #38bdf8' }}
          animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
        />
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-6 right-6 z-50 flex flex-col rounded-2xl overflow-hidden shadow-2xl"
            style={{
              width: 'min(380px, calc(100vw - 24px))',
              height: 'min(580px, calc(100vh - 100px))',
              background: '#060b14',
              border: '0.5px solid #0f1e35',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 flex-shrink-0"
              style={{ background: '#0a1522', borderBottom: '0.5px solid #0f1e35' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(56,189,248,0.15)', border: '0.5px solid rgba(56,189,248,0.3)' }}
                >
                  <Bot size={18} style={{ color: '#38bdf8' }} />
                </div>
                <div>
                  <p className="font-syne font-bold text-sm" style={{ color: '#c8d8f0' }}>
                    Ask Alwyn's AI
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    <span className="text-xs" style={{ color: '#3a5a7a' }}>Powered by Groq · Free</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setMessages([{ role: 'assistant', content: WELCOME }])}
                  className="p-1.5 rounded-lg transition-colors"
                  style={{ color: '#3a5a7a' }}
                  title="Clear chat"
                >
                  <Minimize2 size={15} />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg transition-colors"
                  style={{ color: '#3a5a7a' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#c8d8f0'}
                  onMouseLeave={e => e.currentTarget.style.color = '#3a5a7a'}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-2.5 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: m.role === 'assistant'
                        ? 'rgba(56,189,248,0.12)'
                        : 'rgba(129,140,248,0.12)',
                    }}
                  >
                    {m.role === 'assistant'
                      ? <Bot size={13} style={{ color: '#38bdf8' }} />
                      : <User size={13} style={{ color: '#818cf8' }} />
                    }
                  </div>
                  <div
                    className="max-w-[80%] px-3.5 py-2.5 rounded-xl text-xs leading-relaxed"
                    style={m.role === 'assistant'
                      ? { background: '#0a1522', color: '#c8d8f0', border: '0.5px solid #0f1e35' }
                      : { background: 'rgba(56,189,248,0.12)', color: '#c8d8f0', border: '0.5px solid rgba(56,189,248,0.2)' }
                    }
                  >
                    {m.content}
                  </div>
                </motion.div>
              ))}

              {/* Loading dots */}
              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2.5">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(56,189,248,0.12)' }}
                  >
                    <Bot size={13} style={{ color: '#38bdf8' }} />
                  </div>
                  <div
                    className="px-3.5 py-3 rounded-xl flex items-center gap-1.5"
                    style={{ background: '#0a1522', border: '0.5px solid #0f1e35' }}
                  >
                    {[0, 1, 2].map(i => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: '#38bdf8' }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Suggestion chips */}
              {messages.length === 1 && !loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col gap-2 pt-2"
                >
                  <p className="text-xs" style={{ color: '#1a3050' }}>Try asking:</p>
                  {suggestions.map(s => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="text-left text-xs px-3 py-2 rounded-lg transition-all"
                      style={{ background: 'rgba(56,189,248,0.04)', border: '0.5px solid #0f1e35', color: '#3a5a7a' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(56,189,248,0.3)'; e.currentTarget.style.color = '#38bdf8' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#0f1e35'; e.currentTarget.style.color = '#3a5a7a' }}
                    >
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div
              className="px-4 py-3 flex-shrink-0"
              style={{ borderTop: '0.5px solid #0f1e35', background: '#0a1522' }}
            >
              <div
                className="flex items-end gap-2 rounded-xl px-3 py-2"
                style={{ background: '#060b14', border: '0.5px solid #0f1e35' }}
              >
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={onKey}
                  placeholder="Ask about Alwyn..."
                  className="flex-1 bg-transparent text-xs resize-none outline-none leading-relaxed"
                  style={{ color: '#c8d8f0', maxHeight: 80, fontFamily: 'Figtree, sans-serif' }}
                  onInput={e => {
                    e.target.style.height = 'auto'
                    e.target.style.height = e.target.scrollHeight + 'px'
                  }}
                />
                <button
                  onClick={() => send()}
                  disabled={!input.trim() || loading}
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                  style={{
                    background: input.trim() && !loading ? '#38bdf8' : '#0f1e35',
                    cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                  }}
                >
                  {loading
                    ? <Loader2 size={13} style={{ color: '#3a5a7a', animation: 'spin 1s linear infinite' }} />
                    : <Send size={13} style={{ color: input.trim() ? '#060b14' : '#3a5a7a' }} />
                  }
                </button>
              </div>
              <p className="text-center text-xs mt-2" style={{ color: '#1a3050' }}>
                AI may make mistakes · Always verify important details
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </>
  )
}