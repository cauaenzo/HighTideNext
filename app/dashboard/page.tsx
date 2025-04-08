"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Menu, Search, MapPin, LogOut } from "lucide-react"
import CityInfoPanel from "@/components/CityInfoPanel"

// Interface para as informações da cidade
interface CityInfo {
  name: string
  country: string
  state?: string
  elevation?: number
  population?: number
  floodEstimate?: string
  floodYears?: number
  coordinates: {
    lat: number
    lng: number
  }
}

// Importar o componente de mapa dinamicamente para evitar problemas de SSR
const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[500px] bg-gray-800 rounded-lg">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  ),
})

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const [cityInfo, setCityInfo] = useState<CityInfo | null>(null)

  // Verificar se é mobile ao carregar e quando a janela for redimensionada
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Função para lidar com a pesquisa
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // A pesquisa já é tratada pelo efeito no MapComponent
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed md:relative z-20 w-64 h-full transition-transform duration-300 ease-in-out bg-gray-900/80 backdrop-blur-md`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white"> HighTide🌎</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden bg-transparent p-1 text-gray-400 hover:text-white"
            >
              <Menu size={24} />
            </button>
          </div>

          <nav className="flex-1 space-y-4">
            <Link
              href="/"
              className="flex items-center space-x-2 p-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <MapPin size={20} />
              <span>Mapa</span>
            </Link>

            <Link
              href="/login"
              className="flex items-center space-x-2 p-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <LogOut size={20} />
              <span>Sair</span>
            </Link>
          </nav>

          <div className="pt-4 border-t border-gray-700">
            <p className="text-sm text-gray-400">© 2025 cauaenzo</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-900/40 backdrop-blur-sm">
        {/* Header */}
        <header className="bg-gray-900/60 p-4 shadow-md">
          <div className="flex items-center justify-between">
            {!isSidebarOpen && (
              <button onClick={() => setIsSidebarOpen(true)} className="p-1 mr-4 text-gray-400 hover:text-white">
                <Menu size={24} />
              </button>
            )}

            <div className="flex-1 max-w-xl">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Buscar cidade..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <button
                  type="submit"
                  className="absolute right-2 top-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
                >
                  Buscar
                </button>
              </form>
            </div>
          </div>
        </header>

        {/* Content Container */}
        <div className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Map Container */}
            <div className="lg:col-span-2 bg-gray-800 rounded-lg overflow-hidden shadow-xl">
              <MapComponent searchQuery={searchQuery} onCityInfoChange={setCityInfo} />
            </div>

            {/* City Info Panel */}
            <div className="lg:col-span-1">
              <CityInfoPanel cityInfo={cityInfo} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

