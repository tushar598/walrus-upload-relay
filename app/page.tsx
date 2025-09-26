import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HeroWalrus } from "@/components/hero-walrus"
import { Section } from "@/components/section"
import { CodeBlock } from "@/components/code-block"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroWalrus />

      <Section
        id="why-relay"
        eyebrow="Why a Relay?"
        title="Solve the 2,200-request problem"
        subtitle="Walrus writes can fan out across many storage nodes. A managed upload relay turns one client request into a reliable, concurrent write with retries, backoff, and tip handling."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-balance">Single HTTP upload</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Client sends one request to the relay. The relay enqueues a job and returns an{" "}
              <strong className="text-foreground">uploadId</strong>.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-balance">Reliable fan‑out</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Worker performs Walrus write flow with concurrency control, retries, and node-level error reporting.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-balance">Tip/payment handled</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Tip Manager reads Walrus tip-config and manages payment logic or provides values for client-signed tips.
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section
        id="architecture"
        eyebrow="Architecture"
        title="Relay components"
        subtitle="A pragmatic, production-ready blueprint aligned with the Mysten Labs SDK."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Relay API (server)</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Receives uploads, queues jobs, writes to Walrus via SDK or HTTP, returns blobId when complete.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Worker</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Background job runner that handles heavy network fan‑out, retries, and reporting.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Tip Manager</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Pulls tip-config endpoint and manages where/what to send for tips (or returns the required tip for
              clients).
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Uploads, status, throughput, cost estimates, per-app metrics, and developer API key management.
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Client SDK (tiny wrapper)</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Sets the uploadRelay host and handles token/auth so frontend code can call{" "}
              <span className="text-foreground font-mono">writeBlob</span> without worrying about fan‑out details.
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section
        id="api"
        eyebrow="HTTP API"
        title="Minimal endpoints"
        subtitle="Everything you need for an MVP and hackathon demo."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>POST /v1/upload</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Single-file upload. Returns {"{ uploadId }"} immediately.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>GET /v1/upload/:id</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Poll for status and retrieve <span className="font-mono">blobId</span> when done.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>GET /v1/tip-config</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Relay tip info fetched from the Walrus tip endpoint.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>POST /v1/auth/key</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Issue developer API keys for usage tracking and quotas.
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section
        id="sdk"
        eyebrow="SDK Example"
        title="Configure WalrusClient to use your relay"
        subtitle="Use the Mysten Labs TypeScript SDK with the uploadRelay option to route writes via the relay."
      >
        <CodeBlock
          language="ts"
          code={`import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { WalrusClient } from '@mysten/walrus';

const client = new SuiClient({
  url: getFullnodeUrl('testnet'),
  network: 'testnet',
}).$extend(
  WalrusClient.experimental_asClientExtension({
    uploadRelay: {
      host: 'https://your-upload-relay.example.com',
      sendTip: { max: 1000 },
    },
  }),
);

// Write a blob
const file = new TextEncoder().encode('hello from demo');
const { blobId } = await client.writeBlob({
  blob: file,
  deletable: false,
  epochs: 3,
  signer: /* Sui signer object */,
});
console.log('blobId', blobId);`}
        />
      </Section>

      <Section
        id="demo"
        eyebrow="Demo Plan"
        title="What to show at the hackathon"
        subtitle="A crisp journey: upload → uploadId → blobId → retrieve & view."
      >
        <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
          <li>Upload a 10–50MB file from the browser or mobile to the relay.</li>
          <li>Show the returned uploadId, then the blobId on completion.</li>
          <li>Read back with walrusClient.getFiles and display image/video.</li>
          <li>Dashboard: recent uploads, success rate, and avg latency.</li>
          <li>Include a tiny TS/CLI example for configuring WalrusClient.</li>
        </ul>
      </Section>

      <Section
        id="pitfalls"
        eyebrow="Pitfalls & mitigations"
        title="Operational considerations"
        subtitle="Design for retries, tip limits, and testnet churn."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Network / epochs</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Implement retries and reset flows per SDK guidance; handle epoch transitions gracefully.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Cost / tips</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Surface tip-config and enforce sensible per-app caps.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Testnet stability</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Expect occasional flakiness; add telemetry, backoff, and clear status updates.
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section
        id="cta"
        eyebrow="Get started"
        title="Build with Walrus Upload Relay"
        subtitle="Ship faster with a developer-first relay, SDK wrapper, and dashboard."
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <Button size="lg" className="bg-primary text-primary-foreground">
            Try the Demo
          </Button>
          <Button size="lg" variant="secondary">
            View API Spec
          </Button>
        </div>
        <div className="sr-only">Images are decorative. A placeholder logo is used for demonstration.</div>
      </Section>
    </main>
  )
}
