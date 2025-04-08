"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica de autenticação
    console.log("Login com:", email, password)

    // Simular login bem-sucedido e redirecionar para o dashboard
    router.push("/dashboard")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-900/60 backdrop-blur-sm rounded-xl shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Login</h1>
          <p className="mt-2 text-gray-300">Entre com suas credenciais</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button type="submit" className="w-full">
              Entrar
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </main>
  )
}

