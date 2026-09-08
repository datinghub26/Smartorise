import type { Metadata } from "next";
import "./globals.css";
import { AppStateProvider } from "../context/AppStateContext";

export const metadata: Metadata = {
  title: "Smartorise - Enterprise Offerwall Administration Portal",
  description: "Monetization and offerwall advertising network management system.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#05080f] text-slate-300 min-h-screen">
        <AppStateProvider>{children}</AppStateProvider>
      </body>
    </html>
  );
}
