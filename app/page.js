"use client";

import { useEffect, useMemo, useState } from "react";

const USERS = [
  { username: "mustafa", password: "1234", name: "Mustafa Kuş", role: "admin" },
  { username: "erhan", password: "1234", name: "Erhan Karakuş", role: "idare" },
  { username: "yunus", password: "1234", name: "Yunus Emre Özevren", role: "idare" },
];

const STUDENTS = [
  { ad: "ENES", soyad: "YİĞİT", oda: "209" },
  { ad: "GÜNGÖR BAKİ", soyad: "YÜKSEL", oda: "202" },
  { ad: "ALİ OSMAN", soyad: "YILDIZ", oda: "301" },
  { ad: "MUSTAFA", soyad: "ÖZÖGET", oda: "308" },
  { ad: "MUHAMMED TALHA", soyad: "CEYLAN", oda: "205" },
  { ad: "CAVİT", soyad: "KARAMAN", oda: "301" },
  { ad: "MEHMET RIZA", soyad: "ŞAHİN", oda: "302" },
  { ad: "HUZEYFE KEMAL", soyad: "BEDİRHANGİL", oda: "302" },
  { ad: "AHMET YASİN", soyad: "YÜKSEL", oda: "302" },
  { ad: "MEHMET ENES", soyad: "DEMİRAL", oda: "205" },
  { ad: "ADİL TALHA", soyad: "DEMİRAL", oda: "205" },
  { ad: "İBRAHİM", soyad: "GENÇ", oda: "308" },
  { ad: "SALİH", soyad: "METİN", oda: "209" },
  { ad: "AHMET TALHA", soyad: "ÇELİKER", oda: "301" },
  { ad: "ALPER", soyad: "ŞAHİN", oda: "209" },
  { ad: "SEYYİD AHMET", soyad: "KILIÇARSLAN", oda: "308" },
  { ad: "TAHA EFSA", soyad: "AYDIN", oda: "101" },
  { ad: "ÖMER FAZIL", soyad: "ORHAN", oda: "205" },
  { ad: "MUSTAFA", soyad: "ATEŞ", oda: "202" },
  { ad: "İBRAHİM", soyad: "KAPLAN", oda: "201" },
  { ad: "ÖMER CAN", soyad: "SALİCİ", oda: "302" },
  { ad: "YUSUF", soyad: "GÜLTEKİN", oda: "101" },
  { ad: "ZEYNEL ABİDİN", soyad: "TOSUN", oda: "202" },
  { ad: "HAMİT", soyad: "SEYİTMEHMETOĞLU", oda: "313" },
  { ad: "ÖMER FARUK", soyad: "BOZ", oda: "310" },
  { ad: "TEMİR POLAT", soyad: "ALANKUŞ", oda: "310" },
  { ad: "ENİS", soyad: "YİĞİT", oda: "209" },
  { ad: "AHMET YUSUF", soyad: "GÖÇER", oda: "308" },
  { ad: "EYMEN", soyad: "MERDAN", oda: "202" },
  { ad: "IKLIL FATHUL AZIZ", soyad: "AZİZ", oda: "211" },
  { ad: "EMİL", soyad: "KHAİROYEV", oda: "309" },
  { ad: "MOHAMMAD ZAYAAN", soyad: "ZEHGEER", oda: "203" },
  { ad: "YUSUF", soyad: "BAYRAQDAROV", oda: "201" },
  { ad: "IDRISS", soyad: "DJAMALAD DINE", oda: "210" },
  { ad: "ARİMİYAO", soyad: "TCHAASANTI", oda: "203" },
  { ad: "MESUD MUBAREK", soyad: "NUREDDİN", oda: "306" },
  { ad: "ZEYAD", soyad: "MOSA", oda: "206" },
  { ad: "ABDULRAHMAN", soyad: "RAMADHAN", oda: "303" },
  { ad: "AMINUL", soyad: "ISLAM", oda: "313" },
  { ad: "S M", soyad: "JULKARNİNE", oda: "102" },
  { ad: "ABDOUL KHADRY", soyad: "NDIAYE", oda: "304" },
  { ad: "OUMAR", soyad: "ARAMA", oda: "210" },
  { ad: "MOHAMED YEHIA AHMED ALY", soyad: "EİWİS", oda: "210" },
  { ad: "MUTTEIULLAH", soyad: "YOUSUFI", oda: "312" },
  { ad: "RİDWAN OLAJİDE", soyad: "NAFİU", oda: "303" },
  { ad: "MOUSSA", soyad: "TRAORE", oda: "306" },
  { ad: "MOHAMED", soyad: "ALİ MOHAMED", oda: "312" },
  { ad: "JANBOTA", soyad: "BYERIKBOL", oda: "102" },
  { ad: "HUSSAM", soyad: "ALHADDAD", oda: "309" },
  { ad: "TİLEKZHAN", soyad: "YESSENGABYL", oda: "204" },
  { ad: "ALMAT", soyad: "DUİSEN", oda: "102" },
  { ad: "ADİLET", soyad: "MUSSALİMOV", oda: "309" },
  { ad: "GHADEER ABDULAMEER", soyad: "TAHSEEN", oda: "207" },
  { ad: "RADWAN", soyad: "ROFİDA", oda: "207" },
  { ad: "JAD", soyad: "ABOU ALİ", oda: "309" },
  { ad: "ABDOURAHMANE AG İNAZOUM", soyad: "CİSSE", oda: "306" },
  { ad: "MOHAMAD", soyad: "NORAIMAN", oda: "312" },
  { ad: "HASSAN", soyad: "MOHAMED AHMED", oda: "303" },
  { ad: "AMMAR", soyad: "BİN MOHD SATAR", oda: "212" },
  { ad: "UMAR", soyad: "ABDIBALIEV", oda: "305" },
  { ad: "MOHAMED FATHİ ARABİ", soyad: "KAFO", oda: "312" },
  { ad: "MOUHAMED", soyad: "DIOP", oda: "311" },
  { ad: "ELMIR", soyad: "SADIGOV", oda: "313" },
  { ad: "ABDULİLLOH", soyad: "HİSAİNZODA", oda: "201" },
  { ad: "MOHAMMED AWAL", soyad: "ABDUL GANİYU", oda: "303" },
  { ad: "FAOZAN", soyad: "UMA", oda: "206" },
  { ad: "IBRAHIM ABDUMALIK", soyad: "ABDUKERIM", oda: "311" },
  { ad: "AHAMET", soyad: "BADAMASSI ELHADJI AOUTA", oda: "306" },
  { ad: "MD", soyad: "OBAID", oda: "212" },
  { ad: "ABDUL", soyad: "WAHEED", oda: "212" },
  { ad: "AHMAD FIRDAOUS", soyad: "BİN MOHD SALEH", oda: "212" },
  { ad: "TAMERLAN", soyad: "KHATSAEV", oda: "204" },
  { ad: "MAMADU ALPHA", soyad: "BAH", oda: "305" },
  { ad: "FAIZANULLAH", soyad: "RAHMANI", oda: "203" },
  { ad: "ADAN ABDI HASSAN", soyad: "ADAN ABDI HASSAN", oda: "211" },
  { ad: "MUHAMMED", soyad: "ASHOUR", oda: "307" },
  { ad: "MOHAMED ABDELLAHİ", soyad: "BEZEİD", oda: "305" },
  { ad: "AZIZULLAH", soyad: "MUFTI ZADA", oda: "203" },
  { ad: "YOUSSOUF", soyad: "MOHAMED WABERİ", oda: "211" },
  { ad: "TAİMİA", soyad: "KİSİTU", oda: "102" },
  { ad: "ASGAT", soyad: "SAMİGULLİN", oda: "307" },
  { ad: "ABDUL BASHIR", soyad: "NOOR", oda: "305" },
  { ad: "JUNAID OMAR", soyad: "MWACHANDE", oda: "304" },
  { ad: "MOUGHNI", soyad: "MLAMALI MSAIDIE", oda: "207" },
  { ad: "MAHAMAD WAKİL", soyad: "ANSARİ", oda: "211" },
  { ad: "MOHAMAD", soyad: "ALHLIBI", oda: "307" },
  { ad: "AHMAD ZIA", soyad: "MOHAMMADI", oda: "201" },
  { ad: "YOUSIF KHWAMURAD QADIR", soyad: "AL JAF", oda: "208" },
  { ad: "MOHAMED ALIEU", soyad: "BAH", oda: "311" },
  { ad: "HASAN", soyad: "DIAB", oda: "313" },
  { ad: "SHOHRUKH", soyad: "RAJABOV", oda: "207" },
  { ad: "NURIDDIN ZOKIRJON UGLI", soyad: "JAKBARALIEV", oda: "208" },
  { ad: "CONQUERER", soyad: "CHANDİPWİSA", oda: "206" },
  { ad: "ADAM", soyad: "BOTTOM", oda: "304" },
  { ad: "ADAMA", soyad: "DEME", oda: "311" },
  { ad: "KHABIBULLOKH", soyad: "ABDULFATTOEV", oda: "208" },
  { ad: "KANATMYRZA", soyad: "ERKİNBEK UULU", oda: "204" },
  { ad: "HAFIZ IJAZ", soyad: "AHMED", oda: "208" },
  { ad: "SAİD", soyad: "CERRAH", oda: "307" },
  { ad: "IBRAHIM", soyad: "OKENY", oda: "210" },
  { ad: "İBRAHİM", soyad: "AYIKİ RAFIU", oda: "304" },
  { ad: "ABDIASIS", soyad: "ABDULLAHI YUSUF", oda: "204" },
  { ad: "MUHAMMAD", soyad: "MUKIIBI", oda: "206" },
];

