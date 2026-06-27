import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, Target, Award, Heart, BookOpen, Lightbulb, Shield } from "lucide-react";

export const metadata = {
  title: "About Us | DocVerse",
  description: "Learn about DocVerse - India's #1 PhD guidance platform for working professionals.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-24">
      {/* Header */}
      <div className="bg-[#F2F4F7] text-[#181C26] py-16 border-b border-slate-200/50">
        <div className="container max-w-7xl mx-auto px-6 space-y-3">
          <h1 className="text-3xl md:text-5xl font-black font-sans tracking-tight">About DocVerse</h1>
          <p className="text-slate-500 max-w-xl font-light text-lg">
            Making doctorate education accessible, structured, and achievable.
          </p>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-6 py-16 space-y-20">
        {/* Story Section */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <Badge className="bg-zinobi-purple/10 text-zinobi-purple border border-zinobi-purple/20 hover:bg-zinobi-purple/20 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              Our Story
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#181C26] font-sans tracking-tight leading-tight">
              Built for Working Professionals, <br />by Working Professionals
            </h2>
            <p className="text-slate-600 leading-relaxed font-light">
              DocVerse was founded in 2024 by Prohostix Digital, Kochi, with a clear mission: to make PhD education accessible to India's working professionals who aspire for academic excellence without compromising their careers.
            </p>
            <p className="text-slate-600 leading-relaxed font-light">
              We understand the unique challenges faced by working professionals — time constraints, lack of guidance, and the complexity of university admissions. Our platform bridges these gaps with technology-driven solutions and personalized mentoring.
            </p>
          </div>
          <div className="lg:col-span-5 relative w-full aspect-[4/3] rounded-[32px] overflow-hidden shadow-xl border border-slate-200/40">
            <Image 
              src="/about-workspace.png" 
              alt="DocVerse Workspace Team" 
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Users, label: "10,000+", desc: "Scholars Guided", color: "bg-zinobi-green/10 text-zinobi-green border-zinobi-green/20" },
            { icon: GraduationCap, label: "500+", desc: "PhD Completions", color: "bg-zinobi-purple/10 text-zinobi-purple border-zinobi-purple/20" },
            { icon: Target, label: "98%", desc: "Success Rate", color: "bg-brand-blue/10 text-brand-blue border-brand-blue/20" },
            { icon: Award, label: "200+", desc: "Partner Universities", color: "bg-brand-orange/10 text-brand-orange border-brand-orange/20" },
          ].map((stat) => (
            <Card key={stat.label} className="border border-slate-200/60 rounded-3xl bg-white hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center space-y-3">
                <div className={`w-12 h-12 rounded-2xl ${stat.color} border flex items-center justify-center mx-auto`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-3xl font-black text-[#181C26]">{stat.label}</div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1">{stat.desc}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Values Section */}
        <div className="space-y-12">
          <div className="text-center space-y-3">
            <Badge className="bg-zinobi-green/10 text-zinobi-green border border-zinobi-green/20 hover:bg-zinobi-green/20 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              Our Values
            </Badge>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#181C26] tracking-tight">What Drives Us</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Heart, title: "Student First", desc: "Every decision we make is centered around what's best for our students' academic and career growth.", color: "bg-red-500/10 text-red-500 border-red-500/20" },
              { icon: BookOpen, title: "Academic Excellence", desc: "We maintain the highest standards in research guidance, ensuring quality outcomes for every scholar.", color: "bg-zinobi-green/10 text-zinobi-green border-zinobi-green/20" },
              { icon: Lightbulb, title: "Innovation", desc: "We leverage technology to simplify complex PhD processes and make guidance accessible to everyone.", color: "bg-zinobi-purple/10 text-zinobi-purple border-zinobi-purple/20" },
              { icon: Shield, title: "Integrity", desc: "Transparency in pricing, honest guidance, and ethical practices form the foundation of our operations.", color: "bg-brand-blue/10 text-brand-blue border-brand-blue/20" },
              { icon: Users, title: "Community", desc: "We build a supportive network of scholars, mentors, and universities that uplift each other.", color: "bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20" },
              { icon: Target, title: "Results", desc: "We measure our success by the number of scholars who successfully complete their PhD journey.", color: "bg-brand-orange/10 text-brand-orange border-brand-orange/20" },
            ].map((value) => (
              <Card key={value.title} className="border border-slate-200/60 rounded-3xl bg-white hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className={`w-10 h-10 rounded-xl ${value.color} border flex items-center justify-center`}>
                    <value.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#181C26] text-lg mb-2">{value.title}</h3>
                    <p className="text-sm text-slate-500 font-light leading-relaxed">{value.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Vision Statement */}
        <div className="bg-zinobi-green/10 border border-zinobi-green/20 rounded-[36px] p-8 md:p-12 text-center max-w-4xl mx-auto space-y-3">
          <h2 className="text-2xl font-black text-[#181C26] tracking-tight">Our Vision</h2>
          <p className="text-slate-700 max-w-2xl mx-auto text-lg md:text-xl font-light italic leading-relaxed">
            "To be the most trusted PhD guidance platform for working professionals in India — 
            making doctorate education accessible, structured, and achievable without pausing your life."
          </p>
        </div>
      </div>
    </div>
  );
}
