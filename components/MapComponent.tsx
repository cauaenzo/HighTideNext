"use client"

import { useEffect, useRef, useState } from "react"
import L from "leaflet"
import { MapPin } from "lucide-react"

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

interface MapComponentProps {
  searchQuery?: string
  onCityInfoChange?: (cityInfo: CityInfo | null) => void
}

export default function MapComponent({ searchQuery, onCityInfoChange }: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [isMapInitialized, setIsMapInitialized] = useState(false)
  const [cityInfo, setCityInfo] = useState<CityInfo | null>(null)

  // Inicializar o mapa
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    // Carregar CSS do Leaflet
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "https://unpkg.com/leaflet/dist/leaflet.css"
    document.head.appendChild(link)

    // Inicializar o mapa
    const map = L.map(mapContainerRef.current, {
      attributionControl: false,
    }).setView([20, 0], 2)

    // Adicionar camada de tiles do OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    mapRef.current = map
    setIsMapInitialized(true)

    // Limpar ao desmontar
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  // Função para calcular a estimativa de inundação (simulada)
  const calculateFloodEstimate = (elevation = 0) => {
    // Simulação: cidades abaixo de 10m de elevação estão em maior risco
    if (elevation < 5) {
      return {
        risk: "Alto",
        years: Math.floor(Math.random() * 30) + 20, // 20-50 anos
        description: "Risco crítico de inundação",
      }
    } else if (elevation < 10) {
      return {
        risk: "Médio",
        years: Math.floor(Math.random() * 50) + 50, // 50-100 anos
        description: "Risco moderado de inundação",
      }
    } else if (elevation < 20) {
      return {
        risk: "Baixo",
        years: Math.floor(Math.random() * 100) + 100, // 100-200 anos
        description: "Risco baixo de inundação",
      }
    } else {
      return {
        risk: "Muito Baixo",
        years: Math.floor(Math.random() * 200) + 200, // 200-400 anos
        description: "Risco mínimo de inundação",
      }
    }
  }

  // Função para geocodificar uma cidade usando Nominatim
  const geocodeCity = async (city: string) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1&addressdetails=1`
    try {
      const response = await fetch(url)
      const data = await response.json()
      if (data.length > 0) {
        const { lat, lon, display_name, address } = data[0]

        // Extrair informações da cidade
        const name = address.city || address.town || address.village || address.hamlet || city
        const country = address.country || "Desconhecido"
        const state = address.state || address.county || ""

        // Simular elevação (em uma aplicação real, você usaria uma API de elevação)
        const elevation = Math.floor(Math.random() * 50)

        // Simular população
        const population = Math.floor(Math.random() * 5000000) + 10000

        // Calcular estimativa de inundação
        const floodData = calculateFloodEstimate(elevation)

        const newCityInfo: CityInfo = {
          name,
          country,
          state,
          elevation,
          population,
          floodEstimate: floodData.risk,
          floodYears: floodData.years,
          coordinates: {
            lat: Number.parseFloat(lat),
            lng: Number.parseFloat(lon),
          },
        }

        // Atualizar o estado e notificar o componente pai
        setCityInfo(newCityInfo)
        if (onCityInfoChange) {
          onCityInfoChange(newCityInfo)
        }

        return newCityInfo.coordinates
      } else {
        setCityInfo(null)
        if (onCityInfoChange) {
          onCityInfoChange(null)
        }
        alert("Cidade não encontrada. Por favor, tente novamente.")
        return null
      }
    } catch (error) {
      setCityInfo(null)
      if (onCityInfoChange) {
        onCityInfoChange(null)
      }
      alert("Ocorreu um erro ao buscar a localização.")
      return null
    }
  }

  // Função para mostrar a localização atual do usuário
  const showCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocalização não é suportada pelo seu navegador.")
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        if (mapRef.current) {
          mapRef.current.setView([latitude, longitude], 12)

          // Tentar obter informações da localização atual usando geocodificação reversa
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`,
            )
            const data = await response.json()

            if (data && data.address) {
              const { address } = data
              const name = address.city || address.town || address.village || address.hamlet || "Sua Localização"
              const country = address.country || "Desconhecido"
              const state = address.state || address.county || ""

              // Simular elevação
              const elevation = Math.floor(Math.random() * 50)

              // Simular população
              const population = Math.floor(Math.random() * 5000000) + 10000

              // Calcular estimativa de inundação
              const floodData = calculateFloodEstimate(elevation)

              const newCityInfo: CityInfo = {
                name,
                country,
                state,
                elevation,
                population,
                floodEstimate: floodData.risk,
                floodYears: floodData.years,
                coordinates: {
                  lat: latitude,
                  lng: longitude,
                },
              }

              setCityInfo(newCityInfo)
              if (onCityInfoChange) {
                onCityInfoChange(newCityInfo)
              }
            }
          } catch (error) {
            console.error("Erro ao obter informações da localização:", error)
          }

          // Adicionar um marcador para a localização do usuário
          L.marker([latitude, longitude]).addTo(mapRef.current).bindPopup("<b>Sua Localização</b>").openPopup()
        }
      },
      (error) => {
        alert("Não foi possível obter sua localização. Verifique se os serviços de localização estão ativados.")
        console.error(error)
      },
    )
  }

  // Efeito para buscar localização quando searchQuery mudar
  useEffect(() => {
    const searchLocation = async () => {
      if (!searchQuery || !mapRef.current || !isMapInitialized) return

      const location = await geocodeCity(searchQuery)
      if (location) {
        mapRef.current.setView([location.lat, location.lng], 10)

        // Limpar marcadores existentes
        mapRef.current.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            mapRef.current?.removeLayer(layer)
          }
        })

        // Adicionar um novo marcador
        L.marker([location.lat, location.lng])
          .addTo(mapRef.current)
          .bindPopup(`<b>${cityInfo?.name || searchQuery}</b>`)
          .openPopup()
      }
    }

    if (searchQuery) {
      searchLocation()
    }
  }, [searchQuery, isMapInitialized])

  return (
    <div className="relative">
      <div ref={mapContainerRef} className="h-[70vh] w-full"></div>

      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button
          onClick={showCurrentLocation}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg"
          title="Mostrar minha localização"
        >
          <MapPin size={20} />
        </button>
      </div>
    </div>
  )
}

