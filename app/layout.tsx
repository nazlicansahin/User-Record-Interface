import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "User Manager App",
  description: "The best place to save your favorite things and manage your tasks.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />

        {children}
      </body>
    </html>
  );
}
