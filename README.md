# Data Karyawan - Full Stack Application

Aplikasi manajemen data karyawan dengan backend Node.js + Express + MongoDB Atlas dan frontend React.

## 🚀 Quick Deploy to Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/new?template=https://github.com/yourusername/data-karyawan)

## 📁 Project Structure

```
data karyawan/
├── backend/          # Node.js + Express API
│   ├── index.js      # Main server file
│   ├── package.json  # Backend dependencies
│   └── README.md     # Backend documentation
├── frontend/         # React application
│   ├── src/          # React source code
│   ├── package.json  # Frontend dependencies
│   └── README.md     # Frontend documentation
└── README.md         # This file
```

## 🛠️ Manual Setup

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account
- GitHub account

### Backend Setup
```bash
cd backend
npm install
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 🌐 Railway Deployment

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/data-karyawan.git
git push -u origin main
```

### Step 2: Deploy to Railway
1. Buka [railway.app](https://railway.app)
2. Login dengan GitHub
3. Klik "New Project"
4. Pilih "Deploy from GitHub repo"
5. Pilih repository Anda
6. Railway akan auto-detect dan deploy

### Step 3: Set Environment Variables
Di Railway dashboard, set environment variable:
- `MONGODB_URI`: URI MongoDB Atlas Anda

### Step 4: Get Your URL
Railway akan memberikan URL seperti:
`https://your-app-name.railway.app`

## 📡 API Endpoints

- `GET /api/karyawan` - List semua karyawan
- `GET /api/karyawan/:id` - Detail karyawan by ID  
- `POST /api/karyawan` - Tambah karyawan baru

## 🔧 Environment Variables

```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/datakaryawan?retryWrites=true&w=majority
PORT=3001
NODE_ENV=production
```

## 📝 License

MIT License # data-karyawan
