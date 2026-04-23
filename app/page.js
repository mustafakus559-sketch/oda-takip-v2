"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://wsxjninwdexymvnxvfs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzeGpuaW53ZGV4eXhtdm52eGZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5NDczNzEsImV4cCI6MjA5MjUyMzM3MX0.NCMWuOeC-vCpZAV0MaeZ6enVU2JDaVXwPNmKF7T2v0o"
);

export default function Page() {
  const [oda, setOda] = useState("");
  const [not, setNot] = useState("");

  const kaydet = async () => {
    const { error } = await supabase
      .from("oda_kontrolleri")
      .insert([
        {
          oda_no: oda,
          genel_not: not,
          kontrol_eden: "Mustafa Kuş",
        },
      ]);

    if (error) {
      alert("Hata oluştu");
      console.log(error);
    } else {
      alert("Kayıt başarılı");
      setOda("");
      setNot("");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>TDV Oda Kontrol Sistemi</h1>

      <input
        placeholder="Oda No"
        value={oda}
        onChange={(e) => setOda(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Not"
        value={not}
        onChange={(e) => setNot(e.target.value)}
      />

      <br /><br />

      <button onClick={kaydet}>Kaydet</button>
    </div>
  );
}
