"use client";

import { useEffect, useState } from "react";

const USERS = [
  { username: "mustafa", password: "1234", name: "Mustafa Kuş", role: "admin" },
  { username: "erhan", password: "1234", name: "Erhan Karakuş", role: "idare" },
  { username: "yunus", password: "1234", name: "Yunus Emre Özevren", role: "idare" },
];

export default function Page() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ room: "", note: "" });
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("records");
    if (saved) setRecords(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("records", JSON.stringify(records));
  }, [records]);

  const login = (username, password) => {
    const u = USERS.find(x => x.username === username && x.password === password);
    if (!u) return alert("Hatalı giriş");
    setUser(u);
  };

  const save = () => {
    const newRecord = {
      id: Date.now(),
      room: form.room,
      note: form.note,
      user: user.name,
      createdBy: user.username,
      status: "Onay Bekliyor"
    };
    setRecords([newRecord, ...records]);
    setForm({ room: "", note: "" });
  };

  const approve = (id) => {
    setRecords(records.map(r => r.id === id ? { ...r, status: "Onaylandı" } : r));
  };

  const visibleRecords =
    user?.role === "admin"
      ? records
      : records.filter(r => r.createdBy === user.username);

  if (!user) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Giriş</h2>
        <input placeholder="kullanıcı adı" id="u" /><br/><br/>
        <input placeholder="şifre" id="p" type="password"/><br/><br/>
        <button onClick={() =>
          login(
            document.getElementById("u").value,
            document.getElementById("p").value
          )
        }>
          Giriş Yap
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Hoşgeldin {user.name}</h2>

      <h3>Yeni Oda Kontrol</h3>
      <input
        placeholder="Oda No"
        value={form.room}
        onChange={e => setForm({ ...form, room: e.target.value })}
      />
      <br/><br/>
      <textarea
        placeholder="Not"
        value={form.note}
        onChange={e => setForm({ ...form, note: e.target.value })}
      />
      <br/><br/>
      <button onClick={save}>Kaydet</button>

      <hr/><br/>

      <h3>Kayıtlar</h3>
      {visibleRecords.map(r => (
        <div key={r.id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
          <b>Oda:</b> {r.room} <br/>
          <b>Not:</b> {r.note} <br/>
          <b>Durum:</b> {r.status} <br/>
          <b>Giren:</b> {r.user} <br/>

          {user.role === "admin" && r.status === "Onay Bekliyor" && (
            <button onClick={() => approve(r.id)}>Onayla</button>
          )}
        </div>
      ))}
    </div>
  );
}
