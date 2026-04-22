export const metadata = {
  title: "TDV Oda Takip Uygulaması",
  description: "Yurt oda kontrol ve takip uygulaması",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
