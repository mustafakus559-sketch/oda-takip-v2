"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://wsxjninwdexyxmvnvxfs.supabase.co/rest/v1/",
  "wsxjninwdexyxmvnvxfs"
);

export default function Page() {
  const [oda, setOda] = useState("");
  const [not, setNot] = useState("");

  const kaydet = async () => {
    const { data, error } = await supabase
      .from("oda_kontrolleri")
      .insert([
        {
          oda_no: oda,
          genel_not: not,
          kontrol_eden: "Mustafa",
        },
      ]);

    if (error) {
      alert("Hata var");
      console.log(error);
    } else {
      alert("Kaydedildi");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Oda Kontrol</h1>

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
// deploy refresh
