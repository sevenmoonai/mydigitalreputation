"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    }
    // MVP: will be connected to a backend action later
    void data
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Message envoye</CardTitle>
          <CardDescription>
            Merci pour votre message. Notre equipe vous repondra sous 24h.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Envoyez-nous un message</CardTitle>
        <CardDescription>
          Decrivez votre situation, nous vous proposerons la meilleure solution.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Nom
            </label>
            <Input
              id="name"
              name="name"
              placeholder="Votre nom complet"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="vous@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Decrivez votre situation ou votre besoin..."
              rows={5}
              required
            />
          </div>
          <Button type="submit" className="w-full gap-2">
            <Send className="size-4" />
            Envoyer
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
