import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jonathan Schummers — Product Designer",
  description:
    "Jonathan Schummers — Senior Product Designer. Research, design, and code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=document.documentElement,t=localStorage.getItem('theme'),p=matchMedia('(prefers-color-scheme:dark)').matches;if(t==='dark'||(t==null&&p)){d.classList.add('dark')}else if(t==='light'){d.classList.add('light')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
