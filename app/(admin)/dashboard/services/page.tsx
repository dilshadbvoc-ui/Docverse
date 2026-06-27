import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Plus, Star, IndianRupee } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default async function ServicesAdminPage() {
  const services = await prisma.service.findMany({ orderBy: { displayOrder: "asc" } });

  const categoryLabels: Record<string, string> = {
    ADMISSION: "Admission",
    THESIS: "Thesis",
    SYNOPSIS: "Synopsis",
    COACHING: "Coaching",
    JOURNAL: "Journal",
    MENTORING: "Mentoring",
    COMPLETE_PACKAGE: "Complete Package",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-950 font-heading">Services & Pricing</h1>
          <p className="text-muted-foreground">Manage service packages and pricing tiers</p>
        </div>
        <Button className="bg-navy-950 hover:bg-navy-900 gap-2">
          <Plus className="h-4 w-4" /> Add Service
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price Range</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>
                      <div className="font-medium">{service.name}</div>
                      <div className="text-xs text-muted-foreground">{service.shortDesc}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">{categoryLabels[service.category] || service.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <IndianRupee className="h-3 w-3" />
                        {service.priceMin === service.priceMax 
                          ? formatCurrency(service.priceMin || 0)
                          : `${formatCurrency(service.priceMin || 0)} - ${formatCurrency(service.priceMax || 0)}`
                        }
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Badge variant={service.isActive ? "success" : "secondary"} className="text-xs">{service.isActive ? "Active" : "Inactive"}</Badge>
                        {service.isPopular && <Badge className="bg-brand-blue/10 text-brand-blue text-xs"><Star className="h-3 w-3 mr-1" />Popular</Badge>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button size="icon" variant="ghost" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
