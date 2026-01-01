# BeyondChats Assignment

A full-stack web application for managing and displaying articles with a modern React frontend and Express.js backend.

## 🌐 Live Demo

- **Frontend:** https://beyondchats-assignment-fronend.vercel.app/
- **Backend API:** https://beyondchats-assignment-etd4.onrender.com

## 📋 Features

- ✅ **View Articles** - Fetch and display articles in a responsive grid layout
- ✅ **Create Articles** - Add new articles with title, author, and content
- ✅ **Edit Articles** - Update existing article information
- ✅ **Delete Articles** - Remove articles with confirmation prompt
- ✅ **Responsive Design** - Mobile-friendly UI powered by Tailwind CSS
- ✅ **Web Scraping** - Automatically scrape articles from external sources
- ✅ **RESTful API** - Clean API endpoints for article management

## 🛠️ Tech Stack

### Frontend
- **React 19.2** - UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Modern JavaScript (ES6+)**

### Backend
- **Node.js & Express.js** - Server framework
- **MongoDB & Mongoose** - Database and ODM
- **Cheerio** - Web scraping library
- **Axios** - HTTP client for scraping
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
beyondchats-assignment/
├── backend/
│   ├── config/
│   │   └── dbConfig.js           # MongoDB connection config
│   ├── controllers/
│   │   └── articlesController.js # Article logic
│   ├── models/
│   │   └── article.js            # Article schema
│   ├── routes/
│   │   └── articlesRouter.js     # API routes
│   ├── services/
│   │   └── scrapOldestFiveBlogs.js # Web scraping service
│   ├── middlewares/              # Express middlewares
│   ├── app.js                    # Express app setup
│   ├── server.js                 # Server entry point
│   ├── package.json
│   └── .env                      # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Articles.jsx      # Articles list & form
│   │   ├── App.jsx               # Main app component
│   │   ├── main.jsx              # React entry point
│   │   ├── index.css             # Tailwind CSS directives
│   │   └── App.css
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.cjs       # Tailwind config
│   ├── postcss.config.cjs        # PostCSS config
│   └── eslint.config.js
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file in the backend directory:**
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   ```

4. **Start the server:**
   ```bash
   npm run dev    # Development with nodemon
   npm start      # Production
   ```

   Backend will run on `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file in the frontend directory (optional):**
   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   Frontend will be available at `http://localhost:5173`

5. **Build for production:**
   ```bash
   npm run build
   npm run preview
   ```

## 📡 API Endpoints

### GET `/api/articles`
Fetch all articles. If no articles exist, scrapes and caches them.

**Response:**
```json
[
  {
    "_id": "60d5ec49c1234567890abcde",
    "title": "Article Title",
    "content": "Article content...",
    "author": "Author Name",
    "date": "2024-01-01T12:00:00.000Z"
  }
]
```

### POST `/api/articles`
Create a new article.

**Request Body:**
```json
{
  "title": "New Article",
  "content": "Content here",
  "author": "Author Name"
}
```

**Response:** Created article object

### PUT `/api/articles/:id`
Update an article by ID.

**Request Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated content",
  "author": "Updated Author"
}
```

**Response:** Updated article object

### DELETE `/api/articles/:id`
Delete an article by ID.

**Response:**
```json
{
  "message": "Article deleted successfully"
}
```

## 🎨 Frontend UI

### Articles Page
- **Add New Article Button** - Opens form to create new article
- **Article Cards Grid** - Responsive 3-column layout
- **Edit Button** - Opens prefilled form for editing
- **Delete Button** - Removes article with confirmation
- **Form Fields** - Title, Author, Content textarea
- **Loading & Error States** - Feedback during operations

### Styling
All components are styled with Tailwind CSS utility classes for a modern, clean look.

## 🔧 Environment Variables

### Backend `.env`
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/beyondchats
PORT=3000
NODE_ENV=development
```

### Frontend `.env` (optional)
```env
VITE_API_URL=http://localhost:3000/api
```

## 📦 Dependencies

### Backend
- express@^5.2.1
- mongoose@^9.1.1
- cheerio@^1.1.2
- axios@^1.13.2
- cors@^2.8.5
- dotenv@^17.2.3
- mongodb@^7.0.0

### Frontend
- react@^19.2.0
- react-dom@^19.2.0
- tailwindcss@^3.4.8
- postcss@^8.4.24
- autoprefixer@^10.4.14

## 🚢 Deployment

### Backend (Render)
1. Live at: https://beyondchats-assignment-etd4.onrender.com

### Frontend (Vercel)
1.Live at: https://beyondchats-assignment-fronend.vercel.app/

## 🔄 Development Workflow

1. **Clone repository:**
   ```bash
   git clone https://github.com/SachinBhawar/beyondchats-assignment.git
   cd beyondchats-assignment
   ```

2. **Backend development:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Frontend development (new terminal):**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Make changes and test locally**

5. **Push to GitHub** to auto-deploy to Render & Vercel

## 🐛 Troubleshooting

### Backend won't connect to MongoDB
- Verify MONGO_URI in `.env` is correct
- Check MongoDB cluster is active and IP is whitelisted
- Ensure MongoDB credentials are accurate

### Frontend API requests fail
- Verify backend is running on correct port
- Check CORS is enabled in backend
- Ensure API_BASE URL matches backend URL
- Check browser console for detailed errors


## 👤 Author

**Sachin Bhawar**
- Email: sachinbhavar@gmail.com
- GitHub: [@SachinBhawar](https://github.com/SachinBhawar)

## 📞 Support

For issues or questions, please open an issue on the GitHub repository.

---


