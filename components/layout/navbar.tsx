"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { GraduationCap, Menu, X, Phone, MessageCircle, ArrowUpRight } from "lucide-react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/programs", label: "Category" },
  { href: "/services", label: "Courses" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF9F6]/90 backdrop-blur-md">
      <div className="container max-w-7xl mx-auto flex h-20 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5">
          <span className="text-2xl font-black tracking-tight text-[#181C26] font-sans">
            DocVerse<span className="text-zinobi-green">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors duration-200 ${
                pathname === link.href
                  ? "text-[#181C26]"
                  : "text-slate-500 hover:text-[#181C26]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Button className="gap-1.5 bg-zinobi-green hover:bg-zinobi-green/90 text-white font-semibold rounded-full px-6 h-11 transition-all duration-300 shadow-md shadow-zinobi-green/10" asChild>
            <Link href="/apply">
              Apply Now
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col gap-6 mt-8">
              <Link href="/" className="flex items-center gap-1.5" onClick={() => setIsOpen(false)}>
                <span className="text-xl font-black tracking-tight text-[#181C26] font-sans">
                  DocVerse<span className="text-zinobi-green">.</span>
                </span>
              </Link>
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 text-sm font-semibold rounded-lg transition-colors ${
                      pathname === link.href
                        ? "text-[#181C26] bg-slate-100"
                        : "text-slate-500 hover:text-[#181C26] hover:bg-slate-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="flex flex-col gap-2 mt-auto">
                <Button className="w-full gap-2 bg-zinobi-green hover:bg-zinobi-green/90 text-white font-semibold rounded-full" asChild>
                  <Link href="/apply" onClick={() => setIsOpen(false)}>
                    Apply Now
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
