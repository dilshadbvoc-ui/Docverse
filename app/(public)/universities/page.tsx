import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, ExternalLink, GraduationCap } from "lucide-react";

export const metadata = {
  title: "Universities | DocVerse",
  description: "Explore UGC-approved partner universities for PhD programs across India.",
};

export default async function UniversitiesPage() {
  const universities = await prisma.university.findMany({
    where: { isActive: true },
    orderBy: [{ isPartner: "desc" }, { name: "asc" }],
  });

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-24">
      {/* Header */}
      <div className="bg-[#F2F4F7] text-[#181C26] py-16 border-b border-slate-200/50">
        <div className="container max-w-7xl mx-auto px-6 space-y-3">
          <h1 className="text-3xl md:text-5xl font-black font-sans tracking-tight">Partner Universities</h1>
          <p className="text-slate-500 max-w-xl font-light text-lg">
            UGC-approved universities with active partnerships for PhD admissions.
          </p>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {universities.map((uni) => (
            <Card key={uni.id} className="bg-white border border-slate-200/60 rounded-[32px] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-1.5">
              {/* Card top gradient bar */}
              <div className="h-3 w-full bg-gradient-to-r from-zinobi-green to-zinobi-purple" />
              
              <CardContent className="p-8 flex flex-col justify-between flex-1 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-zinobi-purple/10 text-zinobi-purple border border-zinobi-purple/20 flex items-center justify-center">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    {uni.isPartner && (
                      <Badge className="bg-zinobi-green/10 text-zinobi-green border-0 font-bold text-xs">
                        Official Partner
                      </Badge>
                    )}
                  </div>

                  <div>
                    <h3 className="font-extrabold text-[#181C26] text-xl leading-tight mb-2">{uni.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" /> {uni.location}, {uni.state}
                    </div>
                  </div>

                  {/* Accreditations */}
                  <div className="flex flex-wrap gap-1.5">
                    {uni.ugcApproved && (
                      <Badge className="bg-slate-100 text-slate-600 border border-slate-200/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        UGC Approved
                      </Badge>
                    )}
                    {uni.naacGrade && (
                      <Badge className="bg-zinobi-purple/10 text-zinobi-purple border border-zinobi-purple/20 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        NAAC {uni.naacGrade}
                      </Badge>
                    )}
                    {uni.nirfRank && (
                      <Badge className="bg-brand-blue/10 text-brand-blue border border-brand-blue/20 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        NIRF #{uni.nirfRank}
                      </Badge>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 font-light leading-relaxed line-clamp-3">{uni.description}</p>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button className="flex-1 bg-zinobi-green hover:bg-zinobi-green/90 text-white rounded-xl font-bold h-11 text-xs" asChild>
                    <Link href={`/programs?state=${uni.state}`}>View Programs</Link>
                  </Button>
                  {uni.website && (
                    <Button variant="outline" className="border-slate-200 rounded-xl hover:bg-slate-50 h-11 px-3" asChild>
                      <a href={uni.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 text-slate-500" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
