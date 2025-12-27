# AI Chatbot with Knowledge Base

A full-stack AI chatbot application that uses OpenAI's GPT models to answer questions based on a local knowledge base. Built with React frontend and Node.js/Express backend.

## Features

- 🤖 OpenAI GPT-4 powered responses
- 📚 Local knowledge base integration (reads .txt and .md files)
- 💬 Beautiful, modern chat interface
- 🔄 Conversation history management
- ⚡ Real-time streaming responses
- 🎨 Responsive gradient UI design

## Project Structure

```
Chat bot - V2/
├── backend/
│   ├── app/                    # Application logic
│   ├── knowledge_base/         # Your knowledge base files (.txt, .md)
│   ├── server.js              # Express server
│   ├── package.json
│   └── .env                   # Environment variables
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Main React component
│   │   ├── App.css           # Styles
│   │   ├── main.jsx          # React entry point
│   │   └── index.css         # Global styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### 1. Backend Setup

```bash
cd backend
npm install
```

Configure your OpenAI API key in `.env`:
```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000
```

Add knowledge base files to `backend/knowledge_base/`:
- Create `.txt` or `.md` files with information you want the chatbot to know
- The chatbot will automatically load and use this content

Start the backend server:
```bash
npm run dev
```

The server will run on http://localhost:5000

### 2. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on http://localhost:3000

## Usage

1. Open http://localhost:3000 in your browser
2. Start chatting! Ask questions related to your knowledge base
3. The AI will answer based on the content in your knowledge base files

## Example Questions

Based on the sample knowledge base provided:

- "What are your business hours?"
- "What services do you offer?"
- "How can I contact support?"
- "What are your pricing plans?"
- "Where is your company located?"

## Adding Custom Knowledge

1. Navigate to `backend/knowledge_base/`
2. Create new `.txt` or `.md` files with your content
3. Restart the backend server
4. The chatbot will now have access to your new information

## API Endpoints

### Backend API

- `POST /api/chat` - Send a message to the chatbot
  ```json
  {
    "message": "Your question here",
    "conversationHistory": []
  }
  ```

- `GET /api/health` - Health check endpoint
- `GET /api/knowledge-base` - List available knowledge base files

## Configuration

### Backend Environment Variables

- `OPENAI_API_KEY` - Your OpenAI API key (required)
- `PORT` - Server port (default: 5000)

### Frontend Configuration

The frontend is configured to proxy API requests to `http://localhost:5000`. To change this, edit `vite.config.js`.

## Customization

### Change AI Model

Edit `backend/server.js` and modify the model parameter:

```javascript
const completion = await openai.chat.completions.create({
  model: 'gpt-4o',  // Change to gpt-4o, gpt-4-turbo, etc.
  // ...
});
```

### Modify Chat Behavior

Edit the system message in `backend/server.js`:

```javascript
const systemMessage = {
  role: 'system',
  content: `Your custom instructions here...`
};
```

### Style Customization

Modify `frontend/src/App.css` to change colors, fonts, and layout.

## Troubleshooting

### "Failed to process chat request"

- Check that your OpenAI API key is correctly set in `backend/.env`
- Verify you have credits in your OpenAI account
- Check the backend console for detailed error messages

### Connection Errors

- Ensure both backend (port 5000) and frontend (port 3000) are running
- Check that no firewall is blocking the ports
- Verify the API URL in `frontend/src/App.jsx`

### Knowledge Base Not Loading

- Check that files are in `backend/knowledge_base/` directory
- Ensure files have `.txt` or `.md` extensions
- Restart the backend server after adding new files

## Building for Production

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## Technologies Used

- **Frontend**: React, Vite, Axios
- **Backend**: Node.js, Express, OpenAI API
- **Styling**: CSS3 with gradients and animations

## License

MIT

## Contributing

Feel free to submit issues and enhancement requests!

## Support

For issues and questions:
- Check the troubleshooting section
- Review OpenAI API documentation: https://platform.openai.com/docs
- Create an issue in the repository

---

Built with ❤️ using OpenAI's GPT models
