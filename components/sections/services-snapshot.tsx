"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Heart } from "lucide-react"

const courses = [
  {
    mentor: "Dr. Anil Menon",
    avatar: "AM",
    rating: "4.8",
    title: "Comprehensive PhD Admission & UGC-Approved University Matching",
    featured: false,
    href: "/services"
  },
  {
    mentor: "Dr. Sreeja Nair",
    avatar: "SN",
    rating: "5.0",
    title: "Premium Chapter-Wise Thesis Writing & Synopsis Preparation Guide",
    featured: true,
    href: "/services"
  },
  {
    mentor: "Dr. Lakshmi Priya",
    avatar: "LP",
    rating: "4.7",
    title: "Research Paper Manuscript Preparation & Scopus Publication Assistance",
    featured: false,
    href: "/services"
  }
]

export function ServicesSnapshot() {
  return (
    <section className="py-20 bg-[#FAF9F6] text-[#181C26]">
      <div className="container max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-black font-sans tracking-tight">
              Our <span className="text-zinobi-green">Top Course</span>
            </h2>
          </div>
          <div>
            <Link 
              href="/services" 
              className="text-sm font-bold text-[#181C26] underline underline-offset-4 hover:opacity-85 transition-opacity"
            >
              See all
            </Link>
          </div>
        </div>

        {/* Card Grid Layout */}
        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card 
              key={course.mentor} 
              className={`border border-slate-200/60 rounded-[28px] overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md ${
                course.featured 
                  ? "bg-zinobi-green text-white" 
                  : "bg-white text-[#181C26]"
              }`}
            >
              <CardContent className="p-8 flex flex-col justify-between flex-1 space-y-8">
                
                {/* Card Header (Avatar, Name, Rating) */}
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      course.featured 
                        ? "bg-white/20 text-white" 
                        : "bg-[#F2F4F7] text-slate-700"
                    }`}>
                      {course.avatar}
                    </div>
                    <span className="font-bold text-sm tracking-tight">{course.mentor}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Heart className={`h-4 w-4 ${course.featured ? "text-white fill-white" : "text-[#181C26]"}`} />
                    <span className="text-sm font-bold">{course.rating}</span>
                  </div>
                </div>

                {/* Card Title Content */}
                <div>
                  <h3 className={`text-xl font-bold leading-snug tracking-tight min-h-[56px] ${
                    course.featured ? "text-white" : "text-[#181C26]"
                  }`}>
                    {course.title}
                  </h3>
                </div>

                {/* Card Footer (Enroll now) */}
                <div className={`pt-6 border-t ${
                  course.featured ? "border-white/20" : "border-slate-100"
                }`}>
                  <Link 
                    href={course.href}
                    className={`inline-flex items-center justify-between w-full font-bold text-sm group ${
                      course.featured ? "text-white" : "text-[#181C26]"
                    }`}
                  >
                    <span>Enroll Now</span>
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </Link>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  )
}
