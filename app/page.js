"use client";

import { useEffect, useMemo, useState } from "react";

const USERS = [
  { username: "mustafa", password: "1234", name: "Mustafa Kuş", role: "admin" },
  { username: "erhan", password: "1234", name: "Erhan Karakuş", role: "idare" },
  { username: "yunus", password: "1234", name: "Yunus Emre Özevren", role: "idare" },
];

const ROOM_DEFINITIONS = [
  { roomNo: "101", block: "A", floor: "1", students: ["Taha Efsa Aydın", "Yusuf Gültekin"] },
  { roomNo: "102", block: "A", floor: "1", students: ["Taimia Kisitu", "Almat Duisen", "Janbota Byerikbol", "S M Julkarnine"] },
  { roomNo: "201", block: "A", floor: "2", students: ["İbrahim Kaplan", "Ahmad Zia Mohammadi", "Yusuf Bayraqdarov", "Abdulilloh Hisainzoda"] },
  { roomNo: "202", block: "A", floor: "2", students: ["Eymen Merdan", "Güngör Baki Yüksel", "Mustafa Ateş", "Zeynel Abidin Tosun"] },
  { roomNo: "203", block: "A", floor: "2", students: ["Azizullah Mufti Zada", "Mohammad Zayaan Zehgeer", "Arimiyao Tchaasanti", "Faizanullah Rahmani"] },
  { roomNo: "204", block: "A", floor: "2", students: ["Tilekzhan Yessengabyl", "Kanatmyrza Erkinbek Uulu", "Tamerlan Khatsaev", "Abdiasis Abdullahi Yusuf"] },
  { roomNo: "205", block: "A", floor: "2", students: ["Muhammed Talha Ceylan", "Adil Talha Demiral", "Mehmet Enes Demiral", "Ömer Fazıl Orhan"] },
  { roomNo: "206", block: "A", floor: "2", students: ["Conquerer Chandipwisa", "Faozan Uma", "Zeyad Mosa", "Muhammad Mukiibi"] },
  { roomNo: "207", block: "A", floor: "2", students: ["Radwan Rofida", "Ghadeer Abdulameer Tahseen", "Moughni Mlamali Msaidie", "Shohrukh Rajabov"] },
  { roomNo: "208", block: "A", floor: "2", students: ["Khabibullokh Abdulfattoev", "Nuriddin Zokirjon Ugli Jakbaraliev", "Yousif Khwamurad Qadir Al Jaf", "Hafiz Ijaz Ahmed"] },
  { roomNo: "209", block: "A", floor: "2", students: ["Salih Metin", "Alper Şahin", "Enis Yiğit", "Enes Yiğit"] },
  { roomNo: "210", block: "A", floor: "2", students: ["Ibrahim Okeny", "Idriss Djamalad Dine", "Mohamed Yehia Ahmed Aly Eiwis", "Oumar Arama"] },
  { roomNo: "211", block: "A", floor: "2", students: ["Mahamad Wakil Ansari", "Adan Abdi Hassan Adan Abdi Hassan", "Youssouf Mohamed Waberi", "Iklil Fathul Aziz Aziz"] },
  { roomNo: "212", block: "A", floor: "2", students: ["Abdul Waheed", "MD Obaid", "Ahmad Firdaous Bin Mohd Saleh", "Ammar Bin Mohd Satar"] },
  { roomNo: "301", block: "A", floor: "3", students: ["Cavit Karaman", "Ali Osman Yıldız", "Ahmet Talha Çeliker"] },
  { roomNo: "302", block: "A", floor: "3", students: ["Huzeyfe Kemal Bedirhangil", "Ahmet Yasin Yüksel", "Ömer Can Salici", "Mehmet Rıza Şahin"] },
  { roomNo: "303", block: "A", floor: "3", students: ["Mohammed Awal Abdul Ganiyu", "Ridwan Olajide Nafiu", "Hassan Mohamed Ahmed", "Abdulrahman Ramadhan"] },
  { roomNo: "304", block: "A", floor: "3", students: ["Abdoul Khadry Ndiaye", "Adam Bottom", "İbrahim Ayiki Rafiu", "Junaid Omar Mwachande"] },
  { roomNo: "305", block: "A", floor: "3", students: ["Abdul Bashir Noor", "Umar Abdibaliev", "Mohamed Abdellahi Bezeid", "Mamadu Alpha Bah"] },
  { roomNo: "306", block: "A", floor: "3", students: ["Mesud Mubarek Nureddin", "Moussa Traore", "Ahamet Badamassi Elhadji Aouta", "Abdourahmane Ag Inazoum Cisse"] },
  { roomNo: "307", block: "A", floor: "3", students: ["Mohamad Alhlibi", "Muhammed Ashour", "Asgat Samigullin", "Said Cerrah"] },
  { roomNo: "308", block: "A", floor: "3", students: ["Ahmet Yusuf Göçer", "İbrahim Genç", "Mustafa Özöğet", "Seyyid Ahmet Kılıçarslan"] },
  { roomNo: "309", block: "A", floor: "3", students: ["Adilet Mussalimov", "Emil Khairoyev", "Jad Abou Ali", "Hussam Alhaddad"] },
  { roomNo: "310", block: "A", floor: "3", students: ["Temir Polat Alankuş", "Ömer Faruk Boz"] },
  { roomNo: "311", block: "A", floor: "3", students: ["Mohamed Alieu Bah", "Adama Deme", "Ibrahim Abdumalik Abdukerim", "Mouhamed Diop"] },
  { roomNo: "312", block: "A", floor: "3", students: ["Mutteiullah Yousufi", "Mohamed Ali Mohamed", "Mohamad Noraiman", "Mohamed Fathi Arabi Kafo"] },
  { roomNo: "313", block: "A", floor: "3", students: ["Hamit Seyitmehmetoğlu", "Aminul Islam", "Hasan Diab", "Elmir Sadigov"] },
];

