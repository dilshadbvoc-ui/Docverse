"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, MessageCircle } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 bg-[#FAF9F6] text-[#181C26]">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="bg-zinobi-green rounded-[36px] p-8 md:p-16 text-white text-center shadow-xl shadow-zinobi-green/10 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-white/10" />
          
          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              Ready to Start Your PhD Journey?
            </h2>
            <p className="text-white/80 text-lg md:text-xl font-light">
              Join 10,000+ working professionals who achieved their doctorate with DocVerse. 
              Get a free consultation today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="gap-1.5 bg-white text-[#181C26] hover:bg-slate-50 px-8 h-14 rounded-full font-bold shadow-md" asChild>
                <Link href="/apply">
                  Apply Now
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 border-white/30 text-white bg-white/5 hover:bg-white/10 hover:text-white px-8 h-14 rounded-full font-bold" asChild>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
            
            <p className="text-xs text-white/60 pt-2 font-medium">
              No obligation. Our counsellors will guide you through the best options for your profile.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
