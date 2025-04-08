import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mapa de Localização",
  description: "Aplicação para buscar e visualizar locais no mapa",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-black min-h-screen`}>
        <div className="min-h-screen bg-black relative">
          <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-3xl"></div>
          <div className="relative z-10">{children}</div>
        </div>
      </body>
    </html>
  )
}



import './globals.css'