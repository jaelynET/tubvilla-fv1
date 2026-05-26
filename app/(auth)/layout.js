import { Rubik } from "next/font/google";
import logo from "@/public/tubvillalgo-1.3.png";
import Link from "next/link";
import Image from "next/image";

const rubik = Rubik({
  display: "swap",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: "Login",
    default: "TubVilla",
  },
  description: "login page TubVilla",
};

export default function AuthLayout({ children }) {
  return (
    <div
      className={`${rubik.className} antialiased bg-white min-h-screen flex flex-col items-center justify-center p-6`}
    >
      {/* Header containing centered logo */}
      <header className="w-full max-w-md text-center mb-6">
        <Link href={"/"} className="flex justify-center w-full">
          <Image
            src={logo}
            alt="TubVilla logo"
            width={80}
            height={80}
            priority
            className="block h-auto w-17.5 md:w-21.25 object-contain mx-auto"
          />
        </Link>
      </header>

      {/* Login Card Container */}
      <main className="w-full max-w-md bg-white shadow-md rounded-2xl p-8">
        {children}
      </main>

      {/* Minimal Security Notice instead of a badge logo */}
      <footer className="mt-6 flex items-center gap-1.5 text-xs text-slate-400 select-none">
        {/* A simple, clean inline SVG Lock Icon */}
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        <span>Secured end-to-end data encryption</span>
      </footer>
    </div>
  );
}
