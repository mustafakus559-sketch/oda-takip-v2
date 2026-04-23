"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://wsxjninwdexyxmvnvxfs.supabase.co",
  "sb_publishable_wA4IcyUd-4UaBkZ2UPvLkQ_xuElu29a"
);

export default function Page() {
  const [oda, setOda] = useState("");
  const [not, setNot] = useState("");

  const [arizaVarMi, setArizaVarMi] = useState("");
  const [arizaAciklama, setArizaAciklama] = useState("");

  const kaydet = async () => {
    const { error } = await supabase.from("oda_kontrolleri").insert([
      {
        oda_no: oda,
        genel_not: not,
        ariza_aciklama: arizaVarMi === "var" ? arizaAciklama : null,
      },
    ]);

    if (error) {
      console.log("HATA:", error);
      alert("Hata oluştu");
    } else {
      alert("Kaydedildi");
      setOda("");
      setNot("");
      setArizaVarMi("");
      setArizaAciklama("");
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

      <br />
      <br />

      <textarea
        placeholder="Genel Not"
        value={not}
        onChange={(e) => setNot(e.target.value)}
      />

      <br />
      <br />

      <p>Odada herhangi bir arıza var mı?</p>

      <select
        value={arizaVarMi}
        onChange={(e) => setArizaVarMi(e.target.value)}
      >
        <option value="">Seçiniz</option>
        <option value="yok">Yok</option>
        <option value="var">Var</option>
      </select>

      <br />
      <br />

      {arizaVarMi === "var" && (
        <>
          <textarea
            placeholder="Arıza açıklaması yazınız..."
            value={arizaAciklama}
            onChange={(e) => setArizaAciklama(e.target.value)}
          />
          <br />
          <br />
        </>
      )}

      <button onClick={kaydet}>Kaydet</button>
    </div>
  );
}
