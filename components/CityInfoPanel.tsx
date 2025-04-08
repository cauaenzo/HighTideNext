import { DropletIcon, Users, Mountain, AlertTriangle } from "lucide-react"

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

interface CityInfoPanelProps {
  cityInfo: CityInfo | null
}

export default function CityInfoPanel({ cityInfo }: CityInfoPanelProps) {
  if (!cityInfo) {
    return (
      <div className="bg-gray-900/80 backdrop-blur-md rounded-lg p-6 shadow-lg">
        <p className="text-gray-400 text-center">Busque uma cidade para ver informações e estimativas de inundação.</p>
      </div>
    )
  }

  // Função para formatar números com separadores de milhares
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  // Determinar a classe de cor com base no risco de inundação
  const getRiskColorClass = (risk: string) => {
    switch (risk) {
      case "Alto":
        return "text-red-500"
      case "Médio":
        return "text-orange-500"
      case "Baixo":
        return "text-yellow-500"
      case "Muito Baixo":
        return "text-green-500"
      default:
        return "text-blue-500"
    }
  }

  return (
    <div className="bg-gray-900/80 backdrop-blur-md rounded-lg p-6 shadow-lg">
      <div className="mb-4 border-b border-gray-700 pb-4">
        <h2 className="text-2xl font-bold text-white">{cityInfo.name}</h2>
        <p className="text-gray-300">
          {cityInfo.state && `${cityInfo.state}, `}
          {cityInfo.country}
        </p>
        <div className="text-xs text-gray-400 mt-1">
          Coordenadas: {cityInfo.coordinates.lat.toFixed(4)}, {cityInfo.coordinates.lng.toFixed(4)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-900/30 p-2 rounded-lg">
            <Users size={20} className="text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">População</p>
            <p className="text-lg font-semibold text-white">
              {cityInfo.population ? formatNumber(cityInfo.population) : "N/A"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-blue-900/30 p-2 rounded-lg">
            <Mountain size={20} className="text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Elevação</p>
            <p className="text-lg font-semibold text-white">
              {cityInfo.elevation ? `${cityInfo.elevation} metros` : "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-800/50">
        <div className="flex items-center gap-2 mb-3">
          <DropletIcon size={20} className="text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Estimativa de Inundação</h3>
        </div>

        <div className="mb-3">
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-300">Risco de inundação:</span>
            <span className={`text-sm font-semibold ${getRiskColorClass(cityInfo.floodEstimate || "")}`}>
              {cityInfo.floodEstimate || "Desconhecido"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-gray-300">Tempo estimado:</span>
            <span className="text-sm font-semibold text-white">
              {cityInfo.floodYears ? `${cityInfo.floodYears} anos` : "Desconhecido"}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-2 mt-4 bg-blue-950/50 p-3 rounded-md">
          <AlertTriangle size={18} className="text-yellow-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-gray-300">
            Esta é uma estimativa baseada na elevação da cidade e nas projeções atuais de aumento do nível do mar.
            Fatores locais como infraestrutura de proteção contra inundações podem alterar significativamente estes
            valores.
          </p>
        </div>
      </div>
    </div>
  )
}

