import { Montserrat, Roboto } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { HashScroll } from "@/components/SmartLink";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://baliholistic.com"),
  title: {
    default: "Holistic Retreat Bali | Small-group healing retreat in Sanur",
    template: "%s | Holistic Retreat Bali",
  },
  description:
    "A seven-day, six-night holistic retreat at Villa Paradise in Sanur, Bali, for no more than six guests, hosted by Mitch Rilett.",
  openGraph: {
    siteName: "Holistic Retreat Bali",
    locale: "en_AU",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#1a2f5b",
};

export default function RootLayout({ children }) {
  return (
    // data-scroll-behavior lets Next.js open new pages at the top instantly
    // while in-page links keep the CSS smooth scrolling.
    <html lang="en" className={`${montserrat.variable} ${roboto.variable}`} data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <HashScroll />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
