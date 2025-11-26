
import Header from "@/components/header";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
export default function RootLayout({ children }) {
  return (
       <html lang="en">
      <body className="bg-gray-50 text-gray-800 min-h-screen">
        <AuthProvider>
          <Header/>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
