const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Ganti dengan URI MongoDB Atlas Anda
const uri = 'mongodb+srv://datakaryawan:datakaryawan12345@cluster0.0zirntu.mongodb.net/datakaryawan?retryWrites=true&w=majority&appName=Cluster0';

// Definisikan schema sesuai data
const karyawanSchema = new mongoose.Schema({
  id: Number,
  nik: String,
  nama: String,
  alamat: String,
  jabatan: String,
  telp: String
});
const Karyawan = mongoose.model('Karyawan', karyawanSchema);

// Baca data dari data.json
const dataPath = path.join(__dirname, 'data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8')).karyawan;

async function importData() {
  try {
    await mongoose.connect(uri);
    // Hapus data lama (opsional)
    await Karyawan.deleteMany({});
    // Import data baru
    await Karyawan.insertMany(data);
    console.log('Import data selesai!');
    process.exit(0);
  } catch (err) {
    console.error('Gagal import data:', err);
    process.exit(1);
  }
}

importData();