const CONTROL_OPTIONS = ["İyi", "Orta", "Yetersiz"];
const YES_NO = ["Yok", "Var"];
const RESULT_OPTIONS = ["Uygun", "Takip Gerektirir", "Yönetici İncelemesi Gerekli"];
const CONTROL_TYPES = ["Haftalık", "Aylık"];
const TERM_OPTIONS = ["1. Dönem", "2. Dönem"];

function getNowDate() {
  return new Date().toISOString().slice(0, 10);
}

function getNowTime() {
  return new Date().toTimeString().slice(0, 5);
}

function buildStudents(roomNo) {
  const room = ROOM_DEFINITIONS.find((r) => r.roomNo === roomNo);
  const names = room?.students || ["", "", "", ""];
  return names.map((name, index) => ({
    id: index + 1,
    name,
    generalStatus: "Normal",
    behaviorStatus: "Normal",
    socialStatus: "Normal",
    healthIssue: "Yok",
    requestComplaint: "Yok",
    specialCase: "Yok",
    needsFollowUp: "Yok",
    note: "",
  }));
}

function createEmptyForm(user, roomNo = "") {
  const room = ROOM_DEFINITIONS.find((r) => r.roomNo === roomNo);
  return {
    id: null,
    roomNo: roomNo || "",
    block: room?.block || "",
    floor: room?.floor || "",
    controlType: "Haftalık",
    term: "1. Dönem",
    controlDate: getNowDate(),
    controlTime: getNowTime(),
    controlledBy: user?.name || "",
    roomCleanliness: "İyi",
    roomOrder: "İyi",
    bedOrder: "İyi",
    generalCleanliness: "İyi",
    malfunction: "Yok",
    securityConcern: "Yok",
    suspiciousItem: "Yok",
    extraSituation: "Yok",
    roomNote: "",
    securityNote: "",
    result: "Uygun",
    status: "Taslak",
    createdBy: user?.username || "",
    createdByName: user?.name || "",
    approvedBy: "",
    approvedAt: "",
    students: buildStudents(roomNo),
  };
}

function badgeStyle(value) {
  const base = {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
  };

  if (value === "Onaylandı") return { ...base, background: "#dcfce7", color: "#166534" };
  if (value === "Onay Bekliyor") return { ...base, background: "#fef3c7", color: "#92400e" };
  if (value === "Takip Gerektirir") return { ...base, background: "#fee2e2", color: "#991b1b" };
  if (value === "Yönetici İncelemesi Gerekli") return { ...base, background: "#ede9fe", color: "#5b21b6" };
  return { ...base, background: "#e2e8f0", color: "#334155" };
}