const ROOM_OPTIONS = [
  "101","102","201","202","203","204","205","206","207","208","209",
  "210","211","212","301","302","303","304","305","306","307","308",
  "309","310","311","312","313"
];

function formatDate(date = new Date()) {
  return date.toLocaleDateString("tr-TR");
}

function formatTime(date = new Date()) {
  return date.toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getIssueTypeLabel(value) {
  const map = {
    iyi: "İyi",
    orta: "Orta",
    kotu: "Kötü",
    yok: "Yok",
    var: "Var",
  };
  return map[value] || value;
}

export default function Page() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [activeTab, setActiveTab] = useState("yeni");

  const [room, setRoom] = useState("101");
  const [records, setRecords] = useState([]);

  const roomStudents = useMemo(() => {
    return STUDENTS.filter((student) => student.oda === room);
  }, [room]);

  const [form, setForm] = useState({
    kontrolTuru: "Haftalık",
    donem: "1. Dönem",
    kontrolEden: "",
    tarih: formatDate(),
    saat: formatTime(),
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

  useEffect(() => {
    const savedUser = localStorage.getItem("oda_kontrol_user");
    const savedRecords = localStorage.getItem("oda_kontrol_records");

    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setCurrentUser(parsedUser);
      setForm((prev) => ({
        ...prev,
        kontrolEden: parsedUser.name,
      }));
    }

    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("oda_kontrol_records", JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    if (!currentUser) return;

    setForm((prev) => ({
      ...prev,
      kontrolEden: currentUser.name,
      tarih: formatDate(),
      saat: formatTime(),
    }));

    const initialStudentNotes = {};
    roomStudents.forEach((student) => {
      const key = `${student.oda}-${student.ad}-${student.soyad}`;
      initialStudentNotes[key] = {
        ogrenciNotu: "",
        saglikDurumu: "",
        ozelDurumVarMi: "yok",
        ozelDurumAciklama: "",
        talepVarMi: "yok",
        talepAciklama: "",
      };
    });
    setStudentNotes(initialStudentNotes);
  }, [room, currentUser, roomStudents]);

  const previousRoomRecord = useMemo(() => {
    const filtered = records.filter((record) => record.room === room);
    if (filtered.length === 0) return null;
    return filtered[filtered.length - 1];
  }, [records, room]);

  const handleLogin = () => {
    const foundUser = USERS.find(
      (user) =>
        user.username === loginForm.username.trim().toLowerCase() &&
        user.password === loginForm.password
    );

    if (!foundUser) {
      alert("Kullanıcı adı veya şifre hatalı.");
      return;
    }

    setCurrentUser(foundUser);
    localStorage.setItem("oda_kontrol_user", JSON.stringify(foundUser));
    setForm((prev) => ({
      ...prev,
      kontrolEden: foundUser.name,
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("oda_kontrol_user");
    setCurrentUser(null);
    setLoginForm({ username: "", password: "" });
  };

  const updateForm = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateStudentNote = (key, field, value) => {
    setStudentNotes((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };

  const validateForm = () => {
    if (!room) {
      alert("Lütfen oda seçiniz.");
      return false;
    }

    const conditionalChecks = [
      { condition: form.odaTemizlik !== "iyi", field: form.temizlikAciklama, message: "Temizlik açıklamasını yazınız." },
      { condition: form.odaDuzeni !== "iyi", field: form.duzenAciklama, message: "Düzen açıklamasını yazınız." },
      { condition: form.yatakDuzeni !== "iyi", field: form.yatakDuzeniAciklama, message: "Yatak düzeni açıklamasını yazınız." },
      { condition: form.genelTemizlik !== "iyi", field: form.genelTemizlikAciklama, message: "Genel temizlik açıklamasını yazınız." },
      { condition: form.arizaVarMi === "var", field: form.arizaAciklama, message: "Arıza açıklamasını yazınız." },
      { condition: form.guvenlikDurumu === "var", field: form.guvenlikAciklama, message: "Güvenlik açıklamasını yazınız." },
    ];

    for (const item of conditionalChecks) {
      if (item.condition && !item.field.trim()) {
        alert(item.message);
        return false;
      }
    }

    for (const [key, value] of Object.entries(studentNotes)) {
      if (value.ozelDurumVarMi === "var" && !value.ozelDurumAciklama.trim()) {
        alert("Özel durum işaretlenen öğrenci için açıklama yazınız.");
        return false;
      }
      if (value.talepVarMi === "var" && !value.talepAciklama.trim()) {
        alert("Talep/şikayet işaretlenen öğrenci için açıklama yazınız.");
        return false;
      }
    }

    return true;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const newRecord = {
      id: Date.now(),
      room,
      createdAt: new Date().toISOString(),
      kontrolTuru: form.kontrolTuru,
      donem: form.donem,
      kontrolEden: form.kontrolEden,
      tarih: form.tarih,
      saat: form.saat,
      odaTemizlik: form.odaTemizlik,
      odaDuzeni: form.odaDuzeni,
      yatakDuzeni: form.yatakDuzeni,
      genelTemizlik: form.genelTemizlik,
      arizaVarMi: form.arizaVarMi,
      guvenlikDurumu: form.guvenlikDurumu,
      genelNot: form.genelNot,
      temizlikAciklama: form.temizlikAciklama,
      duzenAciklama: form.duzenAciklama,
      yatakDuzeniAciklama: form.yatakDuzeniAciklama,
      genelTemizlikAciklama: form.genelTemizlikAciklama,
      arizaAciklama: form.arizaAciklama,
      guvenlikAciklama: form.guvenlikAciklama,
      students: roomStudents.map((student) => {
        const key = `${student.oda}-${student.ad}-${student.soyad}`;
        return {
          ...student,
          ...studentNotes[key],
        };
      }),
    };

    setRecords((prev) => [...prev, newRecord]);
    alert("Kayıt başarıyla eklendi.");

    setForm((prev) => ({
      ...prev,
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
      tarih: formatDate(),
      saat: formatTime(),
    }));

    const resetStudentNotes = {};
    roomStudents.forEach((student) => {
      const key = `${student.oda}-${student.ad}-${student.soyad}`;
      resetStudentNotes[key] = {
        ogrenciNotu: "",
        saglikDurumu: "",
        ozelDurumVarMi: "yok",
        ozelDurumAciklama: "",
        talepVarMi: "yok",
        talepAciklama: "",
      };
    });
    setStudentNotes(resetStudentNotes);

    setActiveTab("kayitlar");
  };

  if (!currentUser) {
    return (
      <div style={styles.loginPage}>
        <div style={styles.loginLeft}>
          <div style={styles.brandMain}>TDV YURTLAR</div>
          <div style={styles.brandSub}>
            Türkiye Diyanet Vakfı
            <br />
            Oda Kontrol ve Takip Sistemi
          </div>
          <div style={styles.brandText}>
            Yetkili personel giriş yaparak haftalık ve aylık oda kontrollerini
            sistem üzerinden kayıt altına alabilir.
          </div>
        </div>

        <div style={styles.loginCard}>
          <div style={styles.loginTitle}>Personel Girişi</div>
          <div style={styles.loginDescription}>
            Kullanıcı adı ve şifreniz ile giriş yapınız.
          </div>

          <input
            style={styles.input}
            placeholder="Kullanıcı adı"
            value={loginForm.username}
            onChange={(e) =>
              setLoginForm((prev) => ({ ...prev, username: e.target.value }))
            }
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Şifre"
            value={loginForm.password}
            onChange={(e) =>
              setLoginForm((prev) => ({ ...prev, password: e.target.value }))
            }
          />

          <button style={styles.primaryButton} onClick={handleLogin}>
            Giriş Yap
          </button>

          <div style={styles.demoInfo}>
            <div><strong>Yönetici:</strong> mustafa / 1234</div>
            <div><strong>İdare:</strong> erhan / 1234</div>
            <div><strong>İdare:</strong> yunus / 1234</div>
          </div>
        </div>
      </div>
    );
  }

  const roomHistory = records
    .filter((record) => record.room === room)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div style={styles.page}>
      <div style={styles.topCard}>
        <div>
          <div style={styles.pageTitle}>TDV Oda Kontrol Sistemi</div>
          <div style={styles.pageSubTitle}>
            Hoş geldiniz, {currentUser.name} ({currentUser.role})
          </div>
        </div>

        <div style={styles.topActions}>
          <button
            style={activeTab === "yeni" ? styles.tabActive : styles.tabButton}
            onClick={() => setActiveTab("yeni")}
          >
            Yeni Kontrol
          </button>
          <button
            style={activeTab === "gecmis" ? styles.tabActive : styles.tabButton}
            onClick={() => setActiveTab("gecmis")}
          >
            Oda Geçmişi
          </button>
          <button
            style={activeTab === "kayitlar" ? styles.tabActive : styles.tabButton}
            onClick={() => setActiveTab("kayitlar")}
          >
            Kayıtlar
          </button>
          <button style={styles.logoutButton} onClick={handleLogout}>
            Çıkış
          </button>
        </div>
      </div>

      {activeTab === "yeni" && (
        <div style={styles.grid}>
          <div>
            <div style={styles.card}>
              <div style={styles.sectionTitle}>Oda Seçimi</div>

              <select
                style={styles.input}
                value={room}
                onChange={(e) => setRoom(e.target.value)}
              >
                {ROOM_OPTIONS.map((roomOption) => (
                  <option key={roomOption} value={roomOption}>
                    Oda {roomOption}
                  </option>
                ))}
              </select>

              <div style={styles.summaryBox}>
                <div><strong>Toplam Kontrol:</strong> {roomHistory.length}</div>
                <div>
                  <strong>Takip Gerektiren:</strong>{" "}
                  {
                    roomHistory.filter(
                      (record) =>
                        record.arizaVarMi === "var" ||
                        record.guvenlikDurumu === "var" ||
                        record.odaTemizlik !== "iyi" ||
                        record.odaDuzeni !== "iyi" ||
                        record.yatakDuzeni !== "iyi" ||
                        record.genelTemizlik !== "iyi"
                    ).length
                  }
                </div>
              </div>
            </div>

            <div style={styles.card}>
              <div style={styles.sectionTitle}>Önceki Kontrol Özeti</div>
              {!previousRoomRecord ? (
                <div style={styles.emptyText}>Bu oda için henüz kontrol kaydı yok.</div>
              ) : (
                <div style={styles.previousBox}>
                  <div><strong>Tarih:</strong> {previousRoomRecord.tarih}</div>
                  <div><strong>Saat:</strong> {previousRoomRecord.saat}</div>
                  <div><strong>Kontrol Eden:</strong> {previousRoomRecord.kontrolEden}</div>
                  <div><strong>Temizlik:</strong> {getIssueTypeLabel(previousRoomRecord.odaTemizlik)}</div>
                  <div><strong>Düzen:</strong> {getIssueTypeLabel(previousRoomRecord.odaDuzeni)}</div>
                  <div><strong>Yatak Düzeni:</strong> {getIssueTypeLabel(previousRoomRecord.yatakDuzeni)}</div>
                  <div><strong>Genel Temizlik:</strong> {getIssueTypeLabel(previousRoomRecord.genelTemizlik)}</div>
                  <div><strong>Arıza:</strong> {getIssueTypeLabel(previousRoomRecord.arizaVarMi)}</div>
                  <div><strong>Güvenlik:</strong> {getIssueTypeLabel(previousRoomRecord.guvenlikDurumu)}</div>
                </div>
              )}
            </div>
          </div>

          <div>
            <div style={styles.card}>
              <div style={styles.sectionTitle}>Yeni Oda Kontrolü</div>

              <div style={styles.twoCol}>
                <div>
                  <label style={styles.label}>Kontrol Türü</label>
                  <select
                    style={styles.input}
                    value={form.kontrolTuru}
                    onChange={(e) => updateForm("kontrolTuru", e.target.value)}
                  >
                    <option>Haftalık</option>
                    <option>Aylık</option>
                  </select>
                </div>

                <div>
                  <label style={styles.label}>Dönem</label>
                  <select
                    style={styles.input}
                    value={form.donem}
                    onChange={(e) => updateForm("donem", e.target.value)}
                  >
                    <option>1. Dönem</option>
                    <option>2. Dönem</option>
                  </select>
                </div>

                <div>
                  <label style={styles.label}>Kontrol Eden</label>
                  <input style={styles.input} value={form.kontrolEden} readOnly />
                </div>

                <div>
                  <label style={styles.label}>Oda</label>
                  <input style={styles.input} value={`Oda ${room}`} readOnly />
                </div>

                <div>
                  <label style={styles.label}>Tarih</label>
                  <input style={styles.input} value={form.tarih} readOnly />
                </div>

                <div>
                  <label style={styles.label}>Saat</label>
                  <input style={styles.input} value={form.saat} readOnly />
                </div>
              </div>
            </div>

            <div style={styles.card}>
              <div style={styles.sectionTitle}>Oda Genel Değerlendirmesi</div>

              <div style={styles.twoCol}>
                <div>
                  <label style={styles.label}>Oda Temizliği</label>
                  <select
                    style={styles.input}
                    value={form.odaTemizlik}
                    onChange={(e) => updateForm("odaTemizlik", e.target.value)}
                  >
                    <option value="iyi">İyi</option>
                    <option value="orta">Orta</option>
                    <option value="kotu">Kötü</option>
                  </select>
                  {form.odaTemizlik !== "iyi" && (
                    <textarea
                      style={styles.textarea}
                      placeholder="Temizlik açıklaması"
                      value={form.temizlikAciklama}
                      onChange={(e) => updateForm("temizlikAciklama", e.target.value)}
                    />
                  )}
                </div>

                <div>
                  <label style={styles.label}>Oda Düzeni</label>
                  <select
                    style={styles.input}
                    value={form.odaDuzeni}
                    onChange={(e) => updateForm("odaDuzeni", e.target.value)}
                  >
                    <option value="iyi">İyi</option>
                    <option value="orta">Orta</option>
                    <option value="kotu">Kötü</option>
                  </select>
                  {form.odaDuzeni !== "iyi" && (
                    <textarea
                      style={styles.textarea}
                      placeholder="Düzen açıklaması"
                      value={form.duzenAciklama}
                      onChange={(e) => updateForm("duzenAciklama", e.target.value)}
                    />
                  )}
                </div>

                <div>
                  <label style={styles.label}>Yatak Düzeni</label>
                  <select
                    style={styles.input}
                    value={form.yatakDuzeni}
                    onChange={(e) => updateForm("yatakDuzeni", e.target.value)}
                  >
                    <option value="iyi">İyi</option>
                    <option value="orta">Orta</option>
                    <option value="kotu">Kötü</option>
                  </select>
                  {form.yatakDuzeni !== "iyi" && (
                    <textarea
                      style={styles.textarea}
                      placeholder="Yatak düzeni açıklaması"
                      value={form.yatakDuzeniAciklama}
                      onChange={(e) => updateForm("yatakDuzeniAciklama", e.target.value)}
                    />
                  )}
                </div>

                <div>
                  <label style={styles.label}>Genel Temizlik</label>
                  <select
                    style={styles.input}
                    value={form.genelTemizlik}
                    onChange={(e) => updateForm("genelTemizlik", e.target.value)}
                  >
                    <option value="iyi">İyi</option>
                    <option value="orta">Orta</option>
                    <option value="kotu">Kötü</option>
                  </select>
                  {form.genelTemizlik !== "iyi" && (
                    <textarea
                      style={styles.textarea}
                      placeholder="Genel temizlik açıklaması"
                      value={form.genelTemizlikAciklama}
                      onChange={(e) => updateForm("genelTemizlikAciklama", e.target.value)}
                    />
                  )}
                </div>

                <div>
                  <label style={styles.label}>Odada Arıza Var mı?</label>
                  <select
                    style={styles.input}
                    value={form.arizaVarMi}
                    onChange={(e) => updateForm("arizaVarMi", e.target.value)}
                  >
                    <option value="yok">Yok</option>
                    <option value="var">Var</option>
                  </select>
                  {form.arizaVarMi === "var" && (
                    <textarea
                      style={styles.textarea}
                      placeholder="Arıza açıklaması"
                      value={form.arizaAciklama}
                      onChange={(e) => updateForm("arizaAciklama", e.target.value)}
                    />
                  )}
                </div>

                <div>
                  <label style={styles.label}>Güvenlik Açısından Dikkat Gerektiren Durum Var mı?</label>
                  <select
                    style={styles.input}
                    value={form.guvenlikDurumu}
                    onChange={(e) => updateForm("guvenlikDurumu", e.target.value)}
                  >
                    <option value="yok">Yok</option>
                    <option value="var">Var</option>
                  </select>
                  {form.guvenlikDurumu === "var" && (
                    <textarea
                      style={styles.textarea}
                      placeholder="Güvenlik açıklaması"
                      value={form.guvenlikAciklama}
                      onChange={(e) => updateForm("guvenlikAciklama", e.target.value)}
                    />
                  )}
                </div>
              </div>

              <div style={{ marginTop: 16 }}>
                <label style={styles.label}>Genel Not</label>
                <textarea
                  style={styles.textarea}
                  placeholder="Oda ile ilgili genel değerlendirme"
                  value={form.genelNot}
                  onChange={(e) => updateForm("genelNot", e.target.value)}
                />
              </div>
            </div>

            <div style={styles.card}>
              <div style={styles.sectionTitle}>Odadaki Öğrenciler</div>

              {roomStudents.length === 0 ? (
                <div style={styles.emptyText}>Bu oda için öğrenci listesi bulunamadı.</div>
              ) : (
                roomStudents.map((student) => {
                  const studentKey = `${student.oda}-${student.ad}-${student.soyad}`;
                  const note = studentNotes[studentKey] || {
                    ogrenciNotu: "",
                    saglikDurumu: "",
                    ozelDurumVarMi: "yok",
                    ozelDurumAciklama: "",
                    talepVarMi: "yok",
                    talepAciklama: "",
                  };

                  return (
                    <div key={studentKey} style={styles.studentCard}>
                      <div style={styles.studentName}>
                        {student.ad} {student.soyad}
                      </div>

                      <div style={styles.twoCol}>
                        <div>
                          <label style={styles.label}>Öğrenci Notu</label>
                          <textarea
                            style={styles.textarea}
                            placeholder="Davranış, takip, gözlem notu"
                            value={note.ogrenciNotu}
                            onChange={(e) =>
                              updateStudentNote(studentKey, "ogrenciNotu", e.target.value)
                            }
                          />
                        </div>

                        <div>
                          <label style={styles.label}>Sağlık Durumu</label>
                          <input
                            style={styles.input}
                            placeholder="Sağlık ile ilgili kısa not"
                            value={note.saglikDurumu}
                            onChange={(e) =>
                              updateStudentNote(studentKey, "saglikDurumu", e.target.value)
                            }
                          />
                        </div>

                        <div>
                          <label style={styles.label}>Özel Durum Var mı?</label>
                          <select
                            style={styles.input}
                            value={note.ozelDurumVarMi}
                            onChange={(e) =>
                              updateStudentNote(studentKey, "ozelDurumVarMi", e.target.value)
                            }
                          >
                            <option value="yok">Yok</option>
                            <option value="var">Var</option>
                          </select>
                          {note.ozelDurumVarMi === "var" && (
                            <textarea
                              style={styles.textarea}
                              placeholder="Özel durum açıklaması"
                              value={note.ozelDurumAciklama}
                              onChange={(e) =>
                                updateStudentNote(studentKey, "ozelDurumAciklama", e.target.value)
                              }
                            />
                          )}
                        </div>

                        <div>
                          <label style={styles.label}>İstek / Öneri / Şikayet Var mı?</label>
                          <select
                            style={styles.input}
                            value={note.talepVarMi}
                            onChange={(e) =>
                              updateStudentNote(studentKey, "talepVarMi", e.target.value)
                            }
                          >
                            <option value="yok">Yok</option>
                            <option value="var">Var</option>
                          </select>
                          {note.talepVarMi === "var" && (
                            <textarea
                              style={styles.textarea}
                              placeholder="İstek / öneri / şikayet açıklaması"
                              value={note.talepAciklama}
                              onChange={(e) =>
                                updateStudentNote(studentKey, "talepAciklama", e.target.value)
                              }
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}

              <button style={styles.primaryButton} onClick={handleSave}>
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "gecmis" && (
        <div style={styles.card}>
          <div style={styles.sectionTitle}>Oda {room} Geçmişi</div>
          {roomHistory.length === 0 ? (
            <div style={styles.emptyText}>Bu oda için henüz geçmiş kayıt yok.</div>
          ) : (
            roomHistory.map((record) => (
              <div key={record.id} style={styles.historyCard}>
                <div style={styles.historyHeader}>
                  <strong>{record.tarih}</strong> - {record.saat} - {record.kontrolEden}
                </div>
                <div>Kontrol Türü: {record.kontrolTuru}</div>
                <div>Dönem: {record.donem}</div>
                <div>Temizlik: {getIssueTypeLabel(record.odaTemizlik)}</div>
                <div>Düzen: {getIssueTypeLabel(record.odaDuzeni)}</div>
                <div>Yatak Düzeni: {getIssueTypeLabel(record.yatakDuzeni)}</div>
                <div>Genel Temizlik: {getIssueTypeLabel(record.genelTemizlik)}</div>
                <div>Arıza: {getIssueTypeLabel(record.arizaVarMi)}</div>
                <div>Güvenlik: {getIssueTypeLabel(record.guvenlikDurumu)}</div>
                {record.genelNot && <div>Genel Not: {record.genelNot}</div>}
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "kayitlar" && (
        <div style={styles.card}>
          <div style={styles.sectionTitle}>Tüm Kayıtlar</div>
          {records.length === 0 ? (
            <div style={styles.emptyText}>Henüz kayıt bulunmuyor.</div>
          ) : (
            [...records]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((record) => (
                <div key={record.id} style={styles.historyCard}>
                  <div style={styles.historyHeader}>
                    Oda {record.room} - {record.tarih} - {record.saat}
                  </div>
                  <div>Kontrol Eden: {record.kontrolEden}</div>
                  <div>Tür: {record.kontrolTuru}</div>
                  <div>Dönem: {record.donem}</div>
                  <div>Genel Not: {record.genelNot || "-"}</div>
                </div>
              ))
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  loginPage: {
    minHeight: "100vh",
    background: "#eef2f6",
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    padding: 32,
    gap: 24,
  },
  loginLeft: {
    background: "linear-gradient(135deg, #0d2d6c, #123f96)",
    color: "#fff",
    borderRadius: 24,
    padding: 48,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
  },
  brandMain: {
    fontSize: 56,
    fontWeight: 800,
    lineHeight: 1.1,
  },
  brandSub: {
    marginTop: 16,
    fontSize: 28,
    fontWeight: 700,
    lineHeight: 1.4,
  },
  brandText: {
    marginTop: 24,
    fontSize: 18,
    lineHeight: 1.7,
    color: "#e5ecff",
  },
  loginCard: {
    background: "#fff",
    borderRadius: 24,
    padding: 36,
    alignSelf: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.10)",
  },
  loginTitle: {
    fontSize: 32,
    fontWeight: 800,
    color: "#0d2d6c",
  },
  loginDescription: {
    color: "#667085",
    marginTop: 10,
    marginBottom: 22,
    lineHeight: 1.6,
  },
  page: {
    minHeight: "100vh",
    background: "#eef2f6",
    padding: 24,
  },
  topCard: {
    background: "#fff",
    borderRadius: 22,
    padding: 28,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    marginBottom: 24,
  },
  pageTitle: {
    fontSize: 34,
    fontWeight: 800,
    color: "#0d2d6c",
  },
  pageSubTitle: {
    fontSize: 18,
    color: "#667085",
    marginTop: 8,
  },
  topActions: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },
  tabButton: {
    padding: "12px 18px",
    borderRadius: 12,
    border: "1px solid #d0d5dd",
    background: "#fff",
    cursor: "pointer",
    fontWeight: 700,
  },
  tabActive: {
    padding: "12px 18px",
    borderRadius: 12,
    border: "1px solid #0d2d6c",
    background: "#0d2d6c",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 700,
  },
  logoutButton: {
    padding: "12px 18px",
    borderRadius: 12,
    border: "none",
    background: "#ef4444",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 700,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "360px 1fr",
    gap: 24,
  },
  card: {
    background: "#fff",
    borderRadius: 22,
    padding: 24,
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 800,
    color: "#101828",
    marginBottom: 18,
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "14px 16px",
    borderRadius: 12,
    border: "1px solid #d0d5dd",
    fontSize: 16,
    marginBottom: 14,
  },
  textarea: {
    width: "100%",
    boxSizing: "border-box",
    minHeight: 90,
    padding: "14px 16px",
    borderRadius: 12,
    border: "1px solid #d0d5dd",
    fontSize: 16,
    marginBottom: 14,
    resize: "vertical",
  },
  label: {
    display: "block",
    marginBottom: 8,
    color: "#344054",
    fontWeight: 700,
  },
  primaryButton: {
    padding: "14px 22px",
    borderRadius: 12,
    border: "none",
    background: "#0d2d6c",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 16,
    marginTop: 6,
  },
  summaryBox: {
    background: "#f8fafc",
    borderRadius: 14,
    padding: 16,
    lineHeight: 2,
    color: "#344054",
  },
  previousBox: {
    lineHeight: 1.9,
    color: "#344054",
  },
  twoCol: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
  },
  studentCard: {
    border: "1px solid #eaecf0",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    background: "#fbfdff",
  },
  studentName: {
    fontSize: 18,
    fontWeight: 800,
    color: "#0d2d6c",
    marginBottom: 14,
  },
  historyCard: {
    border: "1px solid #eaecf0",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    lineHeight: 1.9,
    background: "#fbfdff",
  },
  historyHeader: {
    marginBottom: 8,
    color: "#0d2d6c",
  },
  emptyText: {
    color: "#667085",
    lineHeight: 1.8,
  },
  demoInfo: {
    marginTop: 18,
    background: "#f8fafc",
    borderRadius: 14,
    padding: 14,
    color: "#475467",
    lineHeight: 1.9,
  },
};
