import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, ExternalLink, Edit, Plus } from "lucide-react";

export default async function UniversitiesAdminPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams.search;
  const where: any = {};
  if (search) where.name = { contains: search, mode: "insensitive" };

  const universities = await prisma.university.findMany({ where, orderBy: { name: "asc" } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-950 font-heading">Universities</h1>
          <p className="text-muted-foreground">Manage partner universities and programs</p>
        </div>
        <Button className="bg-navy-950 hover:bg-navy-900 gap-2">
          <Plus className="h-4 w-4" /> Add University
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <form className="flex gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input name="search" placeholder="Search universities..." className="pl-9" defaultValue={search} />
            </div>
            <Button type="submit" variant="outline">Search</Button>
          </form>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Accreditation</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {universities.map((uni) => (
                  <TableRow key={uni.id}>
                    <TableCell className="font-medium">{uni.name}</TableCell>
                    <TableCell>{uni.location}, {uni.state}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {uni.ugcApproved && <Badge variant="success" className="text-xs">UGC</Badge>}
                        {uni.naacGrade && <Badge variant="info" className="text-xs">NAAC {uni.naacGrade}</Badge>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={uni.isActive ? "success" : "secondary"} className="text-xs">{uni.isActive ? "Active" : "Inactive"}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
                        {uni.website && (
                          <Button size="icon" variant="ghost" className="h-8 w-8" asChild>
                            <a href={uni.website} target="_blank" rel="noopener noreferrer"><ExternalLink className="h-4 w-4" /></a>
                          </Button>
                        )}
                      </div>
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
