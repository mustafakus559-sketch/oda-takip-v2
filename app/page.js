 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/app/page.js b/app/page.js
index 2cc99d6d6bfbd61e7a71ad97ea9e2d069dc51c79..0b79fdedf4299fb5bf716195d0d72e1e8e1d3fef 100644
--- a/app/page.js
+++ b/app/page.js
@@ -273,90 +273,87 @@ export default function Page() {
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
-      <div style={{ minHeight: "100vh", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "Arial, sans-serif" }}>
-        <div style={{ width: "100%", maxWidth: 430, background: "white", borderRadius: 18, padding: 28, boxShadow: "0 16px 40px rgba(15,23,42,0.08)" }}>
-          <h1 style={{ margin: 0, fontSize: 28 }}>TDV Oda Kontrol Sistemi</h1>
-          <p style={{ color: "#64748b", marginTop: 10, marginBottom: 24 }}>Rutin oda kontrolleri, öğrenci gözlemleri ve yönetici onayı</p>
+      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f172a 0%, #1d4ed8 45%, #0f766e 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "Arial, sans-serif", position: "relative", overflow: "hidden" }}>
+        <div style={{ position: "absolute", width: 420, height: 420, borderRadius: "50%", background: "rgba(255,255,255,0.08)", top: -130, left: -100 }} />
+        <div style={{ position: "absolute", width: 340, height: 340, borderRadius: "50%", background: "rgba(255,255,255,0.08)", bottom: -120, right: -70 }} />
+
+        <div style={{ width: "100%", maxWidth: 470, background: "rgba(255,255,255,0.93)", border: "1px solid rgba(255,255,255,0.45)", backdropFilter: "blur(8px)", borderRadius: 22, padding: 30, boxShadow: "0 24px 64px rgba(2,6,23,0.34)", position: "relative", zIndex: 1 }}>
+          <h1 style={{ margin: 0, fontSize: 34, color: "#0f172a", textAlign: "center", marginBottom: 24 }}>Oda Kontrol Uygulaması</h1>
 
           <input
-            style={fieldStyle()}
+            style={{ ...fieldStyle(), border: "1px solid #bfdbfe", background: "#f8fafc" }}
             placeholder="Kullanıcı adı"
             value={loginForm.username}
             onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
           />
           <div style={{ height: 12 }} />
           <input
             type="password"
-            style={fieldStyle()}
+            style={{ ...fieldStyle(), border: "1px solid #bfdbfe", background: "#f8fafc" }}
             placeholder="Şifre"
             value={loginForm.password}
             onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
           />
           <div style={{ height: 16 }} />
-          <button onClick={login} style={{ width: "100%", padding: 14, borderRadius: 10, border: "none", background: "#0f172a", color: "white", fontWeight: 700, cursor: "pointer" }}>
+          <button onClick={login} style={{ width: "100%", padding: 14, borderRadius: 12, border: "none", background: "linear-gradient(90deg, #1d4ed8 0%, #0f766e 100%)", color: "white", fontWeight: 700, cursor: "pointer", letterSpacing: 0.4 }}>
             Giriş Yap
           </button>
 
-          <div style={{ marginTop: 20, background: "#f8fafc", borderRadius: 12, padding: 14, fontSize: 14, lineHeight: 1.8 }}>
-            <div><strong>Yönetici:</strong> mustafa / 1234</div>
-            <div><strong>İdare:</strong> erhan / 1234</div>
-            <div><strong>İdare:</strong> yunus / 1234</div>
-          </div>
         </div>
       </div>
     );
   }
 
   return (
     <div style={{ minHeight: "100vh", background: "#f1f5f9", fontFamily: "Arial, sans-serif", padding: 18 }}>
       <div style={{ maxWidth: 1280, margin: "0 auto" }}>
         <div style={{ ...sectionCardStyle(), display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
           <div>
-            <h1 style={{ margin: 0, fontSize: 30 }}>TDV Oda Kontrol Sistemi</h1>
+            <h1 style={{ margin: 0, fontSize: 30 }}>Oda Kontrol Uygulaması</h1>
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
 
EOF
)
