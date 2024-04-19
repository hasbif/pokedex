import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { ListProvider } from "./provider";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/graphql/client";
import { url } from "inspector";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokedex App"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{
        backgroundImage: "url('https://www.wallpaperflare.com/static/933/827/743/pok%C3%A9mon-pixel-art-green-grass-wallpaper.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
