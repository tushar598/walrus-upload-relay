import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroWalrus() {
  return (
    <header className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/walrus-logo-mark.jpg"
              width={28}
              height={28}
              alt="Walrus logo placeholder"
              className="opacity-90"
            />
            <span className="text-sm text-muted-foreground">Walrus Upload Relay</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm text-muted-foreground">
            <a href="#why-relay" className="hover:text-foreground">
              Why Relay
            </a>
            <a href="#architecture" className="hover:text-foreground">
              Architecture
            </a>
            <a href="#api" className="hover:text-foreground">
              API
            </a>
            <a href="#sdk" className="hover:text-foreground">
              SDK
            </a>
            <a href="#demo" className="hover:text-foreground">
              Demo
            </a>
          </nav>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs tracking-widest text-primary uppercase mb-3">Web3 Storage • Walrus</p>
            <h1 className="text-balance text-4xl md:text-5xl font-semibold">
              Managed Upload Relay for decentralized storage on Sui
            </h1>
            <p className="mt-4 text-pretty text-muted-foreground">
              A developer-first service and dashboard that turns a single HTTP upload into a reliable Walrus write with
              concurrency control, retries, and tip handling.
            </p>
            <div className="mt-6 flex gap-3">
              <Button size="lg" className="bg-primary text-primary-foreground">
                Get Started
              </Button>
              <Button size="lg" variant="secondary">
                Explore Docs
              </Button>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <Image
              src="/dashboard-cards-preview.jpg"
              alt="Preview of dashboard cards"
              width={800}
              height={500}
              className="w-full h-auto rounded-md"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
