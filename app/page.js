"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://wsxjninwdexyxmvnvxfs.supabase.co",
  "sb_publishable_wA4IcyUd-4UaBkZ2UPvLkQ_xuElu29a"
);

const USERS = [
  { username: "mustafa", password: "1234", name: "Mustafa Kuş", role: "Yönetici" },
  { username: "erhan", password: "1234", name: "Erhan Karakuş", role: "İdare" },
  { username: "yunus", password: "1234", name: "Yunus Emre Özevren", role: "İdare" },
];

const RAW_STUDENTS = [
  ["TAHA EFSA","AYDIN","101"],["YUSUF","GÜLTEKİN","101"],
  ["TAİMİA","KİSİTU","102"],["ALMAT","DUİSEN","102"],["JANBOTA","BYERIKBOL","102"],["S M","JULKARNİNE","102"],
  ["İBRAHİM","KAPLAN","201"],["AHMAD ZIA","MOHAMMADI","201"],["YUSUF","BAYRAQDAROV","201"],["ABDULİLLOH","HİSAİNZODA","201"],
  ["EYMEN","MERDAN","202"],["GÜNGÖR BAKİ","YÜKSEL","202"],["MUSTAFA","ATEŞ","202"],["ZEYNEL ABİDİN","TOSUN","202"],
  ["AZIZULLAH","MUFTI ZADA","203"],["MOHAMMAD ZAYAAN","ZEHGEER","203"],["ARİMİYAO","TCHAASANTI","203"],["FAIZANULLAH","RAHMANI","203"],
  ["TİLEKZHAN","YESSENGABYL","204"],["KANATMYRZA","ERKİNBEK UULU","204"],["TAMERLAN","KHATSAEV","204"],["ABDIASIS","ABDULLAHI YUSUF","204"],
  ["MUHAMMED TALHA","CEYLAN","205"],["ADİL TALHA","DEMİRAL","205"],["MEHMET ENES","DEMİRAL","205"],["ÖMER FAZIL","ORHAN","205"],
  ["CONQUERER","CHANDİPWİSA","206"],["FAOZAN","UMA","206"],["ZEYAD","MOSA","206"],["MUHAMMAD","MUKIIBI","206"],
  ["RADWAN","ROFİDA","207"],["GHADEER ABDULAMEER","TAHSEEN","207"],["MOUGHNI","MLAMALI MSAIDIE","207"],["SHOHRUKH","RAJABOV","207"],
  ["KHABIBULLOKH","ABDULFATTOEV","208"],["NURIDDIN ZOKIRJON UGLI","JAKBARALIEV","208"],["YOUSIF KHWAMURAD QADIR","AL JAF","208"],["HAFIZ IJAZ","AHMED","208"],
  ["SALİH","METİN","209"],["ALPER","ŞAHİN","209"],["ENİS","YİĞİT","209"],["ENES","YİĞİT","209"],
  ["IBRAHIM","OKENY","210"],["IDRISS","DJAMALAD DINE","210"],["MOHAMED YEHIA AHMED ALY","EİWİS","210"],["OUMAR","ARAMA","210"],
  ["MAHAMAD WAKİL","ANSARİ","211"],["ADAN ABDI HASSAN","ADAN ABDI HASSAN","211"],["YOUSSOUF","MOHAMED WABERİ","211"],["IKLIL FATHUL AZIZ","AZİZ","211"],
  ["ABDUL","WAHEED","212"],["MD","OBAID","212"],["AHMAD FIRDAOUS","BİN MOHD SALEH","212"],["AMMAR","BİN MOHD SATAR","212"],
  ["ALİ OSMAN","YILDIZ","301"],["CAVİT","KARAMAN","301"],["AHMET TALHA","ÇELİKER","301"],
  ["HUZEYFE KEMAL","BEDİRHANGİL","302"],["AHMET YASİN","YÜKSEL","302"],["ÖMER CAN","SALİCİ","302"],["MEHMET RIZA","ŞAHİN","302"],
  ["MOHAMMED AWAL","ABDUL GANİYU","303"],["RİDWAN OLAJİDE","NAFİU","303"],["HASSAN","MOHAMED AHMED","303"],["ABDULRAHMAN","RAMADHAN","303"],
  ["ABDOUL KHADRY","NDIAYE","304"],["ADAM","BOTTOM","304"],["İBRAHİM","AYIKİ RAFIU","304"],["JUNAID OMAR","MWACHANDE","304"],
  ["ABDUL BASHIR","NOOR","305"],["UMAR","ABDIBALIEV","305"],["MOHAMED ABDELLAHİ","BEZEİD","305"],["MAMADU ALPHA","BAH","305"],
  ["MESUD MUBAREK","NUREDDİN","306"],["MOUSSA","TRAORE","306"],["AHAMET","BADAMASSI ELHADJI AOUTA","306"],["ABDOURAHMANE AG İNAZOUM","CİSSE","306"],
  ["MOHAMAD","ALHLIBI","307"],["MUHAMMED","ASHOUR","307"],["ASGAT","SAMİGULLİN","307"],["SAİD","CERRAH","307"],
  ["AHMET YUSUF","GÖÇER","308"],["İBRAHİM","GENÇ","308"],["MUSTAFA","ÖZÖGET","308"],["SEYYİD AHMET","KILIÇARSLAN","308"],
  ["ADİLET","MUSSALİMOV","309"],["EMİL","KHAİROYEV","309"],["JAD","ABOU ALİ","309"],["HUSSAM","ALHADDAD","309"],
  ["TEMİR POLAT","ALANKUŞ","310"],["ÖMER FARUK","BOZ","310"],
  ["MOHAMED ALIEU","BAH","311"],["ADAMA","DEME","311"],["IBRAHIM ABDUMALIK","ABDUKERIM","311"],["MOUHAMED","DIOP","311"],
  ["MUTTEIULLAH","YOUSUFI","312"],["MOHAMED","ALİ MOHAMED","312"],["MOHAMAD","NORAIMAN","312"],["MOHAMED FATHİ ARABİ","KAFO","312"],
  ["HAMİT","SEYİTMEHMETOĞLU","313"],["AMINUL","ISLAM","313"],["HASAN","DIAB","313"],["ELMIR","SADIGOV","313"],
];

