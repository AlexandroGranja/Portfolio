import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/header";
import { HomeInteractionProvider } from "@/components/home-interaction";
import { ArrivalScreen } from "@/components/arrival-screen";
import { FollowCursor } from "@/components/follow-cursor";
import { profile } from "@/content/profile";
import { TvStatic } from "@/components/tv-static";
import { themeInitializationScript } from "@/lib/theme";
import { LanguageProvider, LocalizedText } from "@/components/language-provider";
import "./globals.css";
import "./theme.css";
import "./compact.css";
import "./home.css";
import "./arrival.css";
import "./cursor.css";
import "./projects.css";
import "./dark-palette.css";

const space = localFont({
  src: "../public-fonts/space.ttf",
  variable: "--font-space",
  display: "swap",
  weight: "700",
});
const outfit = localFont({
  src: "../public-fonts/outfit.ttf",
  variable: "--font-outfit",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Alexandro Granja | Desenvolvimento & Automação",
    template: "%s | Alexandro Granja",
  },
  description: profile.introduction,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitializationScript }}
        />
      </head>
      <body className={`${space.variable} ${outfit.variable}`}>
        <LanguageProvider>
        <FollowCursor />
        <a className="skip-link" href="#conteudo">
          <LocalizedText>Pular para o conteúdo</LocalizedText>
        </a>
        <HomeInteractionProvider>
          <ArrivalScreen>
          <TvStatic />
          <Header />
          <main id="conteudo" tabIndex={-1}>
            {children}
          </main>
          <footer className="site-footer">
            <span>Alexandro Granja © {new Date().getFullYear()}</span>
            <span>
              <LocalizedText>Rio de Janeiro, Brasil</LocalizedText> <span aria-hidden="true">↗</span>
            </span>
          </footer>
          </ArrivalScreen>
        </HomeInteractionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
