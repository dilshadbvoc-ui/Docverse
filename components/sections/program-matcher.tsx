"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, MapPin, Clock, GraduationCap, IndianRupee, ArrowRight, Filter, Sparkles, CheckCircle2, ChevronRight, RefreshCw, Star } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface University {
  name: string
  slug: string
  location: string
  state: string
  ugcApproved: boolean
}

interface Program {
  id: string
  name: string
  slug: string
  discipline: string
  description: string | null
  duration: string
  mode: string
  feeMin: number | null
  feeMax: number | null
  isFeatured: boolean
  university: University
}

interface ProgramMatcherProps {
  programs: Program[]
  disciplines: string[]
  states: string[]
}

export function ProgramMatcher({ programs, disciplines, states }: ProgramMatcherProps) {
  const [activeTab, setActiveTab] = useState<"quiz" | "browse">("quiz")
  
  // Quiz States
  const [quizStep, setQuizStep] = useState(1)
  const [selectedDiscipline, setSelectedDiscipline] = useState("")
  const [selectedMode, setSelectedMode] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [budgetRange, setBudgetRange] = useState("")

  // Search & Filter States for Browse Tab
  const [searchTerm, setSearchTerm] = useState("")
  const [browseDiscipline, setBrowseDiscipline] = useState("all")
  const [browseMode, setBrowseMode] = useState("all")
  const [browseState, setBrowseState] = useState("all")

  // Quiz Matcher Function
  const getQuizRecommendations = () => {
    return programs.map(p => {
      let score = 0
      let maxScore = 0

      // Match Discipline
      if (selectedDiscipline) {
        maxScore += 40
        if (p.discipline === selectedDiscipline) score += 40
      }
      
      // Match Mode
      if (selectedMode) {
        maxScore += 30
        if (p.mode === selectedMode) score += 30
      }

      // Match State
      if (selectedState) {
        maxScore += 20
        if (p.university.state === selectedState) score += 20
      }

      // Match Budget
      if (budgetRange) {
        maxScore += 10
        if (budgetRange === "low" && p.feeMin && p.feeMin < 100000) score += 10
        if (budgetRange === "mid" && p.feeMin && p.feeMin >= 100000 && p.feeMin <= 200000) score += 10
        if (budgetRange === "high" && p.feeMin && p.feeMin > 200000) score += 10
        if (!p.feeMin) score += 5 // fallback
      }

      const matchPercent = maxScore > 0 ? Math.round((score / maxScore) * 100) : 100
      return { ...p, matchPercent }
    })
    .filter(p => p.matchPercent > 40)
    .sort((a, b) => b.matchPercent - a.matchPercent)
    .slice(0, 3) // Top 3 suggestions
  }

  // Filtered Programs for Browse Tab
  const getFilteredPrograms = () => {
    return programs.filter(p => {
      const matchesSearch = searchTerm === "" || 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesDiscipline = browseDiscipline === "all" || p.discipline === browseDiscipline
      const matchesMode = browseMode === "all" || p.mode === browseMode
      const matchesState = browseState === "all" || p.university.state === browseState

      return matchesSearch && matchesDiscipline && matchesMode && matchesState
    })
  }

  const recommendations = getQuizRecommendations()
  const filteredPrograms = getFilteredPrograms()

  const resetQuiz = () => {
    setSelectedDiscipline("")
    setSelectedMode("")
    setSelectedState("")
    setBudgetRange("")
    setQuizStep(1)
  }

  return (
    <div className="space-y-10">
      {/* Switcher Navigation */}
      <div className="flex items-center justify-center p-1 bg-slate-100 rounded-full max-w-sm mx-auto">
        <button
          onClick={() => setActiveTab("quiz")}
          className={`flex-1 py-3 px-6 text-sm font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-2 ${
            activeTab === "quiz"
              ? "bg-[#181C26] text-white shadow-md"
              : "text-slate-500 hover:text-[#181C26]"
          }`}
        >
          <Sparkles className="h-4 w-4" />
          Smart Matcher
        </button>
        <button
          onClick={() => setActiveTab("browse")}
          className={`flex-1 py-3 px-6 text-sm font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-2 ${
            activeTab === "browse"
              ? "bg-[#181C26] text-white shadow-md"
              : "text-slate-500 hover:text-[#181C26]"
          }`}
        >
          <Filter className="h-4 w-4" />
          Browse All
        </button>
      </div>

      {/* QUIZ INTERACTIVE VIEW */}
      {activeTab === "quiz" && (
        <div className="max-w-4xl mx-auto">
          {quizStep <= 4 ? (
            <Card className="border border-slate-200/60 rounded-[32px] p-8 md:p-12 bg-white/70 backdrop-blur-md shadow-xl shadow-black/5">
              <CardContent className="p-0 space-y-8">
                {/* Step indicator */}
                <div className="flex justify-between items-center w-full">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinobi-green">
                    Question {quizStep} of 4
                  </span>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4].map(s => (
                      <div 
                        key={s} 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          s === quizStep ? "w-8 bg-zinobi-green" : s < quizStep ? "w-2 bg-zinobi-green/40" : "w-2 bg-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* STEP 1: Discipline */}
                {quizStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-[#181C26] tracking-tight">
                      What is your preferred research discipline?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {disciplines.map(d => (
                        <button
                          key={d}
                          onClick={() => {
                            setSelectedDiscipline(d)
                            setQuizStep(2)
                          }}
                          className={`p-4 text-sm font-semibold rounded-2xl border text-center transition-all duration-200 ${
                            selectedDiscipline === d
                              ? "bg-zinobi-green/10 border-zinobi-green text-zinobi-green"
                              : "bg-slate-50 hover:bg-slate-100 border-slate-200/60 text-slate-700"
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2: Mode */}
                {quizStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-[#181C26] tracking-tight">
                      Which study mode fits your work schedule best?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { value: "PART_TIME", label: "Part-Time PhD", desc: "For working professionals who want to study alongside jobs" },
                        { value: "FULL_TIME", label: "Full-Time PhD", desc: "Standard on-campus regular research work" },
                        { value: "ONLINE", label: "Online PhD", desc: "Maximize flexibility with digital learning modules" },
                        { value: "DISTANCE", label: "Distance PhD", desc: "Minimal residency requirements" },
                      ].map(m => (
                        <button
                          key={m.value}
                          onClick={() => {
                            setSelectedMode(m.value)
                            setQuizStep(3)
                          }}
                          className={`p-6 rounded-2xl border text-left transition-all duration-200 flex flex-col space-y-2 ${
                            selectedMode === m.value
                              ? "bg-zinobi-green/10 border-zinobi-green text-zinobi-green"
                              : "bg-slate-50 hover:bg-slate-100 border-slate-200/60 text-slate-700"
                          }`}
                        >
                          <span className="font-bold text-lg">{m.label}</span>
                          <span className="text-xs text-slate-500 font-light">{m.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 3: State Location */}
                {quizStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-[#181C26] tracking-tight">
                      Any university location preference?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      <button
                        onClick={() => {
                          setSelectedState("")
                          setQuizStep(4)
                        }}
                        className={`p-4 text-sm font-semibold rounded-2xl border text-center transition-all duration-200 ${
                          selectedState === ""
                            ? "bg-zinobi-green/10 border-zinobi-green text-zinobi-green"
                            : "bg-slate-50 hover:bg-slate-100 border-slate-200/60 text-slate-700"
                        }`}
                      >
                        No Preference (Anywhere)
                      </button>
                      {states.map(s => (
                        <button
                          key={s}
                          onClick={() => {
                            setSelectedState(s)
                            setQuizStep(4)
                          }}
                          className={`p-4 text-sm font-semibold rounded-2xl border text-center transition-all duration-200 ${
                            selectedState === s
                              ? "bg-zinobi-green/10 border-zinobi-green text-zinobi-green"
                              : "bg-slate-50 hover:bg-slate-100 border-slate-200/60 text-slate-700"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 4: Budget Range */}
                {quizStep === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-[#181C26] tracking-tight">
                      What is your estimated annual budget range?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        { value: "low", label: "Under ₹1.0 Lakh", desc: "Affordable university options" },
                        { value: "mid", label: "₹1.0 - ₹2.0 Lakhs", desc: "Mid-tier state and private universities" },
                        { value: "high", label: "Above ₹2.0 Lakhs", desc: "Top tier private and elite institutes" },
                      ].map(b => (
                        <button
                          key={b.value}
                          onClick={() => {
                            setBudgetRange(b.value)
                            setQuizStep(5)
                          }}
                          className={`p-6 rounded-2xl border text-center transition-all duration-200 flex flex-col space-y-2 justify-center ${
                            budgetRange === b.value
                              ? "bg-zinobi-green/10 border-zinobi-green text-zinobi-green"
                              : "bg-slate-50 hover:bg-slate-100 border-slate-200/60 text-slate-700"
                          }`}
                        >
                          <span className="font-bold">{b.label}</span>
                          <span className="text-xs text-slate-500 font-light">{b.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer Navigation */}
                <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                  {quizStep > 1 ? (
                    <Button 
                      variant="outline" 
                      onClick={() => setQuizStep(s => s - 1)}
                      className="border-slate-200 text-[#181C26] rounded-xl hover:bg-slate-50"
                    >
                      Back
                    </Button>
                  ) : (
                    <div />
                  )}
                  <button 
                    onClick={() => setQuizStep(s => s + 1)}
                    className="text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1"
                  >
                    Skip step <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ) : (
            // Results Recommendation panel
            <div className="space-y-6 animate-fade-in-up">
              <div className="text-center space-y-2">
                <Badge className="bg-zinobi-green/10 text-zinobi-green border border-zinobi-green/20 mb-2 px-4 py-1 rounded-full text-xs font-semibold">
                  Match Analysis Complete
                </Badge>
                <h3 className="text-3xl font-extrabold text-[#181C26] tracking-tight">
                  Suggested PhD Matches For You
                </h3>
                <p className="text-slate-500 font-light">
                  Based on your profile, we have identified these matched programs.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 pt-4">
                {recommendations.map((rec) => (
                  <Card key={rec.id} className={`border border-slate-200/60 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${
                    rec.isFeatured ? "bg-white ring-2 ring-zinobi-green" : "bg-white"
                  }`}>
                    <CardContent className="p-6 flex flex-col justify-between flex-1 space-y-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <Badge className="bg-zinobi-purple/10 text-zinobi-purple border-0">
                            {rec.matchPercent}% Match
                          </Badge>
                          {rec.isFeatured && (
                            <Badge className="bg-zinobi-green/10 text-zinobi-green border-0">Featured</Badge>
                          )}
                        </div>

                        <div className="space-y-1">
                          <h4 className="font-extrabold text-lg leading-snug text-[#181C26]">{rec.name}</h4>
                          <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                            <Building2 className="h-3.5 w-3.5" />
                            {rec.university.name}
                          </span>
                        </div>

                        <p className="text-xs text-slate-400 font-light line-clamp-2 leading-relaxed">
                          {rec.description}
                        </p>

                        <div className="flex flex-wrap gap-2 text-xs text-slate-500 font-medium">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {rec.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {rec.university.state}
                          </span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-50 flex items-center gap-2">
                        <Button className="flex-1 bg-zinobi-green hover:bg-zinobi-green/90 text-white rounded-xl text-xs h-10 font-bold" asChild>
                          <Link href={`/apply?program=${rec.slug}`}>
                            Apply
                          </Link>
                        </Button>
                        <Button variant="outline" className="border-slate-200 rounded-xl hover:bg-slate-50 text-[#181C26] text-xs h-10 font-bold" asChild>
                          <Link href={`/universities/${rec.university.slug}`}>
                            Detail
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {recommendations.length === 0 && (
                <div className="text-center p-12 bg-white rounded-3xl border border-slate-200/60 max-w-md mx-auto">
                  <p className="text-slate-500 mb-4 font-light">No direct matches found. Try broadening your criteria!</p>
                  <Button onClick={resetQuiz} className="bg-zinobi-green text-white">Restart Matcher</Button>
                </div>
              )}

              <div className="flex items-center justify-center gap-4 pt-6">
                <Button variant="outline" onClick={resetQuiz} className="gap-2 border-slate-200 rounded-xl hover:bg-slate-50">
                  <RefreshCw className="h-4 w-4" /> Start Over
                </Button>
                <Button onClick={() => setActiveTab("browse")} className="bg-[#181C26] text-white hover:bg-slate-800 rounded-xl">
                  Browse All ({programs.length})
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* BROWSE ALL STANDARD LIST VIEW */}
      {activeTab === "browse" && (
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl border border-slate-200/60 p-6 space-y-6 sticky top-28 shadow-sm">
              <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
                <Filter className="h-4.5 w-4.5 text-zinobi-green" />
                <h3 className="font-bold text-lg text-[#181C26]">Filters</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Search</label>
                  <Input 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    placeholder="Search program names..." 
                    className="border-slate-200 rounded-xl focus:border-zinobi-green"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Discipline</label>
                  <Select value={browseDiscipline} onValueChange={setBrowseDiscipline}>
                    <SelectTrigger className="border-slate-200 rounded-xl">
                      <SelectValue placeholder="All Disciplines" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Disciplines</SelectItem>
                      {disciplines.map((d) => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Mode</label>
                  <Select value={browseMode} onValueChange={setBrowseMode}>
                    <SelectTrigger className="border-slate-200 rounded-xl">
                      <SelectValue placeholder="All Modes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Modes</SelectItem>
                      {[
                        { value: "PART_TIME", label: "Part-time" },
                        { value: "FULL_TIME", label: "Full-time" },
                        { value: "ONLINE", label: "Online" },
                        { value: "DISTANCE", label: "Distance" },
                      ].map((m) => (
                        <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">State</label>
                  <Select value={browseState} onValueChange={setBrowseState}>
                    <SelectTrigger className="border-slate-200 rounded-xl">
                      <SelectValue placeholder="All States" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All States</SelectItem>
                      {states.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={() => {
                    setSearchTerm("")
                    setBrowseDiscipline("all")
                    setBrowseMode("all")
                    setBrowseState("all")
                  }} 
                  variant="outline" 
                  className="w-full border-slate-200 rounded-xl hover:bg-slate-50 font-semibold"
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Grid list of courses */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500 font-light">
                Showing <strong className="font-bold text-[#181C26]">{filteredPrograms.length}</strong> programs
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredPrograms.map((program) => (
                <Card key={program.id} className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 space-y-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-lg text-[#181C26] leading-snug">{program.name}</h3>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1.5 font-medium">
                          <Building2 className="h-3.5 w-3.5" />
                          {program.university.name}
                        </div>
                      </div>
                      {program.isFeatured && (
                        <Badge className="bg-zinobi-green/10 text-zinobi-green border-0 font-semibold text-xs">Featured</Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      <Badge className="bg-slate-100 text-slate-600 border-0 text-[10px] font-semibold">
                        {program.discipline}
                      </Badge>
                      <Badge className="bg-slate-100 text-slate-600 border-0 text-[10px] font-semibold">
                        {program.mode.replace("_", "-")}
                      </Badge>
                      {program.university.ugcApproved && (
                        <Badge className="bg-zinobi-green/10 text-zinobi-green border-0 text-[10px] font-bold">UGC Approved</Badge>
                      )}
                    </div>

                    <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed font-light">
                      {program.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-slate-400 pt-3 border-t border-slate-50">
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="h-3.5 w-3.5" />
                        {program.duration}
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <MapPin className="h-3.5 w-3.5" />
                        {program.university.location}
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <IndianRupee className="h-3.5 w-3.5" />
                        {program.feeMin && program.feeMax 
                          ? `${formatCurrency(program.feeMin)} - ${formatCurrency(program.feeMax)}`
                          : "Contact for fees"
                        }
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <Button size="sm" className="flex-1 bg-zinobi-green hover:bg-zinobi-green/90 text-white rounded-xl font-bold h-10 text-xs" asChild>
                        <Link href={`/apply?program=${program.slug}`}>
                          Apply Now <ArrowRight className="h-3.5 w-3.5 ml-1" />
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" className="border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl h-10 w-10 p-0 flex items-center justify-center" asChild>
                        <Link href={`/universities/${program.university.slug}`}>
                          <GraduationCap className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPrograms.length === 0 && (
              <div className="text-center py-16">
                <GraduationCap className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#181C26] mb-2">No programs found</h3>
                <p className="text-slate-400 font-light">Try adjusting your filters or search criteria.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
