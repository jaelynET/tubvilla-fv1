import Header from "@/app/_components/Header";
import { Playfair_Display } from "next/font/google";
import { CartProvider } from "../_components/CartContext";

import { FilterProvider } from "../_components/FilterContext";
import CartItems from "../_components/CartItems";
import Footer from "../_components/Footer";
import StripeElementsProvider from "../_components/StripeElementsProvider";
import { DomProvider } from "../_components/DomContext";

// Serif
const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: "400",
});

export default function StoreLayout({ children }) {
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ID;
  return (
    <div
      className={`${playfairDisplay.className} antialiased flex flex-col min-h-screen w-full `}
    >
      <CartProvider>
        <Header />
        <FilterProvider>
          <CartItems />
          <StripeElementsProvider>
            <DomProvider>
              <main className="flex-1">{children}</main>
            </DomProvider>
          </StripeElementsProvider>
        </FilterProvider>
      </CartProvider>
      <Footer />
    </div>
  );
}
