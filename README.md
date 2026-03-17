# 🎨 im-prompt: AI Poster Prompt Gallery

[![Live Demo](https://img.shields.io/badge/Live-Demo-000000.svg?style=for-the-badge&logo=vercel)](https://im-prompt.vercel.app/)
[![API Status](https://img.shields.io/badge/API-Render-46E3B7.svg?style=for-the-badge&logo=render)](https://im-prompt.onrender.com/health)

`im-prompt` is a premium MERN stack application designed for the modern AI era. It's a curated gallery where users can explore, copy, and contribute generative AI prompts, featuring a sophisticated "Before & After" visualization system that shows the transition from seed images to final masterpieces.

---

## ✨ Key Features

### 🌟 For Users
- **Visual Storytelling:** Compare source "seed" images with final AI posters using an interactive sliding animation.
- **Prompt Engineering Hub:** One-click copy for complex prompts with visual feedback.
- **Trend Discovery:** Explore curated categories like *Festival*, *Typography*, and *Abstract*.
- **Community Contributions:** Submit your own prompt ideas via the Suggestion Modal and get credited on the live site.
- **High-End UI:** Minimalist monochrome aesthetic built with Tailwind CSS v4 and Framer Motion.

### 🛡️ For Admins
- **Content Management System:** Dedicated dashboard to manage trends and posters.
- **Smart Suggestion Triage:** Automated workflow to convert community suggestions into live posters with one click.
- **Data Integrity:** Cascading deletes for trends with automatic JSON backups of associated prompt data.
- **Performance Monitoring:** Integrated keep-alive system to prevent server sleep on free-tier hosting.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS v4, Framer Motion, React Router v7.
- **Backend:** Node.js, Express.js, MongoDB Atlas (Mongoose).
- **Security:** JWT Authentication, Express Rate Limit.
- **Analytics:** Google Analytics 4 integration.

---

## 🚀 Local Development

### 1. Requirements
- Node.js (v18+)
- MongoDB (Atlas or Local)

### 2. Setup
```bash
# Clone and enter
git clone https://github.com/sambhavvoswal/im-prompt.git
cd im-prompt

# Install all dependencies (Root, Client, Server)
npm install
cd client && npm install
cd ../server && npm install
cd ..
```

### 3. Environment Config
**Server (`/server/.env`):**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
ADMIN_PASSWORD=your_dashboard_password
```

**Client (`/client/.env`):**
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 4. Run
```bash
npm run dev
```
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

---

## 📡 Core API
| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/trends` | `GET` | Fetch all active categories |
| `/api/posters` | `GET` | Fetch gallery items (supports filtering) |
| `/api/suggestions` | `POST`| Submit a community prompt |
| `/api/admin/*` | `VAR` | Protected routes for content management |

---

## 📄 License
This project is licensed under the MIT License. Developed with ❤️ by [Sambhav Oswal](https://github.com/sambhavvoswal).