const STUDENTS = RAW_STUDENTS.map(([ad, soyad, oda]) => ({ ad, soyad, oda }));
const ROOM_OPTIONS = [...new Set(STUDENTS.map((s) => s.oda))].sort();

const emptyForm = {
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
};

const isoDate = () => new Date().toISOString().split("T")[0];
const timeNow = () => new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });

export default function Page() {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState({ username: "", password: "" });
  const [menu, setMenu] = useState("ana");
  const [room, setRoom] = useState("101");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [selectedStudentKey, setSelectedStudentKey] = useState(null);
  const [studentChecks, setStudentChecks] = useState({});

  const isAdmin = user?.role === "Yönetici";

  const roomStudents = useMemo(() => STUDENTS.filter((s) => s.oda === room), [room]);
  const roomRecords = useMemo(() => records.filter((r) => String(r.room) === String(room)), [records, room]);

  useEffect(() => {
    const saved = localStorage.getItem("oda_kontrol_user");
    if (saved) setUser(JSON.parse(saved));
    fetchRecords();
  }, []);

  useEffect(() => {
    const prepared = {};
    roomStudents.forEach((s) => {
      const key = studentKey(s);
      prepared[key] = studentChecks[key] || {
        kontrolEdildi: false,
        not: "",
        saglik: "",
        ozelDurum: "yok",
        ozelDurumAciklama: "",
        talep: "yok",
        talepAciklama: "",
      };
    });
    setStudentChecks((prev) => ({ ...prepared, ...prev }));
    setSelectedStudentKey(roomStudents[0] ? studentKey(roomStudents[0]) : null);
  }, [room]);

  const fetchRecords = async () => {
    const { data, error } = await supabase
      .from("oda_kontrolleri")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Kayıt çekme hatası:", error);
      return;
    }

    setRecords((data || []).map((r) => ({
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
    })));
  };

  const doLogin = () => {
    const found = USERS.find(
      (u) => u.username === login.username.trim().toLowerCase() && u.password === login.password
    );

    if (!found) {
      alert("Kullanıcı adı veya şifre hatalı.");
      return;
    }

    setUser(found);
    localStorage.setItem("oda_kontrol_user", JSON.stringify(found));
  };

  const logout = () => {
    localStorage.removeItem("oda_kontrol_user");
    setUser(null);
    setLogin({ username: "", password: "" });
  };

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const updateStudentCheck = (key, field, value) => {
    setStudentChecks((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };

  const buildStudentSummary = () => {
    const lines = roomStudents.map((s, index) => {
      const key = studentKey(s);
      const c = studentChecks[key] || {};
      return `${index + 1}. ${s.ad} ${s.soyad} | Kontrol: ${c.kontrolEdildi ? "Evet" : "Hayır"} | Not: ${c.not || "-"} | Sağlık: ${c.saglik || "-"} | Özel Durum: ${c.ozelDurum || "yok"} ${c.ozelDurumAciklama || ""} | Talep/Şikayet: ${c.talep || "yok"} ${c.talepAciklama || ""}`;
    });

    return lines.join("\n");
  };

  const save = async () => {
    setLoading(true);

    const studentSummary = buildStudentSummary();
    const finalNote = `${form.genelNot || "-"}\n\nÖĞRENCİ KONTROL NOTLARI:\n${studentSummary}`;

    const { error } = await supabase.from("oda_kontrolleri").insert([{
      oda_no: room,
      kontrol_eden: user?.name || "-",
      kontrol_turu: form.kontrolTuru,
      donem: form.donem,
      tarih: isoDate(),
      saat: timeNow(),
      genel_not: finalNote,
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
    }]);

    setLoading(false);

    if (error) {
      alert("Kayıt hatası: " + error.message);
      return;
    }

    alert("Kayıt başarıyla kaydedildi.");
    setForm(emptyForm);
    await fetchRecords();
    setMenu(isAdmin ? "kontroller" : "ana");
  };

  const downloadExcel = () => {
    const rows = [
      ["Oda", "Tarih", "Saat", "Kontrol Eden", "Kontrol Türü", "Dönem", "Temizlik", "Düzen", "Yatak", "Genel Temizlik", "Arıza", "Güvenlik", "Not"],
      ...records.map((r) => [
        r.room, r.tarih, r.saat, r.kontrolEden, r.kontrolTuru, r.donem,
        r.odaTemizlik, r.odaDuzeni, r.yatakDuzeni, r.genelTemizlik,
        r.arizaVarMi, r.guvenlikDurumu, cleanCsv(r.genelNot),
      ]),
    ];

    const csv = rows.map((row) => row.map((v) => `"${String(v ?? "").replaceAll('"', '""')}"`).join(";")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tdv_oda_kontrol_raporu.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const printReport = () => {
    window.print();
  };

  const issueCount = records.filter(
    (r) =>
      r.arizaVarMi === "var" ||
      r.guvenlikDurumu === "var" ||
      r.odaTemizlik === "orta" ||
      r.odaTemizlik === "kotu" ||
      r.odaDuzeni === "orta" ||
      r.odaDuzeni === "kotu"
  ).length;

  const selectedStudent = roomStudents.find((s) => studentKey(s) === selectedStudentKey);
  const selectedCheck = selectedStudentKey ? studentChecks[selectedStudentKey] || {} : {};

  if (!user) {
    return (
      <div style={styles.loginPage}>
        <div style={styles.loginHero}>
          <div style={styles.loginBadge}>TDV YURTLAR</div>
          <h1 style={styles.loginTitle}>Oda Kontrol ve Takip Sistemi</h1>
          <p style={styles.loginText}>
            Türkiye Diyanet Vakfı yurtlarında oda kontrol, öğrenci takip ve raporlama süreçlerini düzenli biçimde yürütmek için hazırlanmıştır.
          </p>
        </div>

        <div style={styles.loginCard}>
          <h2 style={styles.cardTitle}>Personel Girişi</h2>
          <p style={styles.muted}>Yetkili kullanıcı bilgilerinizle giriş yapınız.</p>

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

          <button style={styles.primaryButton} onClick={doLogin}>Giriş Yap</button>

          <div style={styles.helpBox}>
            mustafa / 1234<br />
            erhan / 1234<br />
            yunus / 1234
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.app}>
      <aside style={styles.sidebar}>
        <div>
          <div style={styles.sideLogo}>TDV</div>
          <div style={styles.sideTitle}>Oda Takip Sistemi</div>

          <Menu icon="🏠" label="Ana Sayfa" id="ana" menu={menu} setMenu={setMenu} />
          <Menu icon="📝" label="Yeni Kontrol" id="yeni" menu={menu} setMenu={setMenu} />
          <Menu icon="👥" label="Öğrenci Listesi" id="ogrenciler" menu={menu} setMenu={setMenu} />

          {isAdmin && (
            <>
              <Menu icon="📌" label="Oda Geçmişi" id="gecmis" menu={menu} setMenu={setMenu} />
              <Menu icon="✅" label="Yapılan Kontroller" id="kontroller" menu={menu} setMenu={setMenu} />
              <Menu icon="📋" label="Kayıtlar" id="kayitlar" menu={menu} setMenu={setMenu} />
              <Menu icon="📊" label="Raporlama" id="rapor" menu={menu} setMenu={setMenu} />
            </>
          )}
        </div>

        <button style={styles.logout} onClick={logout}>Çıkış Yap</button>
      </aside>

      <main style={styles.main}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.headerTitle}>TDV Oda Kontrol Sistemi</h1>
            <p style={styles.headerSub}>Hoş geldiniz, {user.name} · {user.role}</p>
          </div>
          <button style={styles.homeButton} onClick={() => setMenu("ana")}>Ana Sayfa</button>
        </div>

        {menu === "ana" && (
          <>
            <div style={styles.cardsGrid}>
              <Info title="Toplam Oda" value={ROOM_OPTIONS.length} color="#0b3d91" />
              <Info title="Toplam Öğrenci" value={STUDENTS.length} color="#0b3d91" />
              <Info title="Toplam Kontrol" value={isAdmin ? records.length : "-"} color="#f59e0b" />
              <Info title="Takip Gerektiren" value={isAdmin ? issueCount : "-"} color="#ef4444" />
            </div>

            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Sistem Özeti</h2>
              <p style={styles.muted}>
                Bu panel üzerinden oda kontrolleri yapılabilir, öğrenciler oda bazında takip edilebilir ve yönetici hesabı ile yapılan kontroller raporlanabilir.
              </p>
            </div>
          </>
        )}

        {menu === "yeni" && (
          <div style={styles.layout}>
            <div>
              <div style={styles.card}>
                <h2 style={styles.cardTitle}>Oda Seçimi</h2>
                <select style={styles.input} value={room} onChange={(e) => setRoom(e.target.value)}>
                  {ROOM_OPTIONS.map((r) => <option key={r} value={r}>Oda {r}</option>)}
                </select>
                <div style={styles.summaryBox}>
                  <b>Öğrenci Sayısı:</b> {roomStudents.length}<br />
                  {isAdmin && <><b>Kontrol Sayısı:</b> {roomRecords.length}</>}
                </div>
              </div>

              <div style={styles.card}>
                <h2 style={styles.cardTitle}>Odadaki Öğrenciler</h2>
                {roomStudents.map((s, index) => {
                  const key = studentKey(s);
                  const checked = studentChecks[key]?.kontrolEdildi || false;

                  return (
                    <div
                      key={key}
                      style={selectedStudentKey === key ? styles.studentMiniActive : styles.studentMini}
                      onClick={() => setSelectedStudentKey(key)}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => updateStudentCheck(key, "kontrolEdildi", e.target.checked)}
                        onClick={(e) => e.stopPropagation()}
                        style={styles.checkBox}
                      />
                      <span style={styles.studentNumber}>{index + 1}.</span>
                      <span>{s.ad} {s.soyad}</span>
                    </div>
                  );
                })}
              </div>

              {selectedStudent && (
                <div style={styles.card}>
                  <h2 style={styles.cardTitle}>Öğrenci Kontrol Notu</h2>
                  <div style={styles.selectedStudentName}>
                    {selectedStudent.ad} {selectedStudent.soyad}
                  </div>

                  <Text
                    placeholder="Öğrenci ile ilgili kontrol notu"
                    value={selectedCheck.not || ""}
                    onChange={(v) => updateStudentCheck(selectedStudentKey, "not", v)}
                  />

                  <input
                    style={styles.input}
                    placeholder="Sağlık durumu / gözlem"
                    value={selectedCheck.saglik || ""}
                    onChange={(e) => updateStudentCheck(selectedStudentKey, "saglik", e.target.value)}
                  />

                  <YesNo
                    label="Özel Durum Var mı?"
                    value={selectedCheck.ozelDurum || "yok"}
                    onChange={(v) => updateStudentCheck(selectedStudentKey, "ozelDurum", v)}
                  />

                  {selectedCheck.ozelDurum === "var" && (
                    <Text
                      placeholder="Özel durum açıklaması"
                      value={selectedCheck.ozelDurumAciklama || ""}
                      onChange={(v) => updateStudentCheck(selectedStudentKey, "ozelDurumAciklama", v)}
                    />
                  )}

                  <YesNo
                    label="İstek / Öneri / Şikayet Var mı?"
                    value={selectedCheck.talep || "yok"}
                    onChange={(v) => updateStudentCheck(selectedStudentKey, "talep", v)}
                  />

                  {selectedCheck.talep === "var" && (
                    <Text
                      placeholder="İstek / öneri / şikayet açıklaması"
                      value={selectedCheck.talepAciklama || ""}
                      onChange={(v) => updateStudentCheck(selectedStudentKey, "talepAciklama", v)}
                    />
                  )}
                </div>
              )}
            </div>

            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Yeni Oda Kontrolü</h2>

              <div style={styles.two}>
                <Select label="Kontrol Türü" value={form.kontrolTuru} onChange={(v) => update("kontrolTuru", v)} options={["Haftalık","Aylık"]} />
                <Select label="Dönem" value={form.donem} onChange={(v) => update("donem", v)} options={["1. Dönem","2. Dönem"]} />
              </div>

              <h3 style={styles.sectionTitle}>Oda Genel Değerlendirmesi</h3>

              <Field label="Oda Temizliği" value={form.odaTemizlik} onChange={(v) => update("odaTemizlik", v)} />
              {form.odaTemizlik !== "iyi" && <Text placeholder="Temizlik açıklaması" value={form.temizlikAciklama} onChange={(v) => update("temizlikAciklama", v)} />}

              <Field label="Oda Düzeni" value={form.odaDuzeni} onChange={(v) => update("odaDuzeni", v)} />
              {form.odaDuzeni !== "iyi" && <Text placeholder="Düzen açıklaması" value={form.duzenAciklama} onChange={(v) => update("duzenAciklama", v)} />}

              <Field label="Yatak Düzeni" value={form.yatakDuzeni} onChange={(v) => update("yatakDuzeni", v)} />
              {form.yatakDuzeni !== "iyi" && <Text placeholder="Yatak düzeni açıklaması" value={form.yatakDuzeniAciklama} onChange={(v) => update("yatakDuzeniAciklama", v)} />}

              <Field label="Genel Temizlik" value={form.genelTemizlik} onChange={(v) => update("genelTemizlik", v)} />
              {form.genelTemizlik !== "iyi" && <Text placeholder="Genel temizlik açıklaması" value={form.genelTemizlikAciklama} onChange={(v) => update("genelTemizlikAciklama", v)} />}

              <YesNo label="Odada Arıza Var mı?" value={form.arizaVarMi} onChange={(v) => update("arizaVarMi", v)} />
              {form.arizaVarMi === "var" && <Text placeholder="Arıza açıklaması" value={form.arizaAciklama} onChange={(v) => update("arizaAciklama", v)} />}

              <YesNo label="Güvenlik Açısından Dikkat Gerektiren Durum Var mı?" value={form.guvenlikDurumu} onChange={(v) => update("guvenlikDurumu", v)} />
              {form.guvenlikDurumu === "var" && <Text placeholder="Güvenlik açıklaması" value={form.guvenlikAciklama} onChange={(v) => update("guvenlikAciklama", v)} />}

              <Text placeholder="Genel not / ek açıklama" value={form.genelNot} onChange={(v) => update("genelNot", v)} />

              <button style={styles.primaryButton} onClick={save} disabled={loading}>
                {loading ? "Kaydediliyor..." : "Kaydet"}
              </button>
            </div>
          </div>
        )}

        {isAdmin && menu === "gecmis" && (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Oda Geçmişi</h2>
            <select style={styles.input} value={room} onChange={(e) => setRoom(e.target.value)}>
              {ROOM_OPTIONS.map((r) => <option key={r} value={r}>Oda {r}</option>)}
            </select>
            {roomRecords.length === 0 ? <p style={styles.muted}>Bu oda için kayıt yok.</p> : roomRecords.map((r) => <Record key={r.id} r={r} />)}
          </div>
        )}

        {isAdmin && menu === "kontroller" && (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Yapılan Kontroller</h2>
            {records.length === 0 ? <p style={styles.muted}>Kayıt yok.</p> : records.map((r) => <Record key={r.id} r={r} />)}
          </div>
        )}

        {isAdmin && menu === "kayitlar" && (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Kayıtlar</h2>
            {records.length === 0 ? <p style={styles.muted}>Kayıt yok.</p> : records.map((r) => <Record key={r.id} r={r} />)}
          </div>
        )}

        {menu === "ogrenciler" && (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Öğrenci Listesi</h2>
            {ROOM_OPTIONS.map((oda) => (
              <div key={oda} style={styles.roomBlock}>
                <h3>Oda {oda}</h3>
                {STUDENTS.filter((s) => s.oda === oda).map((s, index) => (
                  <div key={`${s.ad}-${s.soyad}`}>{index + 1}. {s.ad} {s.soyad}</div>
                ))}
              </div>
            ))}
          </div>
        )}

        {isAdmin && menu === "rapor" && (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Raporlama</h2>

            <div style={styles.reportActions}>
              <button style={styles.primaryButton} onClick={downloadExcel}>Excel / CSV İndir</button>
              <button style={styles.secondaryButton} onClick={printReport}>PDF / Yazdır</button>
            </div>

            <div style={styles.cardsGrid}>
              <Info title="Toplam Kayıt" value={records.length} color="#0b3d91" />
              <Info title="Arıza Bildirimi" value={records.filter((r) => r.arizaVarMi === "var").length} color="#ef4444" />
              <Info title="Güvenlik Uyarısı" value={records.filter((r) => r.guvenlikDurumu === "var").length} color="#ef4444" />
              <Info title="Orta/Kötü Temizlik" value={records.filter((r) => r.odaTemizlik === "orta" || r.odaTemizlik === "kotu").length} color="#f59e0b" />
            </div>

            <div style={styles.printArea}>
              <h2>TDV Oda Kontrol Raporu</h2>
              <p>Oluşturma Tarihi: {isoDate()} {timeNow()}</p>
              {ROOM_OPTIONS.map((oda) => {
                const list = records.filter((r) => String(r.room) === String(oda));
                return (
                  <div key={oda} style={styles.roomReport}>
                    <h3>Oda {oda}</h3>
                    {list.length === 0 ? (
                      <p>Kayıt bulunmamaktadır.</p>
                    ) : (
                      list.map((r) => <Record key={r.id} r={r} />)
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function studentKey(s) {
  return `${s.oda}-${s.ad}-${s.soyad}`;
}

function cleanCsv(value) {
  return String(value || "").replaceAll("\n", " / ");
}

function Menu({ icon, label, id, menu, setMenu }) {
  return (
    <button style={menu === id ? styles.menuActive : styles.menuButton} onClick={() => setMenu(id)}>
      <span style={styles.menuIcon}>{icon}</span>{label}
    </button>
  );
}

function Info({ title, value, color }) {
  return (
    <div style={styles.info}>
      <div style={styles.infoTitle}>{title}</div>
      <div style={{ ...styles.infoValue, color }}>{value}</div>
    </div>
  );
}

function Record({ r }) {
  return (
    <div style={styles.record}>
      <b>Oda {r.room}</b> — {r.tarih} {r.saat}<br />
      Kontrol Eden: {r.kontrolEden}<br />
      Tür: {r.kontrolTuru} · Dönem: {r.donem}<br />
      Temizlik: {r.odaTemizlik} · Düzen: {r.odaDuzeni} · Arıza: {r.arizaVarMi} · Güvenlik: {r.guvenlikDurumu}<br />
      Not: <pre style={styles.notePre}>{r.genelNot || "-"}</pre>
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div>
      <label style={styles.label}>{label}</label>
      <select style={styles.input} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function Field({ label, value, onChange }) {
  return <Select label={label} value={value} onChange={onChange} options={["iyi","orta","kotu"]} />;
}

function YesNo({ label, value, onChange }) {
  return <Select label={label} value={value} onChange={onChange} options={["yok","var"]} />;
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
  loginPage: {
    minHeight: "100vh",
    display: "grid",
    gridTemplateColumns: "1.2fr .8fr",
    background: "#eef2f6",
    padding: 36,
    gap: 28,
  },
  loginHero: {
    background: "linear-gradient(135deg,#082b6f,#0d47a1)",
    color: "white",
    borderRadius: 28,
    padding: 54,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxShadow: "0 15px 40px rgba(0,0,0,.18)",
  },
  loginBadge: {
    color: "#f59e0b",
    fontSize: 60,
    fontWeight: 900,
    letterSpacing: 1,
  },
  loginTitle: {
    fontSize: 42,
    marginTop: 18,
    marginBottom: 12,
  },
  loginText: {
    fontSize: 19,
    lineHeight: 1.7,
    color: "#e8efff",
  },
  loginCard: {
    background: "white",
    borderRadius: 28,
    padding: 38,
    alignSelf: "center",
    boxShadow: "0 15px 40px rgba(0,0,0,.12)",
  },
  app: {
    minHeight: "100vh",
    display: "flex",
    background: "#eef2f6",
  },
  sidebar: {
    width: 280,
    background: "linear-gradient(180deg,#061f55 0%,#082b6f 55%,#0b3d91 100%)",
    color: "white",
    padding: 24,
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    boxShadow: "8px 0 28px rgba(0,0,0,.18)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxSizing: "border-box",
  },
  sideLogo: {
    fontSize: 54,
    fontWeight: 900,
    color: "#f59e0b",
    letterSpacing: 1,
    lineHeight: 1,
  },
  sideTitle: {
    marginTop: 8,
    marginBottom: 28,
    fontSize: 18,
    fontWeight: 700,
    color: "#eaf1ff",
  },
  menuButton: {
    width: "100%",
    padding: "15px 16px",
    marginBottom: 12,
    border: "1px solid rgba(255,255,255,.10)",
    borderRadius: 16,
    background: "rgba(255,255,255,.12)",
    color: "white",
    textAlign: "left",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 15,
  },
  menuActive: {
    width: "100%",
    padding: "15px 16px",
    marginBottom: 12,
    border: "1px solid rgba(255,255,255,.20)",
    borderRadius: 16,
    background: "linear-gradient(135deg,#f59e0b,#fbbf24)",
    color: "white",
    textAlign: "left",
    fontWeight: 900,
    fontSize: 15,
    cursor: "pointer",
    boxShadow: "0 10px 22px rgba(245,158,11,.30)",
  },
  menuIcon: {
    marginRight: 10,
  },
  logout: {
    width: "100%",
    padding: 15,
    border: 0,
    borderRadius: 16,
    background: "linear-gradient(135deg,#ef4444,#dc2626)",
    color: "white",
    cursor: "pointer",
    fontWeight: 800,
    fontSize: 15,
    boxShadow: "0 10px 22px rgba(239,68,68,.28)",
  },
  main: {
    marginLeft: 280,
    padding: 30,
    width: "calc(100% - 280px)",
    minHeight: "100vh",
    boxSizing: "border-box",
  },
  header: {
    background: "white",
    borderRadius: 24,
    padding: 28,
    marginBottom: 24,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 8px 25px rgba(0,0,0,.08)",
  },
  headerTitle: {
    margin: 0,
    color: "#082b6f",
    fontSize: 34,
  },
  headerSub: {
    marginTop: 8,
    marginBottom: 0,
    color: "#667085",
  },
  homeButton: {
    padding: "12px 18px",
    borderRadius: 12,
    border: 0,
    background: "#082b6f",
    color: "white",
    cursor: "pointer",
    fontWeight: 800,
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "360px 1fr",
    gap: 24,
  },
  card: {
    background: "white",
    borderRadius: 24,
    padding: 26,
    marginBottom: 24,
    boxShadow: "0 8px 25px rgba(0,0,0,.08)",
  },
  cardTitle: {
    color: "#082b6f",
    marginTop: 0,
  },
  sectionTitle: {
    color: "#082b6f",
    marginTop: 24,
  },
  muted: {
    color: "#667085",
    lineHeight: 1.6,
  },
  input: {
    width: "100%",
    padding: 14,
    margin: "8px 0 14px",
    borderRadius: 12,
    border: "1px solid #d0d5dd",
    boxSizing: "border-box",
    fontSize: 15,
  },
  textarea: {
    width: "100%",
    minHeight: 95,
    padding: 14,
    margin: "8px 0 14px",
    borderRadius: 12,
    border: "1px solid #d0d5dd",
    boxSizing: "border-box",
    fontSize: 15,
  },
  label: {
    display: "block",
    fontWeight: 800,
    color: "#344054",
    marginTop: 4,
  },
  primaryButton: {
    padding: "14px 22px",
    border: 0,
    borderRadius: 12,
    background: "#082b6f",
    color: "white",
    fontWeight: 900,
    cursor: "pointer",
    fontSize: 15,
  },
  secondaryButton: {
    padding: "14px 22px",
    border: 0,
    borderRadius: 12,
    background: "#f59e0b",
    color: "white",
    fontWeight: 900,
    cursor: "pointer",
    fontSize: 15,
  },
  helpBox: {
    marginTop: 16,
    background: "#f8fafc",
    borderRadius: 14,
    padding: 14,
    color: "#667085",
    lineHeight: 1.8,
  },
  two: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 18,
  },
  summaryBox: {
    background: "#f8fafc",
    borderRadius: 14,
    padding: 16,
    lineHeight: 1.8,
  },
  studentMini: {
    padding: 12,
    background: "#f8fafc",
    borderRadius: 12,
    marginBottom: 8,
    fontWeight: 800,
    color: "#082b6f",
    display: "flex",
    alignItems: "center",
    gap: 8,
    cursor: "pointer",
    border: "1px solid #eef2f6",
  },
  studentMiniActive: {
    padding: 12,
    background: "#fff7ed",
    borderRadius: 12,
    marginBottom: 8,
    fontWeight: 900,
    color: "#082b6f",
    display: "flex",
    alignItems: "center",
    gap: 8,
    cursor: "pointer",
    border: "1px solid #f59e0b",
  },
  studentNumber: {
    minWidth: 24,
    color: "#f59e0b",
    fontWeight: 900,
  },
  checkBox: {
    width: 18,
    height: 18,
    cursor: "pointer",
  },
  selectedStudentName: {
    background: "#f8fafc",
    color: "#082b6f",
    padding: 14,
    borderRadius: 12,
    fontWeight: 900,
    marginBottom: 12,
  },
  record: {
    padding: 16,
    border: "1px solid #e5e7eb",
    borderRadius: 16,
    marginBottom: 12,
    lineHeight: 1.8,
    background: "#fbfdff",
  },
  notePre: {
    whiteSpace: "pre-wrap",
    fontFamily: "inherit",
    margin: 0,
    marginTop: 6,
  },
  roomBlock: {
    padding: 16,
    border: "1px solid #e5e7eb",
    borderRadius: 16,
    marginBottom: 12,
    background: "#fbfdff",
    lineHeight: 1.8,
  },
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: 18,
    marginBottom: 24,
  },
  info: {
    background: "white",
    borderRadius: 22,
    padding: 24,
    boxShadow: "0 8px 25px rgba(0,0,0,.08)",
  },
  infoTitle: {
    color: "#667085",
    fontWeight: 800,
    marginBottom: 10,
  },
  infoValue: {
    fontSize: 36,
    fontWeight: 900,
  },
  reportActions: {
    display: "flex",
    gap: 12,
    marginBottom: 24,
  },
  printArea: {
    marginTop: 20,
  },
  roomReport: {
    pageBreakInside: "avoid",
    marginBottom: 20,
  },
};
