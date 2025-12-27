import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Load knowledge base
async function loadKnowledgeBase() {
  const knowledgeBasePath = path.join(__dirname, 'knowledge_base');
  try {
    const files = await fs.readdir(knowledgeBasePath);
    let knowledgeContent = '';

    for (const file of files) {
      if (file.endsWith('.txt') || file.endsWith('.md')) {
        const filePath = path.join(knowledgeBasePath, file);
        const content = await fs.readFile(filePath, 'utf-8');
        knowledgeContent += `\n\n--- ${file} ---\n${content}`;
      }
    }

    return knowledgeContent;
  } catch (error) {
    console.warn('Knowledge base directory not found or empty:', error.message);
    return '';
  }
}

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Load knowledge base
    const knowledgeBase = await loadKnowledgeBase();

    // Prepare system message with knowledge base
    const systemMessage = {
      role: 'system',
      content: `You are a helpful AI assistant. Use the following knowledge base to answer questions accurately. If the answer is not in the knowledge base, say so clearly.

KNOWLEDGE BASE:
${knowledgeBase || 'No knowledge base content available.'}

Answer questions based on the knowledge base above. Be concise and accurate.`,
    };

    // Build messages array
    const messages = [systemMessage, ...conversationHistory, { role: 'user', content: message }];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000,
    });

    const assistantMessage = completion.choices[0].message.content;

    res.json({
      response: assistantMessage,
      usage: completion.usage,
    });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({
      error: 'Failed to process chat request',
      details: error.message,
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Get knowledge base files list
app.get('/api/knowledge-base', async (req, res) => {
  try {
    const knowledgeBasePath = path.join(__dirname, 'knowledge_base');
    const files = await fs.readdir(knowledgeBasePath);
    const textFiles = files.filter(file => file.endsWith('.txt') || file.endsWith('.md'));
    res.json({ files: textFiles });
  } catch (error) {
    res.json({ files: [] });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
