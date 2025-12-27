# Chatbot Backend

Backend server for AI-powered chatbot with local knowledge base integration.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   - Copy `.env` file and add your OpenAI API key
   - Get your API key from: https://platform.openai.com/api-keys

3. Add knowledge base files:
   - Place `.txt` or `.md` files in the `knowledge_base/` directory
   - The chatbot will use these files to answer questions

4. Run the server:
```bash
npm run dev
```

## API Endpoints

- `POST /api/chat` - Send a message to the chatbot
- `GET /api/health` - Health check
- `GET /api/knowledge-base` - List knowledge base files

## Example Request

```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What are your business hours?"}'
```
