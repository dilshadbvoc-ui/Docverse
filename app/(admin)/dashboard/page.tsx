import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, GraduationCap, Building2, Briefcase, TrendingUp, Clock, IndianRupee, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default async function DashboardPage() {
  const [totalLeads, newLeads, totalUniversities, activePrograms, totalServices, recentLeads, leadsThisWeek, leadsLastWeek] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "NEW" } }),
    prisma.university.count({ where: { isActive: true } }),
    prisma.program.count({ where: { isActive: true } }),
    prisma.service.count({ where: { isActive: true } }),
    prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 5, include: { assignedTo: true } }),
    prisma.lead.count({ where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } } }),
    prisma.lead.count({ where: { createdAt: { gte: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } } }),
  ]);

  const leadGrowth = leadsLastWeek > 0 ? Math.round(((leadsThisWeek - leadsLastWeek) / leadsLastWeek) * 100) : 100;

  const stats = [
    { title: "Total Leads", value: totalLeads, icon: Users, color: "text-blue-600", bg: "bg-blue-50", change: `+${leadGrowth}%`, trend: "up" },
    { title: "New Leads", value: newLeads, icon: Clock, color: "text-orange-600", bg: "bg-orange-50", change: "This week", trend: "neutral" },
    { title: "Universities", value: totalUniversities, icon: Building2, color: "text-green-600", bg: "bg-green-50", change: "Active", trend: "up" },
    { title: "Active Programs", value: activePrograms, icon: GraduationCap, color: "text-purple-600", bg: "bg-purple-50", change: "Live", trend: "up" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-950 font-heading">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your PhD guidance platform</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${stat.trend === "up" ? "text-green-600" : stat.trend === "down" ? "text-red-600" : "text-muted-foreground"}`}>
                  {stat.trend === "up" && <ArrowUpRight className="h-3 w-3" />}
                  {stat.trend === "down" && <ArrowDownRight className="h-3 w-3" />}
                  {stat.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-navy-950">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Recent Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-navy-100 flex items-center justify-center text-navy-700 text-xs font-semibold">
                      {lead.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{lead.name}</div>
                      <div className="text-xs text-muted-foreground">{lead.email} · {lead.discipline || "No discipline"}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={lead.status === "NEW" ? "default" : "secondary"} className="text-xs">{lead.status}</Badge>
                    {lead.assignedTo && <span className="text-xs text-muted-foreground">{lead.assignedTo.name}</span>}
                  </div>
                </div>
              ))}
              {recentLeads.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">No leads yet</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <a href="/dashboard/leads" className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-sm font-medium">Manage Leads</div>
                <div className="text-xs text-muted-foreground">View and assign leads</div>
              </div>
            </a>
            <a href="/dashboard/universities" className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <Building2 className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-sm font-medium">Universities</div>
                <div className="text-xs text-muted-foreground">Manage partner universities</div>
              </div>
            </a>
            <a href="/dashboard/services" className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <Briefcase className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-sm font-medium">Services</div>
                <div className="text-xs text-muted-foreground">Update pricing and packages</div>
              </div>
            </a>
            <a href="/dashboard/content" className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-sm font-medium">Content & SEO</div>
                <div className="text-xs text-muted-foreground">Manage blog and FAQs</div>
              </div>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
