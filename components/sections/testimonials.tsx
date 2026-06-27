"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Dr. Anil Menon",
    designation: "Senior Manager",
    organization: "Infosys",
    city: "Kochi",
    content: "DocVerse made my PhD dream a reality while I continued working. Their part-time program guidance and thesis support were exceptional. I completed my PhD in Management from Kerala University in 4 years.",
    rating: 5,
    image: "/mentor.png"
  },
  {
    name: "Dr. Sreeja Nair",
    designation: "Assistant Professor",
    organization: "Sacred Heart College",
    city: "Kochi",
    content: "As a college lecturer, I needed a flexible PhD program. DocVerse connected me with the right university and provided excellent mentoring throughout my journey.",
    rating: 5,
    image: "/avatar-sreeja.png"
  },
  {
    name: "Mohammed Rafi",
    designation: "Project Manager",
    organization: "Dubai Construction Co.",
    city: "Dubai",
    content: "Living in Dubai, I wanted to pursue an Indian PhD for career growth. DocVerse handled everything remotely – from university selection to thesis submission. Truly a lifesaver!",
    rating: 5,
    image: "/avatar-rafi.png"
  },
  {
    name: "Dr. Lakshmi Priya",
    designation: "Research Scientist",
    organization: "CSIR",
    city: "Thiruvananthapuram",
    content: "The journal publication assistance from DocVerse helped me publish 3 papers in Scopus-indexed journals. Their expertise in manuscript preparation is unmatched.",
    rating: 5,
  },
  {
    name: "Vijay Kumar",
    designation: "Software Engineer",
    organization: "TCS",
    city: "Bangalore",
    content: "I was skeptical about online PhD guidance, but DocVerse exceeded my expectations. Their mentor matching system paired me with a perfect guide in Computer Science.",
    rating: 4,
  },
  {
    name: "Dr. Meera Krishnan",
    designation: "Principal",
    organization: "St. Mary's School",
    city: "Kottayam",
    content: "The complete package was worth every rupee. From admission to viva, DocVerse was with me at every step. Highly recommended for working professionals.",
    rating: 5,
  },
]

export function Testimonials() {
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 3
  const totalPages = Math.ceil(testimonials.length / itemsPerPage)

  const currentTestimonials = testimonials.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  )

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50/50 bg-grid-dots relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white pointer-events-none" />
      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <Badge className="bg-brand-blue/10 text-brand-blue border border-brand-blue/20 hover:bg-brand-blue/20 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            Success Stories
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-navy-950 font-heading tracking-tight">
            What Our Scholars Say
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl font-light">
            Real stories from professionals who achieved their PhD with DocVerse
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {currentTestimonials.map((testimonial) => (
            <Card key={testimonial.name} className="border border-slate-100 bg-white/80 backdrop-blur-md hover:bg-white hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-1 transition-all duration-300 rounded-3xl overflow-hidden p-1 group">
              <CardContent className="p-8 space-y-6 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Quote className="h-8 w-8 text-brand-blue/10" />
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < testimonial.rating ? "text-amber-500 fill-amber-500" : "text-slate-200"}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed font-light italic">
                    "{testimonial.content}"
                  </p>
                </div>
                
                <div className="flex items-center gap-4 pt-4 border-t border-slate-100/80">
                  {testimonial.image ? (
                    <div className="relative w-11 h-11 rounded-full overflow-hidden border border-slate-100 shadow-sm shrink-0">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan text-white flex items-center justify-center font-bold text-sm shadow-md shadow-brand-blue/10 shrink-0">
                      {testimonial.name.split(" ").map(n => n[0]).join("")}
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-sm text-navy-950 tracking-tight">{testimonial.name}</div>
                    <div className="text-xs text-slate-500 font-light">
                      {testimonial.designation}, <span className="font-normal text-slate-600">{testimonial.organization}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-12">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="w-10 h-10 rounded-full border-slate-200 bg-white hover:bg-slate-50"
            >
              <ChevronLeft className="h-5 w-5 text-slate-600" />
            </Button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <Button
                key={i}
                variant={currentPage === i ? "default" : "outline"}
                onClick={() => setCurrentPage(i)}
                className={`w-10 h-10 rounded-full text-sm font-semibold transition-all duration-200 ${
                  currentPage === i 
                    ? "bg-navy-950 text-white shadow-lg shadow-navy-950/20" 
                    : "border-slate-200 bg-white hover:bg-slate-50 text-slate-600"
                }`}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage === totalPages - 1}
              className="w-10 h-10 rounded-full border-slate-200 bg-white hover:bg-slate-50"
            >
              <ChevronRight className="h-5 w-5 text-slate-600" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
