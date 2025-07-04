# Backend Data Karyawan

Backend API untuk aplikasi data karyawan menggunakan Node.js, Express, dan MongoDB Atlas.

## 🚀 Deployment Platforms

### Railway (Recommended)
1. Buka [railway.app](https://railway.app)
2. Login dengan GitHub
3. Klik "New Project" → "Deploy from GitHub repo"
4. Pilih repo ini
5. Set environment variable:
   - `MONGODB_URI`: URI MongoDB Atlas Anda

### Render
1. Buka [render.com](https://render.com)
2. Connect GitHub repo
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Set environment variable: `MONGODB_URI`

### Cyclic.sh
1. Buka [cyclic.sh](https://cyclic.sh)
2. Connect GitHub repo
3. Set environment variable: `MONGODB_URI`

## 🔧 Environment Variables

```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/datakaryawan?retryWrites=true&w=majority
PORT=3001
NODE_ENV=production
```

## 📡 API Endpoints

- `GET /api/karyawan` - List semua karyawan
- `GET /api/karyawan/:id` - Detail karyawan by ID
- `POST /api/karyawan` - Tambah karyawan baru

## 🛠️ Local Development

```bash
npm install
npm run dev
```

Server akan berjalan di `http://localhost:3001` 