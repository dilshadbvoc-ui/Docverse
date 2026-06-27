import { LeadForm } from "@/components/forms/lead-form";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Apply Now | DocVerse",
  description: "Apply for PhD guidance. Our counsellors will contact you within 30 minutes.",
};

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-navy-50/30 py-12 pb-24">
      <div className="container max-w-2xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#181C26] font-heading mb-2">Apply for PhD Guidance</h1>
          <p className="text-muted-foreground">Fill in your details and our counsellor will contact you within 30 minutes</p>
        </div>
        <LeadForm />
      </div>
    </div>
  );
}
