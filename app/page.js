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

const STUDENTS = [
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
].map(([ad, soyad, oda]) => ({ ad, soyad, oda }));

const ROOM_OPTIONS = ["101","102","201","202","203","204","205","206","207","208","209","210","211","212","301","302","303","304","305","306","307","308","309","310","311","312","313"];

const isoDate = () => new Date().toISOString().split("T")[0];
const timeNow = () => new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });

export default function Page() {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState({ username: "", password: "" });
  const [menu, setMenu] = useState("ana");
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

  const roomStudents = useMemo(() => STUDENTS.filter((s) => s.oda === room), [room]);
  const roomRecords = useMemo(() => records.filter((r) => r.room === room), [records, room]);

  useEffect(() => {
    const saved = localStorage.getItem("oda_kontrol_user");
    if (saved) setUser(JSON.parse(saved));
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    const { data, error } = await supabase
      .from("oda_kontrolleri")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
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
    if (!found) return alert("Kullanıcı adı veya şifre hatalı.");
    setUser(found);
    localStorage.setItem("oda_kontrol_user", JSON.stringify(found));
  };

  const logout = () => {
    localStorage.removeItem("oda_kontrol_user");
    setUser(null);
  };

  const update = (field, value) => setForm((p) => ({ ...p, [field]: value }));

  const save = async () => {
    const { error } = await supabase.from("oda_kontrolleri").insert([{
      oda_no: room,
      kontrol_eden: user?.name || "-",
      kontrol_turu: form.kontrolTuru,
      donem: form.donem,
      tarih: isoDate(),
      saat: timeNow(),
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
    }]);

    if (error) return alert("Hata: " + error.message);

    alert("Kayıt başarıyla kaydedildi.");
    await fetchRecords();
    setMenu("kayitlar");
  };

  if (!user) {
    return (
      <div style={styles.loginPage}>
        <div style={styles.loginHero}>
          <div style={styles.logoText}>TDV YURTLAR</div>
          <h1>Oda Kontrol ve Takip Sistemi</h1>
          <p>Türkiye Diyanet Vakfı yurtlarında oda kontrol, takip ve raporlama süreçleri için hazırlanmıştır.</p>
        </div>
        <div style={styles.loginCard}>
          <h2>Personel Girişi</h2>
          <input style={styles.input} placeholder="Kullanıcı adı" value={login.username} onChange={(e) => setLogin({ ...login, username: e.target.value })} />
          <input style={styles.input} type="password" placeholder="Şifre" value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} />
          <button style={styles.primaryButton} onClick={doLogin}>Giriş Yap</button>
          <div style={styles.help}>mustafa / 1234 · erhan / 1234 · yunus / 1234</div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.app}>
      <aside style={styles.sidebar}>
        <div style={styles.sideLogo}>TDV</div>
        <div style={styles.sideTitle}>Oda Takip</div>

        <Menu label="Ana Sayfa" id="ana" menu={menu} setMenu={setMenu} />
        <Menu label="Yeni Kontrol" id="yeni" menu={menu} setMenu={setMenu} />
        <Menu label="Oda Geçmişi" id="gecmis" menu={menu} setMenu={setMenu} />
        <Menu label="Kayıtlar" id="kayitlar" menu={menu} setMenu={setMenu} />
        <Menu label="Öğrenci Listesi" id="ogrenciler" menu={menu} setMenu={setMenu} />
        <Menu label="Raporlama" id="rapor" menu={menu} setMenu={setMenu} />

        <button style={styles.logout} onClick={logout}>Çıkış Yap</button>
      </aside>

      <main style={styles.main}>
        <div style={styles.header}>
          <div>
            <h1>TDV Oda Kontrol Sistemi</h1>
            <p>Hoş geldiniz, {user.name} ({user.role})</p>
          </div>
          <button style={styles.homeButton} onClick={() => setMenu("ana")}>Ana Sayfa</button>
        </div>

        {menu === "ana" && (
          <div style={styles.cardsGrid}>
            <Info title="Toplam Oda" value={ROOM_OPTIONS.length} />
            <Info title="Toplam Öğrenci" value={STUDENTS.length} />
            <Info title="Toplam Kontrol" value={records.length} />
            <Info title="Takip Gerektiren" value={records.filter(r => r.arizaVarMi === "var" || r.guvenlikDurumu === "var").length} />
          </div>
        )}

        {menu === "yeni" && (
          <div style={styles.layout}>
            <div style={styles.card}>
              <h2>Oda Seçimi</h2>
              <select style={styles.input} value={room} onChange={(e) => setRoom(e.target.value)}>
                {ROOM_OPTIONS.map((r) => <option key={r} value={r}>Oda {r}</option>)}
              </select>
              <p><b>Bu odadaki öğrenci:</b> {roomStudents.length}</p>
              <p><b>Bu oda kontrol sayısı:</b> {roomRecords.length}</p>
            </div>

            <div style={styles.card}>
              <h2>Yeni Oda Kontrolü</h2>

              <div style={styles.two}>
                <Select label="Kontrol Türü" value={form.kontrolTuru} onChange={(v) => update("kontrolTuru", v)} options={["Haftalık","Aylık"]} />
                <Select label="Dönem" value={form.donem} onChange={(v) => update("donem", v)} options={["1. Dönem","2. Dönem"]} />
              </div>

              <h3>Oda Genel Değerlendirmesi</h3>
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

              <Text placeholder="Genel not" value={form.genelNot} onChange={(v) => update("genelNot", v)} />

              <h3>Odadaki Öğrenciler</h3>
              {roomStudents.map((s) => (
                <div style={styles.student} key={`${s.ad}-${s.soyad}`}>
                  {s.ad} {s.soyad}
                </div>
              ))}

              <button style={styles.primaryButton} onClick={save}>Kaydet</button>
            </div>
          </div>
        )}

        {menu === "gecmis" && (
          <div style={styles.card}>
            <h2>Oda Geçmişi</h2>
            <select style={styles.input} value={room} onChange={(e) => setRoom(e.target.value)}>
              {ROOM_OPTIONS.map((r) => <option key={r} value={r}>Oda {r}</option>)}
            </select>
            {roomRecords.length === 0 ? <p>Kayıt yok.</p> : roomRecords.map((r) => <Record key={r.id} r={r} />)}
          </div>
        )}

        {menu === "kayitlar" && (
          <div style={styles.card}>
            <h2>Tüm Kayıtlar</h2>
            {records.length === 0 ? <p>Kayıt yok.</p> : records.map((r) => <Record key={r.id} r={r} />)}
          </div>
        )}

        {menu === "ogrenciler" && (
          <div style={styles.card}>
            <h2>Öğrenci Listesi</h2>
            {ROOM_OPTIONS.map((oda) => (
              <div key={oda} style={styles.roomBlock}>
                <h3>Oda {oda}</h3>
                {STUDENTS.filter(s => s.oda === oda).map(s => <div key={s.ad+s.soyad}>• {s.ad} {s.soyad}</div>)}
              </div>
            ))}
          </div>
        )}

        {menu === "rapor" && (
          <div style={styles.card}>
            <h2>Raporlama</h2>
            <p><b>Toplam kayıt:</b> {records.length}</p>
            <p><b>Arıza bildirilen kayıt:</b> {records.filter(r => r.arizaVarMi === "var").length}</p>
            <p><b>Güvenlik uyarısı olan kayıt:</b> {records.filter(r => r.guvenlikDurumu === "var").length}</p>
            <p><b>Orta/Kötü temizlik kaydı:</b> {records.filter(r => r.odaTemizlik === "orta" || r.odaTemizlik === "kotu").length}</p>
          </div>
        )}
      </main>
    </div>
  );
}

