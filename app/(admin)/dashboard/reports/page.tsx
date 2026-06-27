import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Target, Calendar } from "lucide-react";

export default async function ReportsPage() {
  const [totalLeads, leadsBySource, leadsByStatus, leadsByMonth] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.groupBy({ by: ["source"], _count: { source: true } }),
    prisma.lead.groupBy({ by: ["status"], _count: { status: true } }),
    prisma.lead.groupBy({ by: ["discipline"], _count: { discipline: true }, orderBy: { _count: { discipline: "desc" } }, take: 5 }),
  ]);

  const sourceLabels: Record<string, string> = {
    ORGANIC: "Organic",
    META_ADS: "Meta Ads",
    GOOGLE_ADS: "Google Ads",
    REFERRAL: "Referral",
    WHATSAPP: "WhatsApp",
    DIRECT: "Direct",
    EMAIL: "Email",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-950 font-heading">Reports & Analytics</h1>
        <p className="text-muted-foreground">Performance metrics and insights</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <Users className="h-5 w-5 text-blue-600 mb-2" />
            <div className="text-2xl font-bold text-navy-950">{totalLeads}</div>
            <div className="text-sm text-muted-foreground">Total Leads</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <Target className="h-5 w-5 text-green-600 mb-2" />
            <div className="text-2xl font-bold text-navy-950">{leadsByStatus.find(s => s.status === "CONVERTED")?._count.status || 0}</div>
            <div className="text-sm text-muted-foreground">Converted</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <TrendingUp className="h-5 w-5 text-purple-600 mb-2" />
            <div className="text-2xl font-bold text-navy-950">
              {totalLeads > 0 ? Math.round(((leadsByStatus.find(s => s.status === "CONVERTED")?._count.status || 0) / totalLeads) * 100) : 0}%
            </div>
            <div className="text-sm text-muted-foreground">Conversion Rate</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <Calendar className="h-5 w-5 text-orange-600 mb-2" />
            <div className="text-2xl font-bold text-navy-950">{leadsByStatus.find(s => s.status === "NEW")?._count.status || 0}</div>
            <div className="text-sm text-muted-foreground">Pending Follow-up</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-lg">Leads by Source</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leadsBySource.map((item) => (
                <div key={item.source} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">{sourceLabels[item.source] || item.source}</span>
                  <Badge>{item._count.source}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Leads by Status</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leadsByStatus.map((item) => (
                <div key={item.status} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">{item.status.replace("_", " ")}</span>
                  <Badge>{item._count.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-lg">Top Disciplines</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leadsByMonth.map((item) => (
                <div key={item.discipline || "Unknown"} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">{item.discipline || "Not specified"}</span>
                  <Badge variant="secondary">{item._count.discipline} leads</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
