import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getBlogPost, getBlogPosts } from "@/lib/mdx"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export async function generateStaticParams() {
  const posts = getBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} — MyDigitalReputation`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Button
          variant="ghost"
          size="sm"
          className="mb-8 gap-1"
          render={<Link href="/blog" />}
        >
          <ArrowLeft className="size-4" />
          Retour au blog
        </Button>

        <article>
          <header className="mb-8">
            <p className="text-sm text-muted-foreground">
              {new Date(post.date).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              &middot; {post.author}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              {post.title}
            </h1>
          </header>

          <div className="mdx-content">
            <MDXRemote source={post.content} />
          </div>
        </article>

        <Card className="mt-12 border-primary/20 bg-primary/5">
          <CardHeader className="text-center">
            <CardTitle>
              Verifiez votre reputation en ligne gratuitement
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button size="lg" render={<Link href="/scan" />}>
              Lancer un scan gratuit
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
