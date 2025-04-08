"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        <span className="sr-only">Toggle menu</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background p-6 animate-in slide-in-from-top-5">
          <nav className="flex flex-col gap-6">
            <Link href="#features" className="text-lg font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
              Features
            </Link>
            <Link
              href="#testimonials"
              className="text-lg font-medium hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Testimonials
            </Link>
            <Link href="#pricing" className="text-lg font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
              Pricing
            </Link>
            <Link href="#contact" className="text-lg font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
            <Button className="mt-4" onClick={() => setIsOpen(false)}>
              Get Started
            </Button>
          </nav>
        </div>
      )}
    </div>
  )
}

