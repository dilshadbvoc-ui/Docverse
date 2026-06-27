import Link from "next/link"
import { MapPin, Phone, Mail, MessageCircle, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

const footerLinks = {
  services: [
    { label: "PhD Admission Assistance", href: "/services" },
    { label: "Thesis Writing", href: "/services" },
    { label: "Synopsis Preparation", href: "/services" },
    { label: "Journal Publication", href: "/services" },
    { label: "Entrance Coaching", href: "/services" },
    { label: "1:1 Mentoring", href: "/services" },
  ],
  resources: [
    { label: "PhD Programs", href: "/programs" },
    { label: "Universities", href: "/universities" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Success Stories", href: "/about" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/about" },
    { label: "Privacy Policy", href: "/about" },
    { label: "Terms of Service", href: "/about" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[#181C26] text-white">
      <div className="container max-w-7xl mx-auto py-12 lg:py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-1.5">
              <span className="text-2xl font-black tracking-tight text-white font-sans">
                DocVerse<span className="text-zinobi-green">.</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-light">
              India's #1 PhD Guidance Platform for Working Professionals. 
              We make doctorate education accessible, structured, and achievable 
              without pausing your career.
            </p>
            <div className="space-y-3 text-slate-400 text-sm font-light">
              <div className="flex items-center gap-3">
                <MapPin className="h-4.5 w-4.5 text-zinobi-green shrink-0" />
                <span>Prohostix Digital, Kochi, Kerala, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4.5 w-4.5 text-zinobi-green shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4.5 w-4.5 text-zinobi-green shrink-0" />
                <span>hello@docverse.in</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-5">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors font-light">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-5">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors font-light">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-5">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors font-light">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 font-light">
            © 2026 DocVerse by Prohostix Digital. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-slate-500 hover:text-white transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://wa.me/919876543210" className="text-slate-500 hover:text-white transition-colors">
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
