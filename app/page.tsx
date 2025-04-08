import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 relative">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-900/60 backdrop-blur-sm rounded-xl shadow-xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">HighTide🌎</h1>
          <p className="text-gray-300">um projeto autoral</p>
        </div>

        <div className="space-y-4">
          <p className="text-gray-300 text-center">
            Esta aplicação permite que você pesquise locais e visualize-os em um mapa interativo e veja a estimativa do avanço do mar.
          </p>

          <div className="pt-4">
            <Link
              href="/dashboard"
              className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200"
            >
              Ir para o Mapa
            </Link>
          </div>

          <div className="text-center pt-2">
            <Link href="/login" className="text-blue-400 hover:text-blue-300 text-sm">
              Fazer login
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 text-gray-400 text-sm">
        cauaenzo
      </div>
    </main>
  )
}

