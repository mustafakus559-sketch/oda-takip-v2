"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://wsxjninwdexyxmvnvxfs.supabase.co",
  "sb_publishable_wA4IcyUd-4UaBkZ2UPvLkQ_xuElu29a"
);

const USERS = [
  { username: "mustafa", password: "1234", name: "Mustafa Kuş", role: "admin" },
  { username: "erhan", password: "1234", name: "Erhan Karakuş", role: "idare" },
  { username: "yunus", password: "1234", name: "Yunus Emre Özevren", role: "idare" },
];

const STUDENTS = [
  { ad: "TAHA EFSA", soyad: "AYDIN", oda: "101" },
  { ad: "YUSUF", soyad: "GÜLTEKİN", oda: "101" },
  { ad: "TAİMİA", soyad: "KİSİTU", oda: "102" },
  { ad: "ALMAT", soyad: "DUİSEN", oda: "102" },
  { ad: "JANBOTA", soyad: "BYERIKBOL", oda: "102" },
  { ad: "S M", soyad: "JULKARNİNE", oda: "102" },
  { ad: "İBRAHİM", soyad: "KAPLAN", oda: "201" },
  { ad: "AHMAD ZIA", soyad: "MOHAMMADI", oda: "201" },
  { ad: "YUSUF", soyad: "BAYRAQDAROV", oda: "201" },
  { ad: "ABDULİLLOH", soyad: "HİSAİNZODA", oda: "201" },
  { ad: "EYMEN", soyad: "MERDAN", oda: "202" },
  { ad: "GÜNGÖR BAKİ", soyad: "YÜKSEL", oda: "202" },
  { ad: "MUSTAFA", soyad: "ATEŞ", oda: "202" },
  { ad: "ZEYNEL ABİDİN", soyad: "TOSUN", oda: "202" },
  { ad: "AZIZULLAH", soyad: "MUFTI ZADA", oda: "203" },
  { ad: "MOHAMMAD ZAYAAN", soyad: "ZEHGEER", oda: "203" },
  { ad: "ARİMİYAO", soyad: "TCHAASANTI", oda: "203" },
  { ad: "FAIZANULLAH", soyad: "RAHMANI", oda: "203" },
  { ad: "TİLEKZHAN", soyad: "YESSENGABYL", oda: "204" },
  { ad: "KANATMYRZA", soyad: "ERKİNBEK UULU", oda: "204" },
  { ad: "TAMERLAN", soyad: "KHATSAEV", oda: "204" },
  { ad: "ABDIASIS", soyad: "ABDULLAHI YUSUF", oda: "204" },
  { ad: "MUHAMMED TALHA", soyad: "CEYLAN", oda: "205" },
  { ad: "ADİL TALHA", soyad: "DEMİRAL", oda: "205" },
  { ad: "MEHMET ENES", soyad: "DEMİRAL", oda: "205" },
  { ad: "ÖMER FAZIL", soyad: "ORHAN", oda: "205" },
  { ad: "CONQUERER", soyad: "CHANDİPWİSA", oda: "206" },
  { ad: "FAOZAN", soyad: "UMA", oda: "206" },
  { ad: "ZEYAD", soyad: "MOSA", oda: "206" },
  { ad: "MUHAMMAD", soyad: "MUKIIBI", oda: "206" },
  { ad: "RADWAN", soyad: "ROFİDA", oda: "207" },
  { ad: "GHADEER ABDULAMEER", soyad: "TAHSEEN", oda: "207" },
  { ad: "MOUGHNI", soyad: "MLAMALI MSAIDIE", oda: "207" },
  { ad: "SHOHRUKH", soyad: "RAJABOV", oda: "207" },
  { ad: "KHABIBULLOKH", soyad: "ABDULFATTOEV", oda: "208" },
  { ad: "NURIDDIN ZOKIRJON UGLI", soyad: "JAKBARALIEV", oda: "208" },
  { ad: "YOUSIF KHWAMURAD QADIR", soyad: "AL JAF", oda: "208" },
  { ad: "HAFIZ IJAZ", soyad: "AHMED", oda: "208" },
  { ad: "SALİH", soyad: "METİN", oda: "209" },
  { ad: "ALPER", soyad: "ŞAHİN", oda: "209" },
  { ad: "ENİS", soyad: "YİĞİT", oda: "209" },
  { ad: "ENES", soyad: "YİĞİT", oda: "209" },
  { ad: "IBRAHIM", soyad: "OKENY", oda: "210" },
  { ad: "IDRISS", soyad: "DJAMALAD DINE", oda: "210" },
  { ad: "MOHAMED YEHIA AHMED ALY", soyad: "EİWİS", oda: "210" },
  { ad: "OUMAR", soyad: "ARAMA", oda: "210" },
  { ad: "MAHAMAD WAKİL", soyad: "ANSARİ", oda: "211" },
  { ad: "ADAN ABDI HASSAN", soyad: "ADAN ABDI HASSAN", oda: "211" },
  { ad: "YOUSSOUF", soyad: "MOHAMED WABERİ", oda: "211" },
  { ad: "IKLIL FATHUL AZIZ", soyad: "AZİZ", oda: "211" },
  { ad: "ABDUL", soyad: "WAHEED", oda: "212" },
  { ad: "MD", soyad: "OBAID", oda: "212" },
  { ad: "AHMAD FIRDAOUS", soyad: "BİN MOHD SALEH", oda: "212" },
  { ad: "AMMAR", soyad: "BİN MOHD SATAR", oda: "212" },
];

