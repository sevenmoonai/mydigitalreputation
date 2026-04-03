import { Hero } from "@/components/landing/hero"
import { HowItWorks } from "@/components/landing/how-it-works"
import { SocialProof } from "@/components/landing/social-proof"
import { FAQ } from "@/components/landing/faq"

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <HowItWorks />
      <FAQ />
    </>
  )
}
