import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, ArrowRight, Star, ChevronRight } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export const metadata = {
  title: "Our Services | DocVerse",
  description: "Comprehensive PhD guidance services including admission assistance, thesis writing, synopsis preparation, and mentoring.",
}

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" },
  })

  const categories = [
    { id: "all", label: "All Services" },
    { id: "ADMISSION", label: "Admission" },
    { id: "COMPLETE_PACKAGE", label: "Complete Package" },
    { id: "THESIS", label: "Thesis" },
    { id: "SYNOPSIS", label: "Synopsis" },
    { id: "COACHING", label: "Coaching" },
    { id: "JOURNAL", label: "Journal" },
    { id: "MENTORING", label: "Mentoring" },
  ]

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-24">
      {/* Header */}
      <div className="bg-[#F2F4F7] text-[#181C26] py-16 border-b border-slate-200/50">
        <div className="container max-w-7xl mx-auto px-6 text-center space-y-3">
          <h1 className="text-3xl md:text-5xl font-black font-sans tracking-tight">Our Services</h1>
          <p className="text-slate-500 max-w-2xl mx-auto font-light text-lg">
            From admission to thesis submission, we offer comprehensive PhD guidance 
            tailored for working professionals. Choose the package that fits your needs.
          </p>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-6 py-12 space-y-8">
        <Tabs defaultValue="all" className="w-full">
          
          {/* Custom Tabs List Selector */}
          <TabsList className="mb-10 flex flex-wrap h-auto gap-2 bg-slate-100 p-1.5 rounded-2xl max-w-4xl mx-auto justify-center">
            {categories.map((cat) => (
              <TabsTrigger 
                key={cat.id} 
                value={cat.id}
                className="data-[state=active]:bg-[#181C26] data-[state=active]:text-white text-slate-500 hover:text-[#181C26] px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
              >
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id} className="focus-visible:outline-none">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services
                  .filter(s => cat.id === "all" || s.category === cat.id)
                  .map((service) => {
                    const features = JSON.parse((service.features as string) || "[]")
                    return (
                      <Card 
                        key={service.id} 
                        className={`bg-white border border-slate-200/60 rounded-[32px] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-1.5 ${
                          service.isPopular ? "ring-2 ring-zinobi-green" : ""
                        }`}
                      >
                        <CardContent className="p-8 flex flex-col justify-between flex-1 space-y-6">
                          
                          <div className="space-y-4">
                            <div className="flex justify-between items-start">
                              <Badge className="bg-zinobi-purple/10 text-zinobi-purple border-0 font-semibold text-xs">
                                {service.category.replace("_", " ")}
                              </Badge>
                              {service.isPopular && (
                                <Badge className="bg-zinobi-green/10 text-zinobi-green border-0 font-bold text-xs flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-current" /> Most Popular
                                </Badge>
                              )}
                            </div>

                            <div className="space-y-2">
                              <h3 className="text-xl font-bold text-[#181C26] tracking-tight">{service.name}</h3>
                              <p className="text-xs text-slate-400 font-light leading-relaxed min-h-[40px]">{service.description}</p>
                            </div>

                            <div className="pt-2">
                              <span className="text-3xl font-black text-[#181C26] tracking-tight">
                                {service.priceMin === service.priceMax 
                                  ? formatCurrency(service.priceMin || 0)
                                  : `${formatCurrency(service.priceMin || 0)} - ${formatCurrency(service.priceMax || 0)}`
                                }
                              </span>
                            </div>

                            <ul className="space-y-3 pt-4 border-t border-slate-50">
                              {features.slice(0, 4).map((feature: string, i: number) => (
                                <li key={i} className="flex items-start gap-2.5 text-xs text-slate-500 font-light leading-relaxed">
                                  <Check className="h-4 w-4 text-zinobi-green shrink-0 mt-0.5" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                              {features.length > 4 && (
                                <li className="text-xs font-bold text-zinobi-purple hover:underline cursor-pointer flex items-center gap-0.5">
                                  +{features.length - 4} more features <ChevronRight className="h-3 w-3" />
                                </li>
                              )}
                            </ul>
                          </div>

                          <Button className="w-full bg-zinobi-green hover:bg-zinobi-green/90 text-white rounded-xl font-bold h-11 text-sm mt-4 gap-1.5" asChild>
                            <Link href={`/apply?service=${service.slug}`}>
                              Get Started <ArrowRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    )
                  })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
