import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api/notes';

const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // 1. Lấy danh sách ghi chú
  useEffect(() => {
    fetch(API_URL).then((res) => res.json()).then(setNotes).catch(console.error);
  }, []);

  // 2. Thêm ghi chú mới
  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      if (res.ok) {
        const createdNote = await res.json();
        setNotes([createdNote, ...notes]); // 3. Cập nhật state lập tức
        setTitle('');
        setContent('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', fontFamily: 'sans-serif', padding: '20px', background: '#f8fafc', borderRadius: '12px' }}>
      <h2 style={{ textAlign: 'center', color: '#1e293b', marginTop: 0 }}>📌 Quản Lý Ghi Chú</h2>

      {/* Form thêm ghi chú */}
      <form onSubmit={handleAddNote} style={{ background: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 8px #0001', marginBottom: '20px' }}>
        <input type="text" placeholder="Tiêu đề..." value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
        <textarea placeholder="Nội dung..." value={content} onChange={(e) => setContent(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>+ Thêm Ghi Chú</button>
      </form>

      {/* Danh sách hiển thị */}
      <div style={{ display: 'grid', gap: '10px' }}>
        {notes.map((note) => (
          <div key={note._id} style={{ background: '#fff', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px #0001' }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#0f172a' }}>{note.title}</h4>
            <p style={{ margin: 0, color: '#475569', fontSize: '14px' }}>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteApp;