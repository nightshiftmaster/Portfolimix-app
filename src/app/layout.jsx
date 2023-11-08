import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/NavBar";
import ThemeProvider from "../context/ThemeContext";
import AuthProvider from "../components/authProvider/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Website",
  description: "This is my website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <div className="container">
              <Navbar />
              {children}
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
