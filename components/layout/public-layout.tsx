import { Navbar } from "./navbar"
import { Footer } from "./footer"
import { StickyCTA } from "./sticky-cta"

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <StickyCTA />
    </div>
  )
}
