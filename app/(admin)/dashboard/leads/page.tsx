import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Eye, Phone, Mail } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function LeadsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams.search;
  const status = resolvedSearchParams.status;

  const where: any = {};
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { phone: { contains: search } },
    ];
  }
  if (status && status !== "all") where.status = status;

  const leads = await prisma.lead.findMany({
    where,
    include: { assignedTo: true },
    orderBy: { createdAt: "desc" },
  });

  const statuses = ["NEW", "CONTACTED", "QUALIFIED", "FOLLOW_UP", "CONVERTED", "LOST"];

  const statusColors: Record<string, string> = {
    NEW: "bg-blue-100 text-blue-700",
    CONTACTED: "bg-yellow-100 text-yellow-700",
    QUALIFIED: "bg-green-100 text-green-700",
    FOLLOW_UP: "bg-orange-100 text-orange-700",
    CONVERTED: "bg-brand-green/10 text-brand-green",
    LOST: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-950 font-heading">Leads & CRM</h1>
          <p className="text-muted-foreground">Manage and track all PhD admission inquiries</p>
        </div>
        <Button className="bg-navy-950 hover:bg-navy-900" asChild>
          <Link href="/apply" target="_blank">+ Add Lead</Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <form className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input name="search" placeholder="Search leads..." className="pl-9" defaultValue={search} />
            </div>
            <select name="status" className="rounded-md border border-input px-3 text-sm h-9" defaultValue={status || "all"}>
              <option value="all">All Status</option>
              {statuses.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
            </select>
            <Button type="submit" variant="outline">Filter</Button>
            <Button type="reset" variant="ghost" asChild>
              <Link href="/dashboard/leads">Clear</Link>
            </Button>
          </form>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Discipline</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Assigned</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>
                      <div className="text-sm">{lead.email}</div>
                      <div className="text-xs text-muted-foreground">{lead.phone}</div>
                    </TableCell>
                    <TableCell>{lead.discipline || "-"}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[lead.status] || "bg-gray-100"}>{lead.status.replace("_", " ")}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={lead.priority === "URGENT" ? "destructive" : lead.priority === "HIGH" ? "default" : "secondary"} className="text-xs">
                        {lead.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{lead.assignedTo?.name || "-"}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{formatDate(lead.createdAt)}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8" asChild>
                          <a href={`mailto:${lead.email}`}><Mail className="h-4 w-4" /></a>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {leads.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No leads found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
