import type { Metadata } from "next";
import "../styles/globals.css"
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider } from "@/shared/theme/theme-provider";
import TranslatorProvider from "../widget/layout/layout";

export const metadata: Metadata = {
  title: "Instagram",
  icons: { icon: "/instagram.png" },
};

export default function RootLayout({
children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/>
      </head>
      <body className="h-full dark:bg-[#0C1014]">
        <TranslatorProvider>
           <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem disableTransitionOnChange>
              {children}
           </ThemeProvider>
        </TranslatorProvider>
      </body>
    </html>
  );
}
