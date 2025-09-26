import type { PropsWithChildren } from "react"

type Props = PropsWithChildren<{
  id?: string
  eyebrow?: string
  title: string
  subtitle?: string
}>

export function Section({ id, eyebrow, title, subtitle, children }: Props) {
  return (
    <section id={id} className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="max-w-2xl">
          {eyebrow ? <p className="text-xs tracking-widest text-primary uppercase mb-2">{eyebrow}</p> : null}
          <h2 className="text-2xl md:text-3xl font-semibold text-balance">{title}</h2>
          {subtitle ? <p className="mt-2 text-muted-foreground text-pretty">{subtitle}</p> : null}
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  )
}
