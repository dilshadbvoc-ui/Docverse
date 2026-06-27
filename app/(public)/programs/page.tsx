import { prisma } from "@/lib/prisma"
import { ProgramMatcher } from "@/components/sections/program-matcher"
import { DISCIPLINES, STATES } from "@/lib/utils"

export const metadata = {
  title: "PhD Programs & Matches | DocVerse",
  description: "Explore UGC-approved PhD programs across 16 disciplines. Find your perfect university fit using our interactive course suggestion matcher.",
}

export default async function ProgramsPage() {
  // Fetch all active programs to enable instant client-side matching & browsing
  const programs = await prisma.program.findMany({
    where: { isActive: true },
    include: { university: true },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
  })

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-24">
      {/* Header */}
      <div className="bg-[#F2F4F7] text-[#181C26] py-16 border-b border-slate-200/50">
        <div className="container max-w-7xl mx-auto px-6 space-y-3">
          <h1 className="text-3xl md:text-5xl font-black font-sans tracking-tight">PhD Programs & Matches</h1>
          <p className="text-slate-500 max-w-2xl font-light text-lg">
            Explore UGC-approved PhD programs across India's top universities. 
            Use our interactive Matcher to get personalized university recommendations, or browse the full catalog.
          </p>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-6 py-12">
        <ProgramMatcher 
          programs={programs} 
          disciplines={DISCIPLINES} 
          states={STATES} 
        />
      </div>
    </div>
  )
}
