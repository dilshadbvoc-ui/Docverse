"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageCircle, Phone } from "lucide-react"

export function StickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#FAF9F6] border-t border-slate-200/60 shadow-lg lg:hidden">
      <div className="container max-w-7xl mx-auto flex items-center justify-between gap-3 py-3 px-6">
        <Button variant="outline" className="flex-1 gap-2 h-11 border-slate-200 hover:bg-slate-50 text-[#181C26] rounded-full" asChild>
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-4 w-4 text-zinobi-green" />
            <span className="text-sm font-semibold">WhatsApp</span>
          </a>
        </Button>
        <Button className="flex-1 gap-2 h-11 bg-zinobi-green hover:bg-zinobi-green/90 text-white rounded-full font-semibold" asChild>
          <Link href="/apply">
            <Phone className="h-4 w-4" />
            <span className="text-sm">Apply Now</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}
