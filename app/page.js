"use client";

import { useState } from "react";

const USERS = [
  { username: "mustafa", password: "1234", name: "Mustafa Kuş", role: "admin" },
  { username: "erhan", password: "1234", name: "Erhan Karakuş", role: "idare" },
  { username: "yunus", password: "1234", name: "Yunus Emre Özevren", role: "idare" },
];

export default function Page() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [odaNo, setOdaNo] = useState("");
  const [genelNot, setGenelNot] = useState("");
  const [ariza, setAriza] = useState("yok");
  const [arizaAciklama, setArizaAciklama] = useState("");

  const handleLogin = () => {
    const found = USERS.find(
      (u) => u.username === username.trim().toLowerCase() && u.password === password
    );

    if (!found) {
      alert("Kullanıcı adı veya şifre hatalı.");
      return;
    }

    setUser(found);
  };

  const handleLogout = () => {
    setUser(null);
    setUsername("");
    setPassword("");
  };

  const handleSave = () => {
    alert("Kayıt alındı. Sonraki adımda bunu veri tabanına bağlayacağız.");
    setOdaNo("");
    setGenelNot("");
    setAriza("yok");
    setArizaAciklama("");
  };

  if (!user) {
    return (
      <div style={styles.page}>
        <div style={styles.loginWrapper}>
          <div style={styles.logoBox}>
            <div style={styles.logoMain}>TDV YURTLAR</div>
            <div style={styles.logoSub}>
              Türkiye Diyanet Vakfı Yurt ve Sosyal Tesisler İktisadi İşletmesi
            </div>
          </div>

          <div style={styles.loginCard}>
            <div style={styles.cardHeader}>Oda Kontrol Sistemi</div>
            <div style={styles.cardText}>
              Yetkili personel girişi yaparak sisteme erişebilirsiniz.
            </div>

            <input
              style={styles.input}
              placeholder="Kullanıcı Adı"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              style={styles.input}
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button style={styles.loginButton} onClick={handleLogin}>
              Giriş Yap
            </button>

            <div style={styles.demoBox}>
              <div><strong>Admin:</strong> mustafa / 1234</div>
              <div><strong>İdare:</strong> erhan / 1234</div>
              <div><strong>İdare:</strong> yunus / 1234</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.appPage}>
      <div style={styles.topBar}>
        <div>
          <div style={styles.appTitle}>TDV Oda Kontrol Sistemi</div>
          <div style={styles.welcome}>
            Hoş geldiniz, {user.name} ({user.role})
          </div>
        </div>

        <button style={styles.logoutButton} onClick={handleLogout}>
          Çıkış Yap
        </button>
      </div>

      <div style={styles.formCard}>
        <h2>Yeni Oda Kontrolü</h2>

        <input
          style={styles.input}
          placeholder="Oda No"
          value={odaNo}
          onChange={(e) => setOdaNo(e.target.value)}
        />

        <textarea
          style={styles.textarea}
          placeholder="Genel Not"
          value={genelNot}
          onChange={(e) => setGenelNot(e.target.value)}
        />

        <div style={styles.label}>Odada herhangi bir arıza var mı?</div>
        <select
          style={styles.input}
          value={ariza}
          onChange={(e) => setAriza(e.target.value)}
        >
          <option value="yok">Yok</option>
          <option value="var">Var</option>
        </select>

        {ariza === "var" && (
          <textarea
            style={styles.textarea}
            placeholder="Arıza açıklaması yazınız..."
            value={arizaAciklama}
            onChange={(e) => setArizaAciklama(e.target.value)}
          />
        )}

        <button style={styles.saveButton} onClick={handleSave}>
          Kaydet
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f3f5f7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
  },
  loginWrapper: {
    width: "100%",
    maxWidth: "920px",
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    gap: "24px",
  },
  logoBox: {
    background: "linear-gradient(135deg, #0b2c6f 0%, #1146a6 100%)",
    color: "#fff",
    borderRadius: "20px",
    padding: "48px 36px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  logoMain: {
    fontSize: "54px",
    fontWeight: "800",
    letterSpacing: "1px",
    marginBottom: "14px",
  },
  logoSub: {
    fontSize: "24px",
    lineHeight: 1.4,
    color: "#e8eefc",
  },
  loginCard: {
    background: "#fff",
    borderRadius: "20px",
    padding: "32px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.10)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  cardHeader: {
    fontSize: "30px",
    fontWeight: "800",
    color: "#0b2c6f",
    marginBottom: "8px",
  },
  cardText: {
    color: "#667085",
    marginBottom: "20px",
    lineHeight: 1.5,
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    marginBottom: "14px",
    borderRadius: "10px",
    border: "1px solid #d0d5dd",
    fontSize: "16px",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    minHeight: "100px",
    padding: "14px 16px",
    marginBottom: "14px",
    borderRadius: "10px",
    border: "1px solid #d0d5dd",
    fontSize: "16px",
    boxSizing: "border-box",
    resize: "vertical",
  },
  loginButton: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    background: "#f59e0b",
    color: "#fff",
    fontSize: "17px",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "4px",
  },
  demoBox: {
    marginTop: "18px",
    padding: "14px",
    borderRadius: "10px",
    background: "#f8fafc",
    color: "#475467",
    lineHeight: 1.8,
    fontSize: "14px",
  },
  appPage: {
    minHeight: "100vh",
    background: "#f3f5f7",
    padding: "28px",
  },
  topBar: {
    background: "#fff",
    borderRadius: "18px",
    padding: "24px 28px",
    marginBottom: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  },
  appTitle: {
    fontSize: "34px",
    fontWeight: "800",
    color: "#0b2c6f",
  },
  welcome: {
    marginTop: "6px",
    color: "#667085",
    fontSize: "18px",
  },
  logoutButton: {
    padding: "12px 18px",
    borderRadius: "10px",
    border: "none",
    background: "#ef4444",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
  },
  formCard: {
    background: "#fff",
    borderRadius: "18px",
    padding: "28px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    maxWidth: "820px",
  },
  label: {
    marginBottom: "8px",
    fontWeight: "700",
    color: "#344054",
  },
  saveButton: {
    padding: "14px 20px",
    borderRadius: "10px",
    border: "none",
    background: "#0b2c6f",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
  },
};
