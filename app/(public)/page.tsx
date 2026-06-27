import { HeroSection } from "@/components/sections/hero"
import { ServicesSnapshot } from "@/components/sections/services-snapshot"
import { HowItWorks } from "@/components/sections/how-it-works"
import { Testimonials } from "@/components/sections/testimonials"
import { UniversityPartners } from "@/components/sections/university-partners"
import { BlogPreview } from "@/components/sections/blog-preview"
import { CTASection } from "@/components/sections/cta-section"

export const metadata = {
  title: "DocVerse | India's #1 PhD Guidance Platform for Working Professionals",
  description: "Get your PhD without pausing your life. End-to-end PhD admission assistance, thesis writing, and mentoring for working professionals in India.",
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSnapshot />
      <HowItWorks />
      <Testimonials />
      <UniversityPartners />
      <BlogPreview />
      <CTASection />
    </>
  )
}
