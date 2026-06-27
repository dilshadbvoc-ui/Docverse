import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany({ where: { status: "PUBLISHED" }, select: { slug: true } });
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } });
  if (!post) return { title: "Not Found" };
  return { title: `${post.title} | DocVerse Blog`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } });
  if (!post || post.status !== "PUBLISHED") notFound();

  const tags = JSON.parse((post.tags as string) || "[]");

  // Determine standard index for cover image fallback
  const fallbackIndex = post.title.length % 3 + 1;
  const coverSrc = post.coverImage || `/blog-${fallbackIndex}.png`;

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-24">
      {/* Header */}
      <div className="bg-[#F2F4F7] text-[#181C26] py-12 border-b border-slate-200/50">
        <div className="container max-w-3xl mx-auto px-6 space-y-4">
          <Link href="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#181C26] font-bold text-sm transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          <div>
            <Badge className="bg-zinobi-purple/10 text-zinobi-purple border-0 font-semibold mb-3 text-xs">
              {post.category}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-black font-sans tracking-tight text-[#181C26] leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="container max-w-3xl mx-auto px-6 py-12 space-y-8">
        {/* Metadata info */}
        <div className="flex items-center gap-6 text-xs text-slate-400 font-medium pb-6 border-b border-slate-200/60">
          <span className="flex items-center gap-1.5"><User className="h-4 w-4 text-slate-400" />{post.author}</span>
          <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-slate-400" />{post.publishedAt ? formatDate(post.publishedAt) : "Draft"}</span>
        </div>

        {/* Cover image container */}
        <div className="relative w-full aspect-[21/9] rounded-[32px] overflow-hidden shadow-xl border border-slate-200/40">
          <Image 
            src={coverSrc} 
            alt={post.title} 
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Body */}
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed font-light space-y-4 pt-4">
          {post.content.split("\n").map((line, i) => {
            if (line.startsWith("# ")) {
              return <h1 key={i} className="text-3xl font-black text-[#181C26] mt-8 mb-4 tracking-tight">{line.replace("# ", "")}</h1>;
            }
            if (line.startsWith("## ")) {
              return <h2 key={i} className="text-2xl font-extrabold text-[#181C26] mt-6 mb-3 tracking-tight">{line.replace("## ", "")}</h2>;
            }
            if (line.startsWith("### ")) {
              return <h3 key={i} className="text-xl font-bold text-[#181C26] mt-4 mb-2 tracking-tight">{line.replace("### ", "")}</h3>;
            }
            if (line.startsWith("- ")) {
              return <li key={i} className="ml-6 list-disc text-sm text-slate-600 mb-1">{line.replace("- ", "")}</li>;
            }
            if (line.startsWith("1. ")) {
              return <li key={i} className="ml-6 list-decimal text-sm text-slate-600 mb-1">{line.replace(/\d+\. /, "")}</li>;
            }
            if (line.startsWith("**") && line.endsWith("**")) {
              return <strong key={i} className="font-extrabold text-[#181C26] block my-2">{line.replace(/\*\*/g, "")}</strong>;
            }
            if (line.trim() === "---") {
              return <hr key={i} className="my-8 border-slate-200" />;
            }
            if (line.trim() === "") {
              return <div key={i} className="h-3" />;
            }
            return <p key={i} className="mb-4 text-sm leading-relaxed">{line}</p>;
          })}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-200/60">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag: string) => (
                <Badge key={tag} className="bg-slate-100 text-slate-600 border border-slate-200/40 text-[10px] font-bold px-3 py-1 rounded-full">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
