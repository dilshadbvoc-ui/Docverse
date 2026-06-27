import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, User } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { formatDate } from "@/lib/utils"

export async function BlogPreview() {
  const posts = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: 3,
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      category: true,
      author: true,
      publishedAt: true,
    },
  })

  return (
    <section className="py-20 bg-[#FAF9F6] text-[#181C26]">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading mb-2">
              Latest from Our Blog
            </h2>
            <p className="text-slate-500 text-lg font-light">
              Expert insights on PhD admissions, research tips, and career guidance
            </p>
          </div>
          <Link 
            href="/blog" 
            className="hidden md:inline-flex items-center gap-2 text-zinobi-green hover:underline font-bold text-sm"
          >
            View All Articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <Card key={post.id} className="group bg-white border border-slate-200/60 rounded-3xl overflow-hidden hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative h-48 border-b border-slate-100 overflow-hidden">
                  <Image
                    src={`/blog-${(index % 3) + 1}.png`}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <Badge className="bg-zinobi-purple/10 text-zinobi-purple border-0 mb-3 text-xs font-semibold">
                      {post.category}
                    </Badge>
                    <h3 className="font-bold text-lg text-[#181C26] group-hover:text-zinobi-green transition-colors line-clamp-2 leading-snug">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 font-light">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-50">
                    <span className="flex items-center gap-1 font-medium">
                      <User className="h-3.5 w-3.5" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar className="h-3.5 w-3.5" />
                      {post.publishedAt ? formatDate(post.publishedAt) : "Draft"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-zinobi-green hover:underline font-bold text-sm"
          >
            View All Articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
