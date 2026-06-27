"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, Award, ArrowRight } from "lucide-react"

const partners = [
  { name: "University of Kerala", location: "Thiruvananthapuram", naac: "A++", nirf: 25 },
  { name: "Mahatma Gandhi University", location: "Kottayam", naac: "A", nirf: 42 },
  { name: "Calicut University", location: "Malappuram", naac: "A", nirf: 55 },
  { name: "Anna University", location: "Chennai", naac: "A++", nirf: 14 },
  { name: "Jawaharlal Nehru University", location: "New Delhi", naac: "A++", nirf: 2 },
  { name: "CUSAT", location: "Kochi", naac: "A", nirf: 38 },
]

export function UniversityPartners() {
  return (
    <section className="py-20 bg-[#FAF9F6] text-[#181C26]">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge className="bg-zinobi-purple/10 text-zinobi-purple border border-zinobi-purple/20 hover:bg-zinobi-purple/20 mb-4 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            Trusted Partners
          </Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading mb-4">
            Our University Network
          </h2>
          <p className="text-slate-500 text-lg font-light">
            Partnered with UGC-approved universities across India
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((uni) => (
            <Card key={uni.name} className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                    <Building2 className="h-5 w-5 text-slate-700" />
                  </div>
                  <div className="flex gap-2">
                    <Badge className="bg-zinobi-green/10 text-zinobi-green border-0 text-xs font-semibold">
                      NAAC {uni.naac}
                    </Badge>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#181C26] mb-2">{uni.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-slate-500 mb-1.5">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    {uni.location}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-slate-500">
                    <Award className="h-3.5 w-3.5 text-slate-400" />
                    NIRF Rank: #{uni.nirf}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link 
            href="/universities" 
            className="inline-flex items-center gap-2 text-zinobi-green hover:underline font-bold text-sm"
          >
            View All Universities <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
