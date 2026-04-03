import fs from "fs"
import path from "path"
import matter from "gray-matter"

const CONTENT_DIR = path.join(process.cwd(), "content/blog")

export type BlogPost = {
  slug: string
  title: string
  date: string
  excerpt: string
  author: string
  content: string
}

export function getBlogPosts(): Omit<BlogPost, "content">[] {
  if (!fs.existsSync(CONTENT_DIR)) return []

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"))

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "")
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8")
    const { data } = matter(raw)

    return {
      slug,
      title: (data.title as string) || slug,
      date: (data.date as string) || "",
      excerpt: (data.excerpt as string) || "",
      author: (data.author as string) || "Equipe MyDigitalReputation",
    }
  })

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)

  return {
    slug,
    title: (data.title as string) || slug,
    date: (data.date as string) || "",
    excerpt: (data.excerpt as string) || "",
    author: (data.author as string) || "Equipe MyDigitalReputation",
    content,
  }
}
