# 🎨 AI Poster Prompt Gallery

A full-stack MERN application designed to curate, explore, and visualize generative AI prompts for stunning poster art. See the before and after transformations bridging the gap between original concepts and AI-generated masterpieces.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg)](https://im-prompt.vercel.app/)
[![Backend Status](https://img.shields.io/badge/API-Render-blue.svg)](https://im-prompt.onrender.com/health)

## ✨ Features

- **Trend Exploration:** Browse curated categories of popular design trends (Festival, Typography, Abstract, etc.).
- **Before & After Comparison:** Click any poster to open an animated modal comparing the final AI-generated image with the original source or seed image (when available).
- **One-Click Copy:** Seamlessly copy complex AI prompts to your clipboard with visual feedback.
- **Persistent Likes:** Show love to your favorite prompts. Engagement metrics are persisted to the database and your local browser.
- **Beautiful UI:** Dark-mode first design built with Tailwind CSS, featuring glassmorphism elements, gradients, and Framer Motion micro-interactions.
- **Perceived Performance:** Smooth skeleton loaders replace traditional spinners to keep the layout stable during API requests.

---

## 🚀 Live Links

- **Frontend:** [https://im-prompt.vercel.app/](https://im-prompt.vercel.app/)
- **Backend API:** [https://im-prompt.onrender.com/api/trends](https://im-prompt.onrender.com/api/trends)

---

## 🛠️ Tech Stack

**Frontend:**
- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS v3](https://tailwindcss.com/)
- [React Router v6](https://reactrouter.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Hot Toast](https://react-hot-toast.com/)

**Backend:**
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/)
- [Express Rate Limit](https://www.npmjs.com/package/express-rate-limit)

---

## 💻 Local Development

Follow these steps to run the application locally.

### Prerequisites
- Node.js (v18+)
- MongoDB (Local instance or MongoDB Atlas cluster)

### 1. Clone the repository
```bash
git clone https://github.com/sambhavvoswal/im-prompt.git
cd im-prompt
```

### 2. Install Dependencies
Install dependencies for both the root workspace, client, and server:
```bash
npm install
cd client && npm install
cd ../server && npm install
cd ..
```

### 3. Environment Variables
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Create a `.env` file in the `client` directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 4. Seed the Database
Populate your local MongoDB with curated initial data:
```bash
cd server
node data/seed.js
cd ..
```

### 5. Start the Application
Run both the frontend and backend concurrently from the root directory:
```bash
npm run dev
```
- Client runs on: `http://localhost:5173`
- Server API runs on: `http://localhost:5000`

---

## 📡 API Endpoints

### Trends
- `GET /api/trends` - Fetch all trend categories.
- `GET /api/trends/:slug` - Fetch a specific trend by slug.

### Posters
- `GET /api/posters` - Fetch all posters (supports `?trendId=` query).
- `GET /api/posters/trending` - Fetch top posters by engagement.
- `POST /api/posters/:id/copy` - Increment the copy count for a poster.
- `POST /api/posters/:id/like` - Increment the like count for a poster.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/sambhavvoswal/im-prompt/issues).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
