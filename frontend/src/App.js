import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from 'react-router-dom';

function KaryawanTable({ karyawan }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const filtered = karyawan.filter(k =>
    (k.nik && k.nik.toLowerCase().includes(search.toLowerCase())) ||
    (k.nama && k.nama.toLowerCase().includes(search.toLowerCase()))
  );
  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handlePrev = () => setPage(p => Math.max(1, p - 1));
  const handleNext = () => setPage(p => Math.min(totalPages, p + 1));

  // Reset ke page 1 jika search, data, atau pageSize berubah
  React.useEffect(() => { setPage(1); }, [search, karyawan, pageSize]);

  return (
    <div style={{ position: 'relative', paddingLeft: 24, paddingRight: 24 }}>
      <h2>Data Karyawan</h2>
      <div style={{ position: 'absolute', right: 0, top: 0, display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Cari NIK/Nama..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: 6, borderRadius: 4, border: '1px solid #ccc', minWidth: 180 }}
        />
        <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))} style={{ padding: 6, borderRadius: 4, border: '1px solid #ccc' }}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
      <div style={{ overflowX: 'auto', marginTop: 16, maxHeight: 500, overflowY: 'auto' }}>
        <table style={{ minWidth: 600, width: '100%', borderCollapse: 'collapse', background: '#fff', boxShadow: '0 2px 8px #eee' }}>
          <colgroup>
            <col style={{ width: '35px' }} />
            <col style={{ width: '130px' }} />
            <col style={{ width: '325px' }} />
            <col style={{ width: '150px' }} />
          </colgroup>
          <thead style={{ background: '#f5f5f5', position: 'sticky', top: 0, zIndex: 1 }}>
            <tr>
              <th style={{ padding: 10, border: '1px solid #ddd' }}>No</th>
              <th style={{ padding: 10, border: '1px solid #ddd' }}>NIK</th>
              <th style={{ padding: 10, border: '1px solid #ddd' }}>Nama</th>
              <th style={{ padding: 10, border: '1px solid #ddd' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paged.map((k, idx) => (
              <tr key={k.id || idx} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 8, border: '1px solid #eee', textAlign: 'center' }}>{(page - 1) * pageSize + idx + 1}</td>
                <td style={{ padding: 8, border: '1px solid #eee' }}>{k.nik}</td>
                <td style={{ padding: 8, border: '1px solid #eee' }}>{k.nama}</td>
                <td style={{ padding: 8, border: '1px solid #eee', textAlign: 'center' }}>
                  <button style={{ padding: '4px 12px', borderRadius: 4, border: 'none', background: '#1976d2', color: '#fff', cursor: 'pointer' }} onClick={() => navigate(`/detail/${k.id || k.no}`)}>Detail</button>
                </td>
              </tr>
            ))}
            {paged.length === 0 && (
              <tr><td colSpan={4} style={{ textAlign: 'center', padding: 16 }}>Data tidak ditemukan</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8, marginTop: 12 }}>
        <button onClick={handlePrev} disabled={page === 1} style={{ padding: '4px 12px', borderRadius: 4, border: '1px solid #ccc', background: page === 1 ? '#eee' : '#fff', cursor: page === 1 ? 'not-allowed' : 'pointer' }}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={handleNext} disabled={page === totalPages} style={{ padding: '4px 12px', borderRadius: 4, border: '1px solid #ccc', background: page === totalPages ? '#eee' : '#fff', cursor: page === totalPages ? 'not-allowed' : 'pointer' }}>Next</button>
      </div>
    </div>
  );
}

