import { prisma } from "@/lib/prisma";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "FAQ | DocVerse",
  description: "Frequently asked questions about PhD admissions, services, and our platform.",
};

export default async function FAQPage() {
  const faqs = await prisma.fAQ.findMany({
    where: { isActive: true },
    orderBy: [{ category: "asc" }, { order: "asc" }],
  });

  const categories = [...new Set(faqs.map((f) => f.category))];

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-24">
      {/* Header */}
      <div className="bg-[#F2F4F7] text-[#181C26] py-16 border-b border-slate-200/50">
        <div className="container max-w-7xl mx-auto px-6 space-y-3 text-center">
          <h1 className="text-3xl md:text-5xl font-black font-sans tracking-tight">Frequently Asked Questions</h1>
          <p className="text-slate-500 max-w-xl mx-auto font-light text-lg">
            Everything you need to know about PhD admissions, eligibility, and our guidance packages.
          </p>
        </div>
      </div>

      <div className="container max-w-3xl mx-auto px-6 py-16 space-y-12">
        {categories.map((category) => (
          <div key={category} className="space-y-6">
            <div className="flex items-center gap-3">
              <Badge className="bg-zinobi-purple/10 text-zinobi-purple border-0 font-bold text-xs uppercase tracking-wider py-1 px-3">
                {category}
              </Badge>
              <div className="h-px bg-slate-200/60 flex-1" />
            </div>
            
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.filter((f) => f.category === category).map((faq) => (
                <AccordionItem 
                  key={faq.id} 
                  value={faq.id} 
                  className="border border-slate-200/60 rounded-2xl px-6 bg-white shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <AccordionTrigger className="text-left font-bold text-[#181C26] hover:no-underline text-base py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-500 font-light leading-relaxed pb-5 text-sm">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
}
