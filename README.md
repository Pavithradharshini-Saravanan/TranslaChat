# 🌍 TranslaChat

A real-time translation chat application with room-based conversations. Chat with anyone in your preferred language!

## ✨ Features

- 🚀 **Room-Based Chat** - Create unique rooms with shareable links (Google Meet style)
- 🌐 **Real-time Translation** - Messages automatically translated using Gemini API
- 💬 **Live Messaging** - Socket.IO powered real-time communication
- 😊 **Emoji Support** - Built-in emoji picker
- 🎨 **Modern UI** - Beautiful dark theme with purple accents (#4e184e)
- 🔗 **Easy Sharing** - Copy room links with one click

## 🛠️ Tech Stack

### Backend
- Node.js + Express
- MongoDB (Mongoose)
- Socket.IO
- Google Gemini API (translation)
- nanoid (room code generation)

### Frontend
- React
- React Router
- Socket.IO Client
- Axios

## 📦 Installation

### Prerequisites
- Node.js (v14+)
- MongoDB
- Gemini API Key

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/translachat.git
cd translachat
```

2. **Backend Setup**
```bash
cd backend
npm install

# Create .env file
echo MONGO_URI=your_mongodb_connection_string > .env
echo GEMINI_KEY=your_gemini_api_key >> .env

# Start backend
npm start
```

3. **Frontend Setup**
```bash
cd frontend
npm install

# Start frontend
npm start
```

4. **Access the app**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 🚀 Usage

1. Open http://localhost:3000
2. Enter your username and select your preferred language
3. **Create a new room** or **join an existing room** with a code
4. Share the room link with others
5. Start chatting - messages are automatically translated!

## 🌐 Supported Languages

- English 🇬🇧
- Spanish 🇪🇸
- French 🇫🇷
- Hindi 🇮🇳
- Tamil 🇮🇳
- Chinese 🇨🇳
- Japanese 🇯🇵
- German 🇩🇪
- Arabic 🇸🇦
- Portuguese 🇵🇹

## 📝 Environment Variables

### Backend (.env)
```
MONGO_URI=mongodb://localhost:27017/translachat
GEMINI_KEY=your_gemini_api_key_here
```

## 🎨 Color Theme

- Primary: `#4e184e` (Deep Purple)
- Secondary: `#7a2a7a` (Light Purple)
- Accent: `#ff6ec4` (Pink)
- Background: Black gradient

## 📄 License

MIT License - feel free to use this project for learning or personal use!

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 👨‍💻 Author

Built with ❤️ using React, Node.js, and Google Gemini AI