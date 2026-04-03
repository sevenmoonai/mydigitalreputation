import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getBlogPosts } from "@/lib/mdx"

export const metadata: Metadata = {
  title: "Blog — MyDigitalReputation",
  description:
    "Conseils, guides et actualites pour proteger et ameliorer votre reputation en ligne.",
}

export default function BlogPage() {
  const posts = getBlogPosts()

  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Blog
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Guides et conseils pour gerer votre e-reputation.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <p className="text-xs text-muted-foreground">
                    {new Date(post.date).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <CardTitle className="text-lg leading-snug">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Lire l&apos;article
                    <ArrowRight className="size-3" />
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="mt-12 text-center text-muted-foreground">
            Aucun article pour le moment. Revenez bientot !
          </p>
        )}
      </div>
    </section>
  )
}
