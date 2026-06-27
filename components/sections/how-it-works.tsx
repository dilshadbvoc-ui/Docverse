"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, ClipboardCheck, Building2, FileCheck, HeartHandshake } from "lucide-react"

const steps = [
  {
    icon: MessageSquare,
    title: "Enquiry",
    description: "Share your goals with us via form, WhatsApp, or call. Our counsellors understand your needs.",
  },
  {
    icon: ClipboardCheck,
    title: "Eligibility Check",
    description: "We assess your qualifications and guide you on the best PhD path based on your profile.",
  },
  {
    icon: Building2,
    title: "University Match",
    description: "Get matched with UGC-approved universities that fit your budget, location, and discipline.",
  },
  {
    icon: FileCheck,
    title: "Enrollment",
    description: "We handle all documentation, application forms, and admission procedures for you.",
  },
  {
    icon: HeartHandshake,
    title: "Support to Completion",
    description: "From thesis to viva, our mentors and experts support you until you earn your doctorate.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 bg-white bg-grid-lines relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-transparent to-slate-50/50 pointer-events-none" />
      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-navy-950 font-heading tracking-tight">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl font-light">
            Your PhD journey simplified in 5 seamless phases
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-[52px] left-[8%] right-[8%] h-[3px] bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-violet rounded-full opacity-30" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div key={step.title} className="relative group">
                <Card className="h-full border border-slate-100 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-1.5 transition-all duration-300 rounded-3xl p-1 overflow-hidden">
                  <CardContent className="p-8 text-center flex flex-col items-center space-y-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan text-white flex items-center justify-center text-sm font-bold shadow-md shadow-brand-blue/20 relative z-10 transition-transform duration-300 group-hover:scale-110">
                      {index + 1}
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center transition-all duration-300 group-hover:bg-slate-100/50">
                      <step.icon className="h-6 w-6 text-slate-700" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-bold text-navy-950 text-lg tracking-tight">{step.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-light">{step.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
