"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Search, Fingerprint, Sparkles, Star } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] text-[#181C26] py-12 lg:py-24">
      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content Side */}
          <div className="lg:col-span-7 space-y-8 animate-fade-in-up">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2.5 bg-[#FAF9F6] border border-slate-200/80 rounded-2xl px-4 py-2 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-[#181C26] text-white flex items-center justify-center">
                <Fingerprint className="h-4.5 w-4.5" />
              </div>
              <span className="text-sm font-bold text-slate-800 tracking-tight">
                India's largest PhD platform
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black font-sans leading-[1.08] tracking-tight text-[#181C26]">
              Find professional <br className="hidden md:inline" />
              mentor in every <br className="hidden md:inline" />
              PhD field
            </h1>

            {/* Search Input Box */}
            <div className="flex items-center bg-white border border-slate-200 shadow-sm rounded-2xl p-1.5 max-w-lg w-full">
              <div className="flex items-center flex-1 px-3">
                <Search className="h-5 w-5 text-slate-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search your PhD discipline..." 
                  className="w-full bg-transparent border-0 outline-none text-sm text-[#181C26] placeholder-slate-400"
                />
              </div>
              <Button className="bg-zinobi-green hover:bg-zinobi-green/90 text-white font-semibold rounded-xl px-6 h-12 transition-all duration-300">
                Search
              </Button>
            </div>

            {/* Bottom Subtext */}
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-zinobi-purple/20 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-[#8F7BE6]" />
              </div>
              <span className="text-sm font-semibold text-slate-600">
                50+ expert mentors & 10k+ scholars assisted around the country
              </span>
            </div>
          </div>

          {/* Right Showcase Side */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* The Geometric Frame */}
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-[32px] overflow-hidden group">
              
              {/* Green Slanted Background */}
              <div className="absolute inset-0 bg-zinobi-green" style={{
                clipPath: 'polygon(30% 0%, 100% 0%, 70% 100%, 0% 100%)'
              }} />
              
              {/* White Slanted Background */}
              <div className="absolute inset-0 bg-white/20 backdrop-blur-md" style={{
                clipPath: 'polygon(0% 0%, 30% 0%, 0% 100%, -30% 100%)'
              }} />

              {/* Decorative Circle Icon */}
              <div className="absolute top-8 left-8 w-12 h-12 rounded-full border-2 border-[#8F7BE6] flex items-center justify-center bg-white/50 backdrop-blur-sm">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-brand-violet to-brand-cyan opacity-80" />
              </div>

              {/* Outline Geometric lines */}
              <div className="absolute inset-4 border border-slate-800/10 rounded-[24px] pointer-events-none" style={{
                clipPath: 'polygon(30% 0%, 100% 0%, 70% 100%, 0% 100%)'
              }} />

              {/* Mentor Image */}
              <div className="absolute inset-0 flex items-end justify-center">
                <Image 
                  src="/mentor.png" 
                  alt="PhD Mentor Showcase" 
                  width={400} 
                  height={500} 
                  className="object-cover w-full h-[90%] select-none transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>

              {/* Purple Slanted Name Banner */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#B29FFC] text-[#181C26] py-3 px-6 rounded-xl shadow-lg transform -skew-x-6">
                <div className="transform skew-x-6 text-center">
                  <div className="font-extrabold text-base leading-none">Dr. Anil Menon</div>
                  <div className="text-xs font-semibold opacity-70 mt-1">Management Mentor</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
