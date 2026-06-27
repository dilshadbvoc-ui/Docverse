"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, ArrowRight, ArrowLeft, Loader2, MessageCircle } from "lucide-react"
import { DISCIPLINES, STATES, BUDGET_RANGES, QUALIFICATIONS, PROGRAM_MODES } from "@/lib/utils"
import { createLead } from "@/lib/actions"

export function LeadForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
    discipline: "",
    state: "",
    modePreference: "",
    budgetRange: "",
    isUrgent: false,
    preferredCallTime: "",
  })

  const updateField = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    const form = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, String(value))
    })
    form.append("source", "ORGANIC")

    const result = await createLead(form)
    setIsSubmitting(false)

    if (result.success) {
      setIsSuccess(true)
    }
  }

  if (isSuccess) {
    return (
      <Card className="border-border/50">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-[#181C26] mb-2">Application Submitted!</h3>
          <p className="text-muted-foreground mb-6">
            Thank you for your interest. Our counsellor will contact you within 30 minutes during business hours.
          </p>
          <div className="bg-[#FAF9F6] border border-slate-200/50 rounded-2xl p-4 mb-6">
            <p className="text-sm text-slate-600">
              <strong>Assigned Counsellor:</strong> Priya Sharma<br />
              <strong>Contact:</strong> +91 98765 43211
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" className="gap-2" asChild>
              <a href="https://wa.me/919876543211" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </Button>
            <Button onClick={() => router.push("/")} variant="navy">
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/50">
      <CardContent className="p-6 md:p-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-navy-950">Step {step} of 3</span>
            <span className="text-sm text-muted-foreground">{step === 1 ? "Personal Info" : step === 2 ? "Academic Details" : "Preferences"}</span>
          </div>
          <Progress value={(step / 3) * 100} className="h-2" />
        </div>

        {/* Step 1: Personal Info */}
        {step === 1 && (
          <div className="space-y-4 animate-in">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                required
              />
            </div>
          </div>
        )}

        {/* Step 2: Academic Details */}
        {step === 2 && (
          <div className="space-y-4 animate-in">
            <div className="space-y-2">
              <Label htmlFor="qualification">Highest Qualification *</Label>
              <Select value={formData.qualification} onValueChange={(v) => updateField("qualification", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select qualification" />
                </SelectTrigger>
                <SelectContent>
                  {QUALIFICATIONS.map((q) => (
                    <SelectItem key={q} value={q}>{q}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="discipline">Preferred Discipline *</Label>
              <Select value={formData.discipline} onValueChange={(v) => updateField("discipline", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select discipline" />
                </SelectTrigger>
                <SelectContent>
                  {DISCIPLINES.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">Your State *</Label>
              <Select value={formData.state} onValueChange={(v) => updateField("state", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {STATES.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Step 3: Preferences */}
        {step === 3 && (
          <div className="space-y-4 animate-in">
            <div className="space-y-2">
              <Label htmlFor="mode">Mode Preference</Label>
              <Select value={formData.modePreference} onValueChange={(v) => updateField("modePreference", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  {PROGRAM_MODES.map((m) => (
                    <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Budget Range</Label>
              <Select value={formData.budgetRange} onValueChange={(v) => updateField("budgetRange", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget" />
                </SelectTrigger>
                <SelectContent>
                  {BUDGET_RANGES.map((b) => (
                    <SelectItem key={b} value={b}>{b}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="callTime">Preferred Call Time</Label>
              <Select value={formData.preferredCallTime} onValueChange={(v) => updateField("preferredCallTime", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12 PM - 4 PM)</SelectItem>
                  <SelectItem value="evening">Evening (4 PM - 7 PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="urgent"
                checked={formData.isUrgent}
                onChange={(e) => updateField("isUrgent", e.target.checked)}
                className="rounded border-gray-300"
              />
              <Label htmlFor="urgent" className="text-sm cursor-pointer">
                This is urgent — I need guidance within 24 hours
              </Label>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          {step > 1 ? (
            <Button variant="outline" onClick={() => setStep(s => s - 1)} className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <Button 
              onClick={() => setStep(s => s + 1)} 
              className="gap-2 bg-zinobi-green hover:bg-zinobi-green/90 text-white rounded-xl"
              disabled={step === 1 && (!formData.name || !formData.email || !formData.phone)}
            >
              Next <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit} 
              className="gap-2 bg-zinobi-green hover:bg-zinobi-green/90 text-white rounded-xl"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</>
              ) : (
                <><CheckCircle className="h-4 w-4" /> Submit Application</>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
