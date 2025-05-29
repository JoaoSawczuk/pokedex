import type { Metadata } from "next";
import Image from "next/image";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";


const roboto = Roboto_Mono({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Pokemon",
  description: "Pokemon Forever",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main className='content'>
          <nav className='menu'>
            <section className='menuContent flex justify-center items-center gap-4 mt-10'>
              <Image width={70} height={70} src='https://pngimg.com/d/pokemon_logo_PNG12.png' alt='logo'/>
              <h1 className="text-center text-2xl font-bold">Pokemon</h1>
            </section>
          </nav>
          {children}
        </main>
      </body>
    </html>
  )
}