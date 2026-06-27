import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react";

export const metadata = {
  title: "Contact Us | DocVerse",
  description: "Get in touch with DocVerse for PhD guidance and admission assistance.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-24">
      {/* Header */}
      <div className="bg-[#F2F4F7] text-[#181C26] py-16 border-b border-slate-200/50">
        <div className="container max-w-7xl mx-auto px-6 space-y-3">
          <h1 className="text-3xl md:text-5xl font-black font-sans tracking-tight">Contact Us</h1>
          <p className="text-slate-500 max-w-xl font-light text-lg">
            Have questions? We are here to help you on your PhD journey.
          </p>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Info Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <Badge className="bg-zinobi-purple/10 text-zinobi-purple border-0 font-bold text-xs uppercase tracking-wider py-1 px-3">
                Reach Out
              </Badge>
              <h2 className="text-2xl font-extrabold text-[#181C26] tracking-tight">Get in touch directly</h2>
              <p className="text-slate-500 font-light text-sm">
                Our support team is available during business hours to assist you.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: MapPin, title: "Office Address", content: "Prohostix Digital, Kochi, Kerala, India", color: "bg-zinobi-green/10 text-zinobi-green border-zinobi-green/20" },
                { icon: Phone, title: "Phone Number", content: "+91 98765 43210", color: "bg-zinobi-purple/10 text-zinobi-purple border-zinobi-purple/20" },
                { icon: Mail, title: "Email Address", content: "hello@docverse.in", color: "bg-brand-blue/10 text-brand-blue border-brand-blue/20" },
                { icon: Clock, title: "Business Hours", content: "Mon-Sat: 9 AM - 7 PM IST", color: "bg-brand-orange/10 text-brand-orange border-brand-orange/20" },
                { icon: MessageCircle, title: "WhatsApp Support", content: "+91 98765 43210", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
              ].map((item) => (
                <Card key={item.title} className="border border-slate-200/60 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl ${item.color} border flex items-center justify-center shrink-0`}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-bold text-[#181C26] text-sm">{item.title}</div>
                      <div className="text-xs text-slate-500 font-light mt-0.5">{item.content}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <Card className="border border-slate-200/60 rounded-[32px] bg-white shadow-sm">
              <CardContent className="p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-extrabold text-[#181C26] tracking-tight">Send us a Message</h2>
                  <p className="text-slate-400 font-light text-xs mt-1">
                    Fill out the form below and one of our academic counselors will reach out within 24 hours.
                  </p>
                </div>
                
                <form className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-[#181C26]">Name</Label>
                      <Input placeholder="Your name" className="rounded-xl border-slate-200 h-11 text-sm focus-visible:ring-zinobi-green" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-[#181C26]">Email</Label>
                      <Input type="email" placeholder="your@email.com" className="rounded-xl border-slate-200 h-11 text-sm focus-visible:ring-zinobi-green" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-[#181C26]">Subject</Label>
                    <Input placeholder="How can we help?" className="rounded-xl border-slate-200 h-11 text-sm focus-visible:ring-zinobi-green" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-[#181C26]">Message</Label>
                    <Textarea rows={5} placeholder="Tell us about your PhD goals..." className="rounded-xl border-slate-200 text-sm focus-visible:ring-zinobi-green" />
                  </div>
                  <Button className="bg-zinobi-green hover:bg-zinobi-green/90 text-white rounded-xl font-bold h-11 text-sm px-6">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
