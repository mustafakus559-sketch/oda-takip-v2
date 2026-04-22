"use client";

import { useEffect, useState } from "react";

const USERS = [
  { username: "mustafa", password: "1234", name: "Mustafa Kuş", role: "admin" },
  { username: "erhan", password: "1234", name: "Erhan Karakuş", role: "idare" },
  { username: "yunus", password: "1234", name: "Yunus Emre Özevren", role: "idare" },
];

export default function Page() {
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [form, setForm] = useState({ room: "", note: "" });
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const savedRecords = localStorage.getItem("tdv-records");
    const savedUser = localStorage.getItem("tdv-user");

    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    }

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tdv-records", JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("tdv-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("tdv-user");
    }
  }, [user]);

  const login = () => {
    const foundUser = USERS.find(
      (u) =>
        u.username === loginForm.username &&
        u.password === loginForm.password
    );

    if (!foundUser) {
      alert("Kullanıcı adı veya şifre hatalı");
      return;
    }

    setUser(foundUser);
  };

  const logout = () => {
    setUser(null);
  };

  const saveRecord = () => {
    if (!form.room.trim()) {
      alert("Oda numarası giriniz");
      return;
    }

    const newRecord = {
      id: Date.now(),
      room: form.room,
      note: form.note,
      createdBy: user.username,
      createdByName: user.name,
      status: "Onay Bekliyor",
      createdAt: new Date().toLocaleString("tr-TR"),
    };

    setRecords([newRecord, ...records]);
    setForm({ room: "", note: "" });
  };

  const approveRecord = (id) => {
    setRecords(
      records.map((record) =>
        record.id === id
          ? { ...record, status: "Onaylandı", approvedBy: user.name }
          : record
      )
    );
  };

  const visibleRecords =
    user?.role === "admin"
      ? records
      : records.filter((record) => record.createdBy === user.username);

  if (!user) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f4f6f8",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Arial, sans-serif",
          padding: 20,
        }}
      >
        <div
          style={{
            background: "white",
            padding: 30,
            borderRadius: 12,
            width: "100%",
            maxWidth: 420,
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <h1 style={{ marginBottom: 10 }}>TDV Oda Takip Uygulaması</h1>
          <p style={{ color: "#666", marginBottom: 20 }}>
            Kullanıcı girişi yapınız
          </p>

          <input
            type="text"
            placeholder="Kullanıcı adı"
            value={loginForm.username}
            onChange={(e) =>
              setLoginForm({ ...loginForm, username: e.target.value })
            }
            style={{
              width: "100%",
              padding: 12,
              marginBottom: 12,
              border: "1px solid #ccc",
              borderRadius: 8,
            }}
          />

          <input
            type="password"
            placeholder="Şifre"
            value={loginForm.password}
            onChange={(e) =>
              setLoginForm({ ...loginForm, password: e.target.value })
            }
            style={{
              width: "100%",
              padding: 12,
              marginBottom: 12,
              border: "1px solid #ccc",
              borderRadius: 8,
            }}
          />

          <button
            onClick={login}
            style={{
              width: "100%",
              padding: 12,
              background: "#0f172a",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Giriş Yap
          </button>

          <div
            style={{
              marginTop: 20,
              padding: 12,
              background: "#f8fafc",
              borderRadius: 8,
              fontSize: 14,
              lineHeight: 1.7,
            }}
          >
            <div><strong>Yönetici:</strong> mustafa / 1234</div>
            <div><strong>İdare:</strong> erhan / 1234</div>
            <div><strong>İdare:</strong> yunus / 1234</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6f8",
        fontFamily: "Arial, sans-serif",
        padding: 20,
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div
          style={{
            background: "white",
            padding: 20,
            borderRadius: 12,
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <div>
              <h1 style={{ margin: 0 }}>TDV Oda Takip Uygulaması</h1>
              <p style={{ margin: "8px 0 0", color: "#666" }}>
                Hoş geldiniz, {user.name} ({user.role === "admin" ? "Yönetici" : "İdare"})
              </p>
            </div>

            <button
              onClick={logout}
              style={{
                padding: "10px 16px",
                background: "#dc2626",
                color: "white",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              Çıkış Yap
            </button>
          </div>
        </div>

        <div
          style={{
            background: "white",
            padding: 20,
            borderRadius: 12,
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
            marginBottom: 20,
          }}
        >
          <h2 style={{ marginTop: 0 }}>Yeni Kayıt</h2>

          <input
            type="text"
            placeholder="Oda No"
            value={form.room}
            onChange={(e) => setForm({ ...form, room: e.target.value })}
            style={{
              width: "100%",
              padding: 12,
              marginBottom: 12,
              border: "1px solid #ccc",
              borderRadius: 8,
            }}
          />

          <textarea
            placeholder="Not"
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            style={{
              width: "100%",
              padding: 12,
              minHeight: 100,
              marginBottom: 12,
              border: "1px solid #ccc",
              borderRadius: 8,
            }}
          />

          <button
            onClick={saveRecord}
            style={{
              padding: "12px 18px",
              background: "#0f766e",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Kaydet
          </button>
        </div>

        <div
          style={{
            background: "white",
            padding: 20,
            borderRadius: 12,
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          }}
        >
          <h2 style={{ marginTop: 0 }}>
            {user.role === "admin" ? "Tüm Kayıtlar" : "Kayıtlarım"}
          </h2>

          {visibleRecords.length === 0 ? (
            <p>Henüz kayıt bulunmuyor.</p>
          ) : (
            visibleRecords.map((record) => (
              <div
                key={record.id}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: 10,
                  padding: 16,
                  marginBottom: 12,
                  background: "#fafafa",
                }}
              >
                <p><strong>Oda:</strong> {record.room}</p>
                <p><strong>Not:</strong> {record.note || "-"}</p>
                <p><strong>Oluşturan:</strong> {record.createdByName}</p>
                <p><strong>Tarih:</strong> {record.createdAt}</p>
                <p>
                  <strong>Durum:</strong>{" "}
                  <span
                    style={{
                      color:
                        record.status === "Onaylandı" ? "green" : "#b45309",
                      fontWeight: "bold",
                    }}
                  >
                    {record.status}
                  </span>
                </p>

                {record.approvedBy && (
                  <p><strong>Onaylayan:</strong> {record.approvedBy}</p>
                )}

                {user.role === "admin" && record.status === "Onay Bekliyor" && (
                  <button
                    onClick={() => approveRecord(record.id)}
                    style={{
                      padding: "10px 16px",
                      background: "#2563eb",
                      color: "white",
                      border: "none",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Onayla
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
