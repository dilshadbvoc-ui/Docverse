import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Star, Edit, Plus, GraduationCap, Users } from "lucide-react";
import { getInitials } from "@/lib/utils";

export default async function MentorsAdminPage() {
  const mentors = await prisma.mentor.findMany({
    include: { user: true },
    orderBy: { rating: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-950 font-heading">Mentors</h1>
          <p className="text-muted-foreground">Manage mentor profiles and assignments</p>
        </div>
        <Button className="bg-navy-950 hover:bg-navy-900 gap-2">
          <Plus className="h-4 w-4" /> Add Mentor
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mentor</TableHead>
                  <TableHead>Expertise</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mentors.map((mentor) => {
                  const expertise = JSON.parse((mentor.expertise as string) || "[]");
                  return (
                    <TableRow key={mentor.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-navy-100 text-navy-700 text-xs">{getInitials(mentor.user.name || "M")}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{mentor.user.name}</div>
                            <div className="text-xs text-muted-foreground">{mentor.user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {expertise.slice(0, 3).map((e: string) => (
                            <Badge key={e} variant="secondary" className="text-xs">{e}</Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{mentor.experience} years</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-brand-orange fill-brand-orange" />
                          <span className="font-medium">{mentor.rating}</span>
                          <span className="text-xs text-muted-foreground">({mentor.reviewCount})</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={mentor.isAvailable ? "success" : "secondary"} className="text-xs">{mentor.isAvailable ? "Available" : "Unavailable"}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="icon" variant="ghost" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {mentors.length === 0 && (
                  <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No mentors found</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
