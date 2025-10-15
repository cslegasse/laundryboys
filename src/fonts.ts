import localFont from "next/font/local";
import { Inter, Montserrat } from "next/font/google";

export const drukWide = localFont({
  src: "../../public/fonts/Druk-Wide-Bold.ttf",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-montserrat",
});
