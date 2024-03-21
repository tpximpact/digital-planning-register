import "./globals.css";
import "@/styles/app.scss";
import Header from "@/components/header";
import Menu from "@/components/menu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    if (typeof window !== "undefined") {
    const govUk = require("govuk-frontend");
    govUk.initAll();
  }
  return (
    <html lang="en">
      <body >
        <Header />
        <Menu />
      <div className="layout">
        {children}
      </div>
      </body>
    </html>
  );
}
