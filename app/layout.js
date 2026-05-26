// app/layout.js
import "@/app/globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
export const metadata = {
  title: {
    template: "%s / TubVilla",
    default: "TubVilla",
  },
  description:
    "A collection of beautiful and luxurious freestanding bathtubs, designed to transform and elevate your bathroom",

  icon: "@/public/tubicon.jpg",
};
export default function RootLayout({ children }) {
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ID;
  return (
    <html lang="en">
      <body>{children}</body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