function DetailKaryawan() {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://flaxen-picayune-hellebore.glitch.me/api/karyawan/${id}`)
      .then(res => res.json())
      .then(data => {
        setDetail(data);
        setLoading(false);
      });
  }, [id]);

  const detailFields = [
    { label: 'Tempat Lahir', key: 'tempat_lahir' },
    { label: 'Tanggal Lahir', key: 'tanggal_lahir' },
    { label: 'Jenis Kelamin', key: 'jenis_kelamin' },
    { label: 'Status', key: 'status' },
    { label: 'Agama', key: 'agama' },
    { label: 'NIK KTP', key: 'nik_ktp' },
    { label: 'No BPJS TK', key: 'no_bpjs_tk' },
    { label: 'No BPJS KES', key: 'no_bpjs_kes' },
    { label: 'Alamat Email', key: 'alamat_email' },
    { label: 'Nama Istri', key: 'nama_istri' },
    { label: 'Tgl Lahir', key: 'tanggal_lahir' },
    { label: 'No BPJS KES', key: 'no_bpjs_kes' },
    { label: 'Anak 1', key: 'anak_1' },
    { label: 'Tgl Lahir', key: 'tanggal_lahir' },
    { label: 'No BPJS KES', key: 'no_bpjs_kes' },
    { label: 'Anak 2', key: 'anak_2' },
    { label: 'Tgl Lahir', key: 'tanggal_lahir' },
    { label: 'No BPJS KES', key: 'no_bpjs_kes' },
    { label: 'Anak 3', key: 'anak_3' },
    { label: 'Tgl Lahir', key: 'tanggal_lahir' },
    { label: 'No BPJS KES', key: 'no_bpjs_kes' },
    { label: 'Anak 4', key: 'anak_4' },
    { label: 'Tgl Lahir', key: 'tanggal_lahir' },
    { label: 'No BPJS KES', key: 'no_bpjs_kes' },
    { label: 'Anak 5', key: 'anak_5' },
    { label: 'Tgl Lahir', key: 'tanggal_lahir' },
    { label: 'No BPJS KES', key: 'no_bpjs_kes' },
    { label: 'Anak 6', key: 'anak_6' },
    { label: 'Tgl Lahir', key: 'tanggal_lahir' },
    { label: 'No BPJS KES', key: 'no_bpjs_kes' },
    { label: 'Anak 7', key: 'anak_7' },
    { label: 'Tgl Lahir', key: 'tanggal_lahir' },
    { label: 'No BPJS KES', key: 'no_bpjs_kes' },
  ];

  if (loading) return <p>Memuat detail...</p>;
  if (!detail) return <p>Data tidak ditemukan</p>;

  return (
    <div style={{ padding: '24px 24px', fontFamily: 'Arial' }}>
      <h3>Detail Karyawan</h3>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <tbody>
          <tr>
            <td><b>NIK</b></td>
            <td>{(detail.nik || '').toUpperCase()}</td>
          </tr>
          <tr>
            <td><b>Nama</b></td>
            <td>{(detail.nama || '').toUpperCase()}</td>
          </tr>
          {detailFields.map(field => (
            <tr key={field.key}>
              <td><b>{field.label}</b></td>
              <td>{(detail[field.key] || '').toUpperCase()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button style={{ marginTop: 16 }} onClick={() => navigate(-1)}>Kembali</button>
    </div>
  );
}

function ImportExport({ onImport, onExport, fileInputRef }) {
  return (
    <div style={{ position: 'fixed', right: 24, bottom: 24, display: 'flex', gap: 8 }}>
      <input
        type="file"
        accept=".csv"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={onImport}
      />
      <button onClick={() => fileInputRef.current.click()}>Import</button>
      <button onClick={onExport}>Export</button>
    </div>
  );
}

function App() {
  const [karyawan, setKaryawan] = useState([]);
  const fileInputRef = useRef();

  useEffect(() => {
    fetch(`https://flaxen-picayune-hellebore.glitch.me/api/karyawan`)
      .then(res => res.json())
      .then(data => setKaryawan(data));
  }, []);

  // Kolom yang diekspor dan diimpor
  const csvFields = [
    'no', 'id', 'nik', 'nama',
    'tempat_lahir', 'tanggal_lahir', 'jenis_kelamin', 'status', 'agama',
    'nik_ktp', 'no_bpjs_tk', 'no_bpjs_kes', 'alamat_email', 'nama_istri', 'tanggal_lahir', 'no_bpjs_kes', 
    'anak_1', 'tanggal_lahir', 'no_bpjs_kes', 'anak_2', 'tanggal_lahir', 'no_bpjs_kes', 'anak_3', 'tanggal_lahir', 'no_bpjs_kes', 'anak_4', 'tanggal_lahir', 'no_bpjs_kes', 'anak_5', 'tanggal_lahir', 'no_bpjs_kes', 'anak_6', 'tanggal_lahir', 'no_bpjs_kes', 'anak_7', 'tanggal_lahir', 'no_bpjs_kes'  
  ];

  // Export ke CSV
  const handleExport = () => {
    const rows = [csvFields.join(',')];
    karyawan.forEach((k, idx) => {
      const row = csvFields.map(f => {
        let val = k[f];
        if (val === undefined && k.detail) val = k.detail[f];
        if (f === 'no') return idx + 1;
        return val !== undefined ? '"' + String(val).replace(/"/g, '""') + '"' : '';
      });
      rows.push(row.join(','));
    });
    const csv = rows.join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data_karyawan.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import dari CSV
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const text = evt.target.result;
        const lines = text.split(/\r?\n/).filter(Boolean);
        if (lines.length < 2) throw new Error('CSV kosong');
        const headers = lines[0].split(',').map(h => h.replace(/\"/g, '').trim());
        const data = lines.slice(1).map(line => {
          // Split CSV respecting quoted commas
          const values = [];
          let cur = '';
          let inQuotes = false;
          for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
              if (inQuotes && line[i+1] === '"') { cur += '"'; i++; }
              else inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
              values.push(cur); cur = '';
            } else {
              cur += char;
            }
          }
          values.push(cur);
          const obj = {};
          headers.forEach((h, i) => { obj[h] = values[i] || ''; });
          // Gabungkan field detail
          const detail = {};
          csvFields.forEach(f => {
            if (["no","id","nik","nama"].includes(f)) return;
            detail[f] = obj[f] || '';
          });
          return {
            no: obj.no,
            id: obj.id,
            nik: obj.nik,
            nama: obj.nama,
            detail
          };
        });
        setKaryawan(data);
        // Kirim ke backend agar data backend juga terganti
        fetch('https://flaxen-picayune-hellebore.glitch.me/api/karyawan/import', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
          // opsional: tampilkan notifikasi sukses
        });
      } catch {
        alert('File CSV tidak valid!');
      }
    };
    reader.readAsText(file);
  };

  return (
    <Router>
      <div
        style={{
          minHeight: '100vh',
          background: "url('/bg-sawit.png') center center / cover no-repeat fixed",
          position: 'relative'
        }}
      >
        <div style={{
          textAlign: 'center',
          margin: '32px 0 24px 0',
          fontWeight: 800,
          fontSize: 40,
          letterSpacing: 3,
          fontFamily: "'Poppins', 'Segoe UI', 'Montserrat', Arial, sans-serif",
          background: 'rgba(255,255,255,0.7)',
          borderRadius: 16,
          boxShadow: '0 4px 16px #eee',
          padding: '24px 0',
          color: '#1a3c1a',
          textShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          D'BASE KARYAWAN PT. LETAWA
        </div>
        <Routes>
          <Route path="/" element={<>
            <KaryawanTable karyawan={karyawan} />
            <ImportExport onImport={handleImport} onExport={handleExport} fileInputRef={fileInputRef} />
          </>} />
          <Route path="/detail/:id" element={<DetailKaryawan />} />
        </Routes>
        <div style={{
          width: '100%',
          textAlign: 'center',
          marginTop: 48,
          marginBottom: 12,
          color: '#1a3c1a',
          fontSize: 15,
          fontFamily: 'Segoe UI, Arial, sans-serif',
          opacity: 0.85
        }}>
          Copyright @ 2025 Dept HRGA PT. Letawa . All rights reserved
        </div>
    </div>
    </Router>
  );
}

export default App;