const ROOM_OPTIONS = [...new Set(STUDENTS.map((s) => s.oda))].sort();

function today() {
  return new Date().toLocaleDateString("tr-TR");
}

function nowTime() {
  return new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
}

export default function Page() {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState({ username: "", password: "" });
  const [tab, setTab] = useState("yeni");
  const [room, setRoom] = useState("101");
  const [records, setRecords] = useState([]);

  const [form, setForm] = useState({
    kontrolTuru: "Haftalık",
    donem: "1. Dönem",
    odaTemizlik: "iyi",
    odaDuzeni: "iyi",
    yatakDuzeni: "iyi",
    genelTemizlik: "iyi",
    arizaVarMi: "yok",
    guvenlikDurumu: "yok",
    genelNot: "",
    temizlikAciklama: "",
    duzenAciklama: "",
    yatakDuzeniAciklama: "",
    genelTemizlikAciklama: "",
    arizaAciklama: "",
    guvenlikAciklama: "",
  });

  const [studentNotes, setStudentNotes] = useState({});

  const roomStudents = useMemo(
    () => STUDENTS.filter((s) => s.oda === room),
    [room]
  );

  useEffect(() => {
    const savedUser = localStorage.getItem("oda_kontrol_user");
    if (savedUser) setUser(JSON.parse(savedUser));
    fetchRecords();
  }, []);

  useEffect(() => {
    const obj = {};
    roomStudents.forEach((s) => {
      const key = `${s.oda}-${s.ad}-${s.soyad}`;
      obj[key] = {
        ogrenciNotu: "",
        saglikDurumu: "",
        ozelDurumVarMi: "yok",
        ozelDurumAciklama: "",
        talepVarMi: "yok",
        talepAciklama: "",
      };
    });
    setStudentNotes(obj);
  }, [roomStudents]);

  const fetchRecords = async () => {
    const { data, error } = await supabase
      .from("oda_kontrolleri")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("KAYIT ÇEKME HATASI:", error);
      return;
    }

    setRecords(
      data.map((r) => ({
        id: r.id,
        room: r.oda_no,
        createdAt: r.created_at,
        kontrolEden: r.kontrol_eden || "-",
        tarih: r.tarih || "-",
        saat: r.saat || "-",
        kontrolTuru: r.kontrol_turu || "-",
        donem: r.donem || "-",
        genelNot: r.genel_not || "",
        odaTemizlik: r.oda_temizlik || "-",
        odaDuzeni: r.oda_duzeni || "-",
        yatakDuzeni: r.yatak_duzeni || "-",
        genelTemizlik: r.genel_temizlik || "-",
        arizaVarMi: r.ariza_var_mi || "-",
        guvenlikDurumu: r.guvenlik_durumu || "-",
      }))
    );
  };

  const handleLogin = () => {
    const found = USERS.find(
      (u) =>
        u.username === login.username.trim().toLowerCase() &&
        u.password === login.password
    );

    if (!found) {
      alert("Kullanıcı adı veya şifre hatalı.");
      return;
    }

    setUser(found);
    localStorage.setItem("oda_kontrol_user", JSON.stringify(found));
  };

  const handleLogout = () => {
    localStorage.removeItem("oda_kontrol_user");
    setUser(null);
  };

  const updateForm = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
  };

  const updateStudent = (key, field, value) => {
    setStudentNotes((p) => ({
      ...p,
      [key]: { ...p[key], [field]: value },
    }));
  };

  const handleSave = async () => {
    const { error } = await supabase.from("oda_kontrolleri").insert([
      {
        oda_no: room,
        kontrol_eden: user?.name || "-",
        kontrol_turu: form.kontrolTuru,
        donem: form.donem,
        tarih: today(),
        saat: nowTime(),

        genel_not: form.genelNot,
        oda_temizlik: form.odaTemizlik,
        oda_duzeni: form.odaDuzeni,
        yatak_duzeni: form.yatakDuzeni,
        genel_temizlik: form.genelTemizlik,
        ariza_var_mi: form.arizaVarMi,
        guvenlik_durumu: form.guvenlikDurumu,

        ariza_aciklama: form.arizaVarMi === "var" ? form.arizaAciklama : null,
        guvenlik_aciklama: form.guvenlikDurumu === "var" ? form.guvenlikAciklama : null,
        temizlik_aciklama: form.odaTemizlik !== "iyi" ? form.temizlikAciklama : null,
        duzen_aciklama: form.odaDuzeni !== "iyi" ? form.duzenAciklama : null,
        yatak_duzeni_aciklama: form.yatakDuzeni !== "iyi" ? form.yatakDuzeniAciklama : null,
        genel_temizlik_aciklama: form.genelTemizlik !== "iyi" ? form.genelTemizlikAciklama : null,
      },
    ]);

    if (error) {
      console.log("SUPABASE HATA:", error);
      alert("Hata: " + error.message);
      return;
    }

    alert("Kayıt başarıyla kaydedildi.");
    await fetchRecords();
    setTab("kayitlar");
  };

  if (!user) {
    return (
      <div style={styles.loginPage}>
        <div style={styles.loginLeft}>
          <div style={styles.brandMain}>TDV YURTLAR</div>
          <div style={styles.brandSub}>Oda Kontrol ve Takip Sistemi</div>
          <div style={styles.brandText}>
            Haftalık ve aylık oda kontrolleri için yetkili personel giriş ekranı.
          </div>
        </div>

        <div style={styles.loginCard}>
          <h2>Personel Girişi</h2>
          <input
            style={styles.input}
            placeholder="Kullanıcı adı"
            value={login.username}
            onChange={(e) => setLogin({ ...login, username: e.target.value })}
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Şifre"
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          />
          <button style={styles.primaryButton} onClick={handleLogin}>
            Giriş Yap
          </button>
          <div style={styles.demoInfo}>
            mustafa / 1234<br />
            erhan / 1234<br />
            yunus / 1234
          </div>
        </div>
      </div>
    );
  }

  const roomHistory = records.filter((r) => r.room === room);

  return (
    <div style={styles.page}>
      <div style={styles.topCard}>
        <div>
          <div style={styles.pageTitle}>TDV Oda Kontrol Sistemi</div>
          <div style={styles.pageSubTitle}>
            Hoş geldiniz, {user.name} ({user.role})
          </div>
        </div>
        <div style={styles.topActions}>
          <button style={tab === "yeni" ? styles.tabActive : styles.tabButton} onClick={() => setTab("yeni")}>Yeni Kontrol</button>
          <button style={tab === "gecmis" ? styles.tabActive : styles.tabButton} onClick={() => setTab("gecmis")}>Oda Geçmişi</button>
          <button style={tab === "kayitlar" ? styles.tabActive : styles.tabButton} onClick={() => setTab("kayitlar")}>Kayıtlar</button>
          <button style={styles.logoutButton} onClick={handleLogout}>Çıkış</button>
        </div>
      </div>

      {tab === "yeni" && (
        <div style={styles.grid}>
          <div>
            <div style={styles.card}>
              <h2>Oda Seçimi</h2>
              <select style={styles.input} value={room} onChange={(e) => setRoom(e.target.value)}>
                {ROOM_OPTIONS.map((r) => <option key={r} value={r}>Oda {r}</option>)}
              </select>
              <div style={styles.summaryBox}>
                Toplam Kontrol: {roomHistory.length}
              </div>
            </div>

            <div style={styles.card}>
              <h2>Önceki Kontrol Özeti</h2>
              {roomHistory.length === 0 ? "Bu oda için henüz kayıt yok." : (
                <div>
                  <strong>{roomHistory[0].tarih}</strong> - {roomHistory[0].kontrolEden}<br />
                  Temizlik: {roomHistory[0].odaTemizlik}<br />
                  Düzen: {roomHistory[0].odaDuzeni}
                </div>
              )}
            </div>
          </div>

          <div>
            <div style={styles.card}>
              <h2>Yeni Oda Kontrolü</h2>
              <div style={styles.twoCol}>
                <div>
                  <label style={styles.label}>Kontrol Türü</label>
                  <select style={styles.input} value={form.kontrolTuru} onChange={(e) => updateForm("kontrolTuru", e.target.value)}>
                    <option>Haftalık</option>
                    <option>Aylık</option>
                  </select>
                </div>
                <div>
                  <label style={styles.label}>Dönem</label>
                  <select style={styles.input} value={form.donem} onChange={(e) => updateForm("donem", e.target.value)}>
                    <option>1. Dönem</option>
                    <option>2. Dönem</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={styles.card}>
              <h2>Oda Genel Değerlendirmesi</h2>
              <Field title="Oda Temizliği" value={form.odaTemizlik} onChange={(v) => updateForm("odaTemizlik", v)} />
              {form.odaTemizlik !== "iyi" && <Text value={form.temizlikAciklama} onChange={(v) => updateForm("temizlikAciklama", v)} placeholder="Temizlik açıklaması" />}

              <Field title="Oda Düzeni" value={form.odaDuzeni} onChange={(v) => updateForm("odaDuzeni", v)} />
              {form.odaDuzeni !== "iyi" && <Text value={form.duzenAciklama} onChange={(v) => updateForm("duzenAciklama", v)} placeholder="Düzen açıklaması" />}

              <Field title="Yatak Düzeni" value={form.yatakDuzeni} onChange={(v) => updateForm("yatakDuzeni", v)} />
              {form.yatakDuzeni !== "iyi" && <Text value={form.yatakDuzeniAciklama} onChange={(v) => updateForm("yatakDuzeniAciklama", v)} placeholder="Yatak düzeni açıklaması" />}

              <Field title="Genel Temizlik" value={form.genelTemizlik} onChange={(v) => updateForm("genelTemizlik", v)} />
              {form.genelTemizlik !== "iyi" && <Text value={form.genelTemizlikAciklama} onChange={(v) => updateForm("genelTemizlikAciklama", v)} placeholder="Genel temizlik açıklaması" />}

              <YesNo title="Odada Arıza Var mı?" value={form.arizaVarMi} onChange={(v) => updateForm("arizaVarMi", v)} />
              {form.arizaVarMi === "var" && <Text value={form.arizaAciklama} onChange={(v) => updateForm("arizaAciklama", v)} placeholder="Arıza açıklaması" />}

              <YesNo title="Güvenlik Açısından Dikkat Gerektiren Durum Var mı?" value={form.guvenlikDurumu} onChange={(v) => updateForm("guvenlikDurumu", v)} />
              {form.guvenlikDurumu === "var" && <Text value={form.guvenlikAciklama} onChange={(v) => updateForm("guvenlikAciklama", v)} placeholder="Güvenlik açıklaması" />}

              <Text value={form.genelNot} onChange={(v) => updateForm("genelNot", v)} placeholder="Genel not" />
            </div>

            <div style={styles.card}>
              <h2>Odadaki Öğrenciler</h2>
              {roomStudents.map((s) => {
                const key = `${s.oda}-${s.ad}-${s.soyad}`;
                const n = studentNotes[key] || {};
                return (
                  <div key={key} style={styles.studentCard}>
                    <h3>{s.ad} {s.soyad}</h3>
                    <Text value={n.ogrenciNotu || ""} onChange={(v) => updateStudent(key, "ogrenciNotu", v)} placeholder="Öğrenci notu" />
                    <input style={styles.input} placeholder="Sağlık durumu" value={n.saglikDurumu || ""} onChange={(e) => updateStudent(key, "saglikDurumu", e.target.value)} />
                    <YesNo title="Özel Durum Var mı?" value={n.ozelDurumVarMi || "yok"} onChange={(v) => updateStudent(key, "ozelDurumVarMi", v)} />
                    {n.ozelDurumVarMi === "var" && <Text value={n.ozelDurumAciklama || ""} onChange={(v) => updateStudent(key, "ozelDurumAciklama", v)} placeholder="Özel durum açıklaması" />}
                    <YesNo title="İstek / Öneri / Şikayet Var mı?" value={n.talepVarMi || "yok"} onChange={(v) => updateStudent(key, "talepVarMi", v)} />
                    {n.talepVarMi === "var" && <Text value={n.talepAciklama || ""} onChange={(v) => updateStudent(key, "talepAciklama", v)} placeholder="Talep açıklaması" />}
                  </div>
                );
              })}

              <button style={styles.primaryButton} onClick={handleSave}>Kaydet</button>
            </div>
          </div>
        </div>
      )}

      {tab === "gecmis" && (
        <div style={styles.card}>
          <h2>Oda {room} Geçmişi</h2>
          {roomHistory.length === 0 ? "Kayıt yok." : roomHistory.map((r) => (
            <div style={styles.historyCard} key={r.id}>
              <strong>{r.tarih} - {r.saat}</strong><br />
              Kontrol Eden: {r.kontrolEden}<br />
              Tür: {r.kontrolTuru}<br />
              Dönem: {r.donem}<br />
              Genel Not: {r.genelNot || "-"}
            </div>
          ))}
        </div>
      )}

      {tab === "kayitlar" && (
        <div style={styles.card}>
          <h2>Tüm Kayıtlar</h2>
          {records.length === 0 ? "Kayıt yok." : records.map((r) => (
            <div style={styles.historyCard} key={r.id}>
              <strong>Oda {r.room}</strong> - {r.tarih} - {r.saat}<br />
              Kontrol Eden: {r.kontrolEden}<br />
              Genel Not: {r.genelNot || "-"}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Field({ title, value, onChange }) {
  return (
    <>
      <label style={styles.label}>{title}</label>
      <select style={styles.input} value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="iyi">İyi</option>
        <option value="orta">Orta</option>
        <option value="kotu">Kötü</option>
      </select>
    </>
  );
}

function YesNo({ title, value, onChange }) {
  return (
    <>
      <label style={styles.label}>{title}</label>
      <select style={styles.input} value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="yok">Yok</option>
        <option value="var">Var</option>
      </select>
    </>
  );
}

function Text({ value, onChange, placeholder }) {
  return (
    <textarea
      style={styles.textarea}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

const styles = {
  loginPage: { minHeight: "100vh", background: "#eef2f6", display: "grid", gridTemplateColumns: "1fr 1fr", padding: 32, gap: 24 },
  loginLeft: { background: "#0d2d6c", color: "#fff", borderRadius: 24, padding: 48, display: "flex", flexDirection: "column", justifyContent: "center" },
  brandMain: { fontSize: 56, fontWeight: 800 },
  brandSub: { fontSize: 28, fontWeight: 700, marginTop: 16 },
  brandText: { marginTop: 24, fontSize: 18, lineHeight: 1.6 },
  loginCard: { background: "#fff", borderRadius: 24, padding: 36, alignSelf: "center" },
  page: { minHeight: "100vh", background: "#eef2f6", padding: 24 },
  topCard: { background: "#fff", borderRadius: 22, padding: 28, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
  pageTitle: { fontSize: 34, fontWeight: 800, color: "#0d2d6c" },
  pageSubTitle: { color: "#667085", marginTop: 8 },
  topActions: { display: "flex", gap: 10 },
  tabButton: { padding: "12px 18px", borderRadius: 12, border: "1px solid #ddd", background: "#fff", cursor: "pointer" },
  tabActive: { padding: "12px 18px", borderRadius: 12, border: "none", background: "#0d2d6c", color: "#fff", cursor: "pointer" },
  logoutButton: { padding: "12px 18px", borderRadius: 12, border: "none", background: "#ef4444", color: "#fff", cursor: "pointer" },
  grid: { display: "grid", gridTemplateColumns: "360px 1fr", gap: 24 },
  card: { background: "#fff", borderRadius: 22, padding: 24, marginBottom: 24 },
  input: { width: "100%", padding: 14, borderRadius: 12, border: "1px solid #d0d5dd", marginBottom: 14, boxSizing: "border-box" },
  textarea: { width: "100%", minHeight: 90, padding: 14, borderRadius: 12, border: "1px solid #d0d5dd", marginBottom: 14, boxSizing: "border-box" },
  label: { display: "block", fontWeight: 700, marginBottom: 8 },
  primaryButton: { padding: "14px 22px", borderRadius: 12, border: "none", background: "#0d2d6c", color: "#fff", cursor: "pointer", fontWeight: 700 },
  summaryBox: { background: "#f8fafc", borderRadius: 14, padding: 16 },
  studentCard: { border: "1px solid #eee", borderRadius: 16, padding: 16, marginBottom: 16 },
  historyCard: { border: "1px solid #eee", borderRadius: 16, padding: 16, marginBottom: 14, lineHeight: 1.8 },
  demoInfo: { marginTop: 18, background: "#f8fafc", borderRadius: 14, padding: 14, lineHeight: 1.8 },
};
