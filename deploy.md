# 🚀 Panduan Deployment ke Railway

## ✅ Status Saat Ini
- ✅ Backend sudah berfungsi (port 3001)
- ✅ API endpoints sudah siap
- ✅ Package.json sudah dikonfigurasi
- ✅ Railway.json sudah siap

## 📋 Langkah-langkah Deployment

### Step 1: Install Git (jika belum)
1. Download dari [git-scm.com](https://git-scm.com/)
2. Install dengan default settings
3. Restart terminal

### Step 2: Buat Repository GitHub
1. Buka [github.com](https://github.com)
2. Klik "New repository"
3. Nama: `data-karyawan`
4. Public repository
5. Jangan centang "Add README"
6. Klik "Create repository"

### Step 3: Push ke GitHub
```bash
# Di terminal: D:\APP\My Web Project\data karyawan

git init
git add .
git commit -m "Initial commit: Data Karyawan app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/data-karyawan.git
git push -u origin main
```

### Step 4: Deploy ke Railway
1. Buka [railway.app](https://railway.app)
2. Login dengan GitHub
3. Klik "New Project"
4. Pilih "Deploy from GitHub repo"
5. Pilih repository `data-karyawan`
6. Railway akan auto-deploy

### Step 5: Set Environment Variables
Di Railway dashboard:
- **Key:** `MONGODB_URI`
- **Value:** `mongodb+srv://datakaryawan:datakaryawan12345@cluster0.0zirntu.mongodb.net/datakaryawan?retryWrites=true&w=majority&appName=Cluster0`

### Step 6: Test Deployment
Railway akan memberikan URL seperti:
`https://your-app-name.railway.app`

Test API:
- `GET https://your-app-name.railway.app/api/karyawan`

## 🔧 Troubleshooting

### Jika deployment gagal:
1. Cek logs di Railway dashboard
2. Pastikan `MONGODB_URI` sudah diset
3. Pastikan semua dependencies ada

### Jika API tidak bisa diakses:
1. Cek healthcheck path: `/api/karyawan`
2. Pastikan port sudah benar
3. Test dengan curl atau Postman

## 📡 API Endpoints
- `GET /api/karyawan` - List karyawan
- `GET /api/karyawan/:id` - Detail karyawan
- `POST /api/karyawan` - Tambah karyawan

## 🎯 Next Steps
1. Test semua endpoints
2. Update frontend untuk menggunakan URL Railway
3. Set custom domain (opsional)
4. Monitor performance 