function Menu({ label, id, menu, setMenu }) {
  return <button style={menu === id ? styles.menuActive : styles.menuButton} onClick={() => setMenu(id)}>{label}</button>;
}

function Info({ title, value }) {
  return <div style={styles.info}><div>{title}</div><b>{value}</b></div>;
}

function Record({ r }) {
  return (
    <div style={styles.record}>
      <b>Oda {r.room}</b> — {r.tarih} {r.saat}<br />
      Kontrol Eden: {r.kontrolEden}<br />
      Temizlik: {r.odaTemizlik} | Düzen: {r.odaDuzeni} | Arıza: {r.arizaVarMi}<br />
      Not: {r.genelNot || "-"}
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return <><label>{label}</label><select style={styles.input} value={value} onChange={(e) => onChange(e.target.value)}>{options.map(o => <option key={o}>{o}</option>)}</select></>;
}

function Field({ label, value, onChange }) {
  return <Select label={label} value={value} onChange={onChange} options={["iyi","orta","kotu"]} />;
}

function YesNo({ label, value, onChange }) {
  return <Select label={label} value={value} onChange={onChange} options={["yok","var"]} />;
}

function Text({ value, onChange, placeholder }) {
  return <textarea style={styles.textarea} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />;
}

sidebar: {
  width: 260,
  background: "linear-gradient(180deg,#0a2a66,#0f3d8f)",
  color: "white",
  padding: 24,
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between"
},

sideLogo: {
  fontSize: 34,
  fontWeight: "bold",
  color: "#ffb100",
  marginBottom: 5,
  letterSpacing: 1
},

sideTitle: {
  marginBottom: 30,
  fontSize: 16,
  opacity: 0.9
},

menuButton: {
  width: "100%",
  padding: 14,
  marginBottom: 12,
  border: "none",
  borderRadius: 14,
  background: "rgba(255,255,255,0.12)",
  color: "white",
  textAlign: "left",
  cursor: "pointer",
  transition: "all 0.2s ease"
},

menuActive: {
  width: "100%",
  padding: 14,
  marginBottom: 12,
  border: "none",
  borderRadius: 14,
  background: "#ff9800",
  color: "white",
  textAlign: "left",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
},

logout: {
  width: "100%",
  padding: 14,
  marginTop: 20,
  border: "none",
  borderRadius: 14,
  background: "#ff4d4d",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
},

main: {
  marginLeft: 260,
  padding: 30,
  background: "#eef3fb",
  minHeight: "100vh"
},