function fieldStyle() {
  return {
    width: "100%",
    padding: 12,
    border: "1px solid #d1d5db",
    borderRadius: 10,
    fontSize: 14,
    background: "white",
    boxSizing: "border-box",
  };
}

function sectionCardStyle() {
  return {
    background: "white",
    borderRadius: 16,
    padding: 20,
    boxShadow: "0 10px 30px rgba(15,23,42,0.06)",
    marginBottom: 18,
  };
}

export default function Page() {
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [records, setRecords] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(ROOM_DEFINITIONS[0].roomNo);
  const [form, setForm] = useState(createEmptyForm(null, ROOM_DEFINITIONS[0].roomNo));
  const [activeView, setActiveView] = useState("new-control");
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [roomFilter, setRoomFilter] = useState("Tümü");
  const [termFilter, setTermFilter] = useState("Tümü");

  useEffect(() => {
    const savedRecords = localStorage.getItem("tdv-room-control-records-v2");
    const savedUser = localStorage.getItem("tdv-room-control-user-v2");

    if (savedRecords) setRecords(JSON.parse(savedRecords));
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      const initialRoom = ROOM_DEFINITIONS[0].roomNo;
      setForm(createEmptyForm(parsedUser, initialRoom));
      setSelectedRoom(initialRoom);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tdv-room-control-records-v2", JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    if (user) localStorage.setItem("tdv-room-control-user-v2", JSON.stringify(user));
    else localStorage.removeItem("tdv-room-control-user-v2");
  }, [user]);

  const visibleRecords = useMemo(() => {
    let filtered = user?.role === "admin"
      ? records
      : records.filter((r) => r.createdBy === user?.username);

    if (roomFilter !== "Tümü") filtered = filtered.filter((r) => r.roomNo === roomFilter);
    if (termFilter !== "Tümü") filtered = filtered.filter((r) => r.term === termFilter);

    return [...filtered].sort((a, b) => new Date(`${b.controlDate}T${b.controlTime}`) - new Date(`${a.controlDate}T${a.controlTime}`));
  }, [records, user, roomFilter, termFilter]);

  const roomHistory = useMemo(() => {
    return [...records]
      .filter((r) => r.roomNo === selectedRoom)
      .sort((a, b) => new Date(`${b.controlDate}T${b.controlTime}`) - new Date(`${a.controlDate}T${a.controlTime}`));
  }, [records, selectedRoom]);

  const previousControl = roomHistory[0] || null;

  const roomComparison = useMemo(() => {
    if (roomHistory.length < 2) return null;
    const current = roomHistory[0];
    const previous = roomHistory[1];
    return { current, previous };
  }, [roomHistory]);

  const roomSummary = useMemo(() => {
    const roomRecords = records.filter((r) => r.roomNo === selectedRoom);
    const total = roomRecords.length;
    const followUp = roomRecords.filter((r) => r.result === "Takip Gerektirir" || r.result === "Yönetici İncelemesi Gerekli").length;
    return { total, followUp };
  }, [records, selectedRoom]);

  const login = () => {
    const foundUser = USERS.find(
      (u) => u.username === loginForm.username && u.password === loginForm.password
    );
    if (!foundUser) return alert("Kullanıcı adı veya şifre hatalı");
    setUser(foundUser);
    setSelectedRoom(ROOM_DEFINITIONS[0].roomNo);
    setForm(createEmptyForm(foundUser, ROOM_DEFINITIONS[0].roomNo));
  };

  const logout = () => {
    setUser(null);
    setSelectedRecordId(null);
    setActiveView("new-control");
  };

  const handleRoomChange = (roomNo) => {
    setSelectedRoom(roomNo);
    setForm((prev) => {
      const room = ROOM_DEFINITIONS.find((r) => r.roomNo === roomNo);
      return {
        ...prev,
        roomNo,
        block: room?.block || "",
        floor: room?.floor || "",
        students: buildStudents(roomNo),
      };
    });
  };

  const updateForm = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateStudent = (index, key, value) => {
    setForm((prev) => {
      const students = [...prev.students];
      students[index] = { ...students[index], [key]: value };
      return { ...prev, students };
    });
  };

  const saveControl = () => {
    if (!form.roomNo) return alert("Lütfen oda seçiniz");

    const payload = {
      ...form,
      id: Date.now(),
      createdBy: user.username,
      createdByName: user.name,
      controlledBy: user.name,
      status: "Onay Bekliyor",
    };

    setRecords((prev) => [payload, ...prev]);
    alert("Kontrol kaydı oluşturuldu ve onaya gönderildi.");
    setForm(createEmptyForm(user, selectedRoom));
    setActiveView("history");
  };

  const approveControl = (id) => {
    setRecords((prev) =>
      prev.map((record) =>
        record.id === id
          ? {
              ...record,
              status: "Onaylandı",
              approvedBy: user.name,
              approvedAt: new Date().toLocaleString("tr-TR"),
            }
          : record
      )
    );
  };

  const loadRecordToDetail = (id) => {
    setSelectedRecordId(id);
    setActiveView("detail");
  };

  const selectedRecord = records.find((r) => r.id === selectedRecordId) || null;

  const printRoomReport = () => {
    if (!selectedRoom) return;
    window.print();
  };

  if (!user) {
    return (
      <div style={{ minHeight: "100vh", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "Arial, sans-serif" }}>
        <div style={{ width: "100%", maxWidth: 430, background: "white", borderRadius: 18, padding: 28, boxShadow: "0 16px 40px rgba(15,23,42,0.08)" }}>
          <h1 style={{ margin: 0, fontSize: 28 }}>TDV Oda Kontrol Sistemi</h1>
          <p style={{ color: "#64748b", marginTop: 10, marginBottom: 24 }}>Rutin oda kontrolleri, öğrenci gözlemleri ve yönetici onayı</p>

          <input
            style={fieldStyle()}
            placeholder="Kullanıcı adı"
            value={loginForm.username}
            onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
          />
          <div style={{ height: 12 }} />
          <input
            type="password"
            style={fieldStyle()}
            placeholder="Şifre"
            value={loginForm.password}
            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
          />
          <div style={{ height: 16 }} />
          <button onClick={login} style={{ width: "100%", padding: 14, borderRadius: 10, border: "none", background: "#0f172a", color: "white", fontWeight: 700, cursor: "pointer" }}>
            Giriş Yap
          </button>

          <div style={{ marginTop: 20, background: "#f8fafc", borderRadius: 12, padding: 14, fontSize: 14, lineHeight: 1.8 }}>
            <div><strong>Yönetici:</strong> mustafa / 1234</div>
            <div><strong>İdare:</strong> erhan / 1234</div>
            <div><strong>İdare:</strong> yunus / 1234</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", fontFamily: "Arial, sans-serif", padding: 18 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ ...sectionCardStyle(), display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 30 }}>TDV Oda Kontrol Sistemi</h1>
            <p style={{ margin: "8px 0 0", color: "#64748b" }}>
              Hoş geldiniz, {user.name} ({user.role === "admin" ? "Yönetici" : "İdare"})
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button onClick={() => setActiveView("new-control")} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #cbd5e1", background: activeView === "new-control" ? "#0f172a" : "white", color: activeView === "new-control" ? "white" : "#0f172a", cursor: "pointer" }}>Yeni Kontrol</button>
            <button onClick={() => setActiveView("history")} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #cbd5e1", background: activeView === "history" ? "#0f172a" : "white", color: activeView === "history" ? "white" : "#0f172a", cursor: "pointer" }}>Oda Geçmişi</button>
            <button onClick={() => setActiveView("records")} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #cbd5e1", background: activeView === "records" ? "#0f172a" : "white", color: activeView === "records" ? "white" : "#0f172a", cursor: "pointer" }}>Kayıtlar</button>
            <button onClick={logout} style={{ padding: "10px 14px", borderRadius: 10, border: "none", background: "#dc2626", color: "white", cursor: "pointer" }}>Çıkış</button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 2fr", gap: 18, alignItems: "start" }}>
          <div>
            <div style={sectionCardStyle()}>
              <h3 style={{ marginTop: 0 }}>Oda Seçimi</h3>
              <select style={fieldStyle()} value={selectedRoom} onChange={(e) => handleRoomChange(e.target.value)}>
                {ROOM_DEFINITIONS.map((room) => (
                  <option key={room.roomNo} value={room.roomNo}>{room.block} Blok / {room.floor}. Kat / Oda {room.roomNo}</option>
                ))}
              </select>

              <div style={{ marginTop: 14, background: "#f8fafc", borderRadius: 12, padding: 14, lineHeight: 1.8 }}>
                <div><strong>Toplam Kontrol:</strong> {roomSummary.total}</div>
                <div><strong>Takip Gerektiren:</strong> {roomSummary.followUp}</div>
              </div>
            </div>

            <div style={sectionCardStyle()}>
              <h3 style={{ marginTop: 0 }}>Önceki Kontrol Özeti</h3>
              {!previousControl ? (
                <p style={{ color: "#64748b" }}>Bu oda için henüz kontrol kaydı yok.</p>
              ) : (
                <div style={{ lineHeight: 1.9, fontSize: 14 }}>
                  <div><strong>Tarih:</strong> {previousControl.controlDate}</div>
                  <div><strong>Saat:</strong> {previousControl.controlTime}</div>
                  <div><strong>Kontrol Eden:</strong> {previousControl.controlledBy}</div>
                  <div><strong>Oda Düzeni:</strong> {previousControl.roomOrder}</div>
                  <div><strong>Oda Temizliği:</strong> {previousControl.roomCleanliness}</div>
                  <div><strong>Yatak Düzeni:</strong> {previousControl.bedOrder}</div>
                  <div><strong>Sonuç:</strong> <span style={badgeStyle(previousControl.result)}>{previousControl.result}</span></div>
                  {previousControl.roomNote ? <div><strong>Not:</strong> {previousControl.roomNote}</div> : null}
                </div>
              )}
            </div>

            {roomComparison ? (
              <div style={sectionCardStyle()}>
                <h3 style={{ marginTop: 0 }}>Son İki Kontrol Karşılaştırması</h3>
                <div style={{ fontSize: 14, lineHeight: 1.9 }}>
                  <div><strong>Son Kontrol:</strong> {roomComparison.current.controlDate} / {roomComparison.current.controlledBy}</div>
                  <div><strong>Bir Önceki:</strong> {roomComparison.previous.controlDate} / {roomComparison.previous.controlledBy}</div>
                  <hr style={{ border: 0, borderTop: "1px solid #e5e7eb", margin: "10px 0" }} />
                  <div><strong>Oda Düzeni:</strong> {roomComparison.previous.roomOrder} → {roomComparison.current.roomOrder}</div>
                  <div><strong>Temizlik:</strong> {roomComparison.previous.roomCleanliness} → {roomComparison.current.roomCleanliness}</div>
                  <div><strong>Yatak Düzeni:</strong> {roomComparison.previous.bedOrder} → {roomComparison.current.bedOrder}</div>
                  <div><strong>Sonuç:</strong> {roomComparison.previous.result} → {roomComparison.current.result}</div>
                </div>
              </div>
            ) : null}
          </div>

          <div>
            {activeView === "new-control" && (
              <>
                <div style={sectionCardStyle()}>
                  <h2 style={{ marginTop: 0 }}>Yeni Oda Kontrolü</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                    <div>
                      <label>Kontrol Türü</label>
                      <select style={fieldStyle()} value={form.controlType} onChange={(e) => updateForm("controlType", e.target.value)}>
                        {CONTROL_TYPES.map((item) => <option key={item}>{item}</option>)}
                      </select>
                    </div>
                    <div>
                      <label>Dönem</label>
                      <select style={fieldStyle()} value={form.term} onChange={(e) => updateForm("term", e.target.value)}>
                        {TERM_OPTIONS.map((item) => <option key={item}>{item}</option>)}
                      </select>
                    </div>
                    <div>
                      <label>Kontrol Eden</label>
                      <input style={fieldStyle()} value={form.controlledBy} readOnly />
                    </div>
                    <div>
                      <label>Tarih</label>
                      <input type="date" style={fieldStyle()} value={form.controlDate} onChange={(e) => updateForm("controlDate", e.target.value)} />
                    </div>
                    <div>
                      <label>Saat</label>
                      <input type="time" style={fieldStyle()} value={form.controlTime} onChange={(e) => updateForm("controlTime", e.target.value)} />
                    </div>
                    <div>
                      <label>Oda</label>
                      <input style={fieldStyle()} value={`${form.block} Blok / ${form.floor}. Kat / Oda ${form.roomNo}`} readOnly />
                    </div>
                  </div>
                </div>

                <div style={sectionCardStyle()}>
                  <h2 style={{ marginTop: 0 }}>Oda Genel Değerlendirmesi</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
                    {[
                      ["roomCleanliness", "Oda Temizliği", CONTROL_OPTIONS],
                      ["roomOrder", "Oda Düzeni", CONTROL_OPTIONS],
                      ["bedOrder", "Yatak Düzeni", CONTROL_OPTIONS],
                      ["generalCleanliness", "Genel Temizlik", CONTROL_OPTIONS],
                      ["malfunction", "Odada Arıza Var mı?", YES_NO],
                      ["securityConcern", "Güvenlik Açısından Dikkat Gerektiren Durum Var mı?", YES_NO],
                      ["suspiciousItem", "Şüpheli / Yabancı Cisim Var mı?", YES_NO],
                      ["extraSituation", "Ekstra Dikkat Gerektiren Husus Var mı?", YES_NO],
                      ["result", "Genel Sonuç", RESULT_OPTIONS],
                    ].map(([key, label, options]) => (
                      <div key={key}>
                        <label>{label}</label>
                        <select style={fieldStyle()} value={form[key]} onChange={(e) => updateForm(key, e.target.value)}>
                          {options.map((item) => <option key={item}>{item}</option>)}
                        </select>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: 14 }}>
                    <label>Oda / Genel Açıklama</label>
                    <textarea style={{ ...fieldStyle(), minHeight: 110 }} value={form.roomNote} onChange={(e) => updateForm("roomNote", e.target.value)} placeholder="Oda ile ilgili genel değerlendirme, düzensizlik, uyarı, tekrar eden sorun vb." />
                  </div>

                  <div style={{ marginTop: 14 }}>
                    <label>Güvenlik / Dikkat Notu</label>
                    <textarea style={{ ...fieldStyle(), minHeight: 90 }} value={form.securityNote} onChange={(e) => updateForm("securityNote", e.target.value)} placeholder="Şüpheli unsur, dikkat gerektiren husus, yöneticiye not vb." />
                  </div>
                </div>

                <div style={sectionCardStyle()}>
                  <h2 style={{ marginTop: 0 }}>Öğrenci Bazlı Gözlem ve Notlar</h2>
                  {form.students.map((student, index) => (
                    <div key={student.id} style={{ border: "1px solid #e5e7eb", borderRadius: 14, padding: 16, marginBottom: 14, background: "#fafafa" }}>
                      <h3 style={{ marginTop: 0, marginBottom: 12 }}>{student.name || `Öğrenci ${student.id}`}</h3>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
                        {[
                          ["generalStatus", "Genel Durumu", ["Normal", "Dikkat Gerektirir"]],
                          ["behaviorStatus", "Davranış Durumu", ["Normal", "Dikkat Gerektirir"]],
                          ["socialStatus", "Sosyal Durum", ["Normal", "İçe Kapanık", "Takip Gerektirir"]],
                          ["healthIssue", "Sağlık Sorunu Var mı?", YES_NO],
                          ["requestComplaint", "İstek / Öneri / Şikayet Var mı?", YES_NO],
                          ["specialCase", "Özel Durum Var mı?", YES_NO],
                          ["needsFollowUp", "Takip Gerekir mi?", YES_NO],
                        ].map(([key, label, options]) => (
                          <div key={key}>
                            <label>{label}</label>
                            <select style={fieldStyle()} value={student[key]} onChange={(e) => updateStudent(index, key, e.target.value)}>
                              {options.map((item) => <option key={item}>{item}</option>)}
                            </select>
                          </div>
                        ))}
                      </div>
                      <div style={{ marginTop: 12 }}>
                        <label>Öğrenci Notu</label>
                        <textarea
                          style={{ ...fieldStyle(), minHeight: 90 }}
                          value={student.note}
                          onChange={(e) => updateStudent(index, "note", e.target.value)}
                          placeholder="Öğrencinin durumu, gözlem, sağlık, davranış, takip notu vb."
                        />
                      </div>
                    </div>
                  ))}

                  <button onClick={saveControl} style={{ padding: "14px 18px", borderRadius: 10, border: "none", background: "#0f766e", color: "white", fontWeight: 700, cursor: "pointer" }}>
                    Kontrolü Kaydet ve Onaya Gönder
                  </button>
                </div>
              </>
            )}

            {activeView === "history" && (
              <div style={sectionCardStyle()}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <h2 style={{ marginTop: 0 }}>Oda Geçmişi - Oda {selectedRoom}</h2>
                  <button onClick={printRoomReport} style={{ padding: "10px 16px", borderRadius: 10, border: "1px solid #cbd5e1", background: "white", cursor: "pointer" }}>Raporu Yazdır</button>
                </div>

                {roomHistory.length === 0 ? (
                  <p>Bu oda için geçmiş kayıt bulunmuyor.</p>
                ) : (
                  roomHistory.map((record) => (
                    <div key={record.id} style={{ border: "1px solid #e5e7eb", borderRadius: 14, padding: 16, marginBottom: 14 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                        <div>
                          <div><strong>{record.controlDate}</strong> / {record.controlTime}</div>
                          <div>{record.controlledBy} - {record.controlType} - {record.term}</div>
                        </div>
                        <div style={badgeStyle(record.result)}>{record.result}</div>
                      </div>

                      <div style={{ marginTop: 10, fontSize: 14, lineHeight: 1.8 }}>
                        <div><strong>Oda Temizliği:</strong> {record.roomCleanliness}</div>
                        <div><strong>Oda Düzeni:</strong> {record.roomOrder}</div>
                        <div><strong>Yatak Düzeni:</strong> {record.bedOrder}</div>
                        <div><strong>Genel Temizlik:</strong> {record.generalCleanliness}</div>
                        <div><strong>Arıza:</strong> {record.malfunction}</div>
                        <div><strong>Güvenlik:</strong> {record.securityConcern}</div>
                        <div><strong>Şüpheli Cisim:</strong> {record.suspiciousItem}</div>
                        {record.roomNote ? <div><strong>Genel Not:</strong> {record.roomNote}</div> : null}
                      </div>

                      <div style={{ marginTop: 10 }}>
                        <button onClick={() => loadRecordToDetail(record.id)} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #cbd5e1", background: "white", cursor: "pointer" }}>
                          Detayları Gör
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeView === "records" && (
              <div style={sectionCardStyle()}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                  <h2 style={{ marginTop: 0 }}>{user.role === "admin" ? "Tüm Kontroller" : "Kendi Kontrollerim"}</h2>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <select style={fieldStyle()} value={roomFilter} onChange={(e) => setRoomFilter(e.target.value)}>
                      <option>Tümü</option>
                      {ROOM_DEFINITIONS.map((room) => <option key={room.roomNo}>{room.roomNo}</option>)}
                    </select>
                    <select style={fieldStyle()} value={termFilter} onChange={(e) => setTermFilter(e.target.value)}>
                      <option>Tümü</option>
                      {TERM_OPTIONS.map((term) => <option key={term}>{term}</option>)}
                    </select>
                  </div>
                </div>

                {visibleRecords.length === 0 ? (
                  <p>Kayıt bulunmuyor.</p>
                ) : (
                  visibleRecords.map((record) => (
                    <div key={record.id} style={{ border: "1px solid #e5e7eb", borderRadius: 14, padding: 16, marginBottom: 14, background: "#fafafa" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                        <div>
                          <div><strong>Oda {record.roomNo}</strong> - {record.controlDate} / {record.controlTime}</div>
                          <div style={{ color: "#64748b", marginTop: 4 }}>{record.createdByName} - {record.controlType} - {record.term}</div>
                        </div>
                        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                          <span style={badgeStyle(record.status)}>{record.status}</span>
                          <span style={badgeStyle(record.result)}>{record.result}</span>
                        </div>
                      </div>

                      <div style={{ marginTop: 10, lineHeight: 1.8, fontSize: 14 }}>
                        <div><strong>Oda Düzeni:</strong> {record.roomOrder}</div>
                        <div><strong>Temizlik:</strong> {record.roomCleanliness}</div>
                        <div><strong>Yatak Düzeni:</strong> {record.bedOrder}</div>
                        {record.roomNote ? <div><strong>Not:</strong> {record.roomNote}</div> : null}
                      </div>

                      <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
                        <button onClick={() => loadRecordToDetail(record.id)} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #cbd5e1", background: "white", cursor: "pointer" }}>Detay</button>
                        {user.role === "admin" && record.status !== "Onaylandı" ? (
                          <button onClick={() => approveControl(record.id)} style={{ padding: "10px 14px", borderRadius: 10, border: "none", background: "#2563eb", color: "white", cursor: "pointer", fontWeight: 700 }}>
                            Onayla
                          </button>
                        ) : null}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeView === "detail" && selectedRecord && (
              <div style={sectionCardStyle()}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                  <h2 style={{ marginTop: 0 }}>Kontrol Detayı - Oda {selectedRecord.roomNo}</h2>
                  <button onClick={() => setActiveView("history")} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #cbd5e1", background: "white", cursor: "pointer" }}>Geri Dön</button>
                </div>

                <div style={{ lineHeight: 1.9, fontSize: 14 }}>
                  <div><strong>Tarih / Saat:</strong> {selectedRecord.controlDate} / {selectedRecord.controlTime}</div>
                  <div><strong>Kontrol Eden:</strong> {selectedRecord.controlledBy}</div>
                  <div><strong>Kontrol Türü:</strong> {selectedRecord.controlType}</div>
                  <div><strong>Dönem:</strong> {selectedRecord.term}</div>
                  <div><strong>Sonuç:</strong> <span style={badgeStyle(selectedRecord.result)}>{selectedRecord.result}</span></div>
                  <div><strong>Durum:</strong> <span style={badgeStyle(selectedRecord.status)}>{selectedRecord.status}</span></div>
                  {selectedRecord.approvedBy ? <div><strong>Onaylayan:</strong> {selectedRecord.approvedBy}</div> : null}
                </div>

                <hr style={{ border: 0, borderTop: "1px solid #e5e7eb", margin: "16px 0" }} />

                <h3>Oda Genel Durumu</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, lineHeight: 1.8 }}>
                  <div><strong>Oda Temizliği:</strong> {selectedRecord.roomCleanliness}</div>
                  <div><strong>Oda Düzeni:</strong> {selectedRecord.roomOrder}</div>
                  <div><strong>Yatak Düzeni:</strong> {selectedRecord.bedOrder}</div>
                  <div><strong>Genel Temizlik:</strong> {selectedRecord.generalCleanliness}</div>
                  <div><strong>Arıza:</strong> {selectedRecord.malfunction}</div>
                  <div><strong>Güvenlik:</strong> {selectedRecord.securityConcern}</div>
                  <div><strong>Şüpheli Cisim:</strong> {selectedRecord.suspiciousItem}</div>
                  <div><strong>Ekstra Durum:</strong> {selectedRecord.extraSituation}</div>
                </div>
                {selectedRecord.roomNote ? <p><strong>Genel Açıklama:</strong> {selectedRecord.roomNote}</p> : null}
                {selectedRecord.securityNote ? <p><strong>Güvenlik Notu:</strong> {selectedRecord.securityNote}</p> : null}

                <hr style={{ border: 0, borderTop: "1px solid #e5e7eb", margin: "16px 0" }} />

                <h3>Öğrenci Notları</h3>
                {selectedRecord.students.map((student) => (
                  <div key={student.id} style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 14, marginBottom: 12 }}>
                    <div style={{ fontWeight: 700, marginBottom: 8 }}>{student.name}</div>
                    <div style={{ lineHeight: 1.8, fontSize: 14 }}>
                      <div><strong>Genel Durum:</strong> {student.generalStatus}</div>
                      <div><strong>Davranış:</strong> {student.behaviorStatus}</div>
                      <div><strong>Sosyal Durum:</strong> {student.socialStatus}</div>
                      <div><strong>Sağlık:</strong> {student.healthIssue}</div>
                      <div><strong>İstek / Şikayet:</strong> {student.requestComplaint}</div>
                      <div><strong>Özel Durum:</strong> {student.specialCase}</div>
                      <div><strong>Takip:</strong> {student.needsFollowUp}</div>
                      {student.note ? <div><strong>Not:</strong> {student.note}</div> : null}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

