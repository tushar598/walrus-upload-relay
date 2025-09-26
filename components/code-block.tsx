"use client"

import { useState } from "react"

export function CodeBlock({ code, language = "ts" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="relative rounded-md border bg-card p-4">
      <button
        aria-label="Copy code"
        onClick={() => {
          navigator.clipboard.writeText(code)
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        }}
        className="absolute right-3 top-3 text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground hover:opacity-90"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <pre className="overflow-x-auto text-xs md:text-sm leading-6">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  )
}
