import { Cabin, Geist, Geist_Mono, Inter, Roboto_Flex } from "next/font/google";
import "@/app/globals.css";
import Header from "@/app/_components/Header";
import {
  Rubik,
  Montserrat,
  Oswald,
  Schibsted_Grotesk,
  Jost,
} from "next/font/google";
import { CartProvider } from "../_components/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// const rubik = Rubik({
//   display: "swap",
//   subsets: ["latin"],
// });

const oswald = Oswald({
  display: "swap",
  subsets: ["latin"],
  weight: "300",
});

const heebo = Inter({
  display: "swap",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: {
    template: "%s / TubVilla",
    default: "TubVilla",
  },
  description: "Beautiful home products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${heebo.className} antialiased f `}>
        <CartProvider>
          <Header />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
