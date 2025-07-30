import "@/app/globals.css";
import { Rubik } from "next/font/google";

const rubik = Rubik({
  display: "swap",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: "Login",
    default: "Mi Casa Mi Tub",
  },
  description: "Beautiful home products",
};

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${rubik.className} antialiased f `}>
        <main>{children}</main>
      </body>
    </html>
  );
}
