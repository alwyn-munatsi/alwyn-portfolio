import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173'] }))
app.use(express.json())

app.post('/api/chat', async (req, res) => {
  const { messages, system } = req.body

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured in .env file' })
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        system,
        messages,
      }),
    })

    const data = await response.json()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Failed to reach Anthropic API', detail: err.message })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`))
