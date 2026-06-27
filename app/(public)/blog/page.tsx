import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Blog & Resources | DocVerse",
  description: "Expert insights on PhD admissions, research tips, and career guidance.",
};

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-24">
      {/* Header */}
      <div className="bg-[#F2F4F7] text-[#181C26] py-16 border-b border-slate-200/50">
        <div className="container max-w-7xl mx-auto px-6 space-y-3">
          <h1 className="text-3xl md:text-5xl font-black font-sans tracking-tight">Blog & Resources</h1>
          <p className="text-slate-500 max-w-xl font-light text-lg">
            Expert articles on PhD admissions, research methodology, and career growth.
          </p>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Card key={post.id} className="group bg-white border border-slate-200/60 rounded-[32px] overflow-hidden hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-1.5 transition-all duration-300">
              <CardContent className="p-0 flex flex-col h-full justify-between">
                <div>
                  <div className="relative h-52 border-b border-slate-100 overflow-hidden">
                    <Image
                      src={post.coverImage || `/blog-${(index % 3) + 1}.png`}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  
                  <div className="p-8 space-y-4">
                    <Badge className="bg-zinobi-purple/10 text-zinobi-purple border-0 text-xs font-semibold">
                      {post.category}
                    </Badge>
                    <h3 className="font-bold text-xl text-[#181C26] group-hover:text-zinobi-green transition-colors leading-snug">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-light line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-8 pb-8 pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" />{post.author}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{post.publishedAt ? formatDate(post.publishedAt) : "Draft"}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
