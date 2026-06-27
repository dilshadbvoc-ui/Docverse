import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Plus, Eye, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function ContentAdminPage() {
  const [posts, faqs] = await Promise.all([
    prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.fAQ.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] }),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-950 font-heading">Content & SEO</h1>
          <p className="text-muted-foreground">Manage blog posts, FAQs, and SEO content</p>
        </div>
      </div>

      <Tabs defaultValue="blog">
        <TabsList>
          <TabsTrigger value="blog">Blog Posts ({posts.length})</TabsTrigger>
          <TabsTrigger value="faq">FAQs ({faqs.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="blog" className="space-y-4">
          <div className="flex justify-end">
            <Button className="bg-navy-950 hover:bg-navy-900 gap-2">
              <Plus className="h-4 w-4" /> New Post
            </Button>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Published</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {posts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium max-w-xs truncate">{post.title}</TableCell>
                        <TableCell><Badge variant="secondary" className="text-xs">{post.category}</Badge></TableCell>
                        <TableCell>{post.author}</TableCell>
                        <TableCell>
                          <Badge variant={post.status === "PUBLISHED" ? "success" : post.status === "DRAFT" ? "secondary" : "default"} className="text-xs">{post.status}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{post.publishedAt ? formatDate(post.publishedAt) : "-"}</TableCell>
                        <TableCell>{post.viewCount}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="icon" variant="ghost" className="h-8 w-8" asChild>
                              <Link href={`/blog/${post.slug}`} target="_blank"><Eye className="h-4 w-4" /></Link>
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="space-y-4">
          <div className="flex justify-end">
            <Button className="bg-navy-950 hover:bg-navy-900 gap-2">
              <Plus className="h-4 w-4" /> New FAQ
            </Button>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Question</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Order</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {faqs.map((faq) => (
                      <TableRow key={faq.id}>
                        <TableCell className="font-medium max-w-md truncate">{faq.question}</TableCell>
                        <TableCell><Badge variant="secondary" className="text-xs">{faq.category}</Badge></TableCell>
                        <TableCell>{faq.order}</TableCell>
                        <TableCell>
                          <Badge variant={faq.isActive ? "success" : "secondary"} className="text-xs">{faq.isActive ? "Active" : "Inactive"}</Badge>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
