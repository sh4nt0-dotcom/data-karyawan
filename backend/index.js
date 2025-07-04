const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

// Gunakan environment variable untuk MongoDB URI
const uri = process.env.MONGODB_URI || 'mongodb+srv://datakaryawan:datakaryawan12345@cluster0.0zirntu.mongodb.net/datakaryawan?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB dengan error handling
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const karyawanSchema = new mongoose.Schema({
  id: Number,
  nik: String,
  nama: String,
  alamat: String,
  jabatan: String,
  telp: String
});
const Karyawan = mongoose.model('Karyawan', karyawanSchema);

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Data Karyawan API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      list: 'GET /api/karyawan',
      detail: 'GET /api/karyawan/:id',
      create: 'POST /api/karyawan'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Endpoint list karyawan
app.get('/api/karyawan', async (req, res) => {
  try {
    const data = await Karyawan.find({}, 'id nik nama');
    res.json(data.map((k, idx) => ({
      no: idx + 1,
      id: k.id,
      nik: k.nik,
      nama: k.nama
    })));
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil data karyawan' });
  }
});

// Endpoint detail karyawan
app.get('/api/karyawan/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await Karyawan.findOne({ id });
    if (!data) return res.status(404).json({ message: 'Karyawan tidak ditemukan' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil detail karyawan' });
  }
});

// Endpoint tambah karyawan (POST)
app.post('/api/karyawan', async (req, res) => {
  try {
    const last = await Karyawan.findOne().sort({ id: -1 });
    const newKaryawan = { ...req.body, id: last ? last.id + 1 : 1 };
    const created = await Karyawan.create(newKaryawan);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: 'Gagal menambah karyawan' });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});