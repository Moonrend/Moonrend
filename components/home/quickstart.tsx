"use client";

import { ArrowUpRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyButton } from "@/components/primitives/copy-button";
import { Section, SectionHeader } from "@/components/primitives/section";
import { siteConfig } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/** Real commands from the repository — not an invented CLI. */
const SNIPPETS = {
  docker: [
    "git clone https://github.com/Moonrend/Zakura.git",
    "cd Zakura",
    "cp .env.example .env",
    "# optional: COMPOSE_PROFILES=postgres for Postgres + pgvector",
    "docker compose up -d",
  ],
  pnpm: [
    "git clone https://github.com/Moonrend/Zakura.git",
    "cd Zakura",
    "# install · db:generate · db:migrate",
    "pnpm setup",
    "# server :3000   web :3001",
    "pnpm dev",
  ],
} as const;

export function Quickstart({ dict }: { dict: Dictionary }) {
  const { quickstart } = dict;

  return (
    <Section className="py-20 md:py-24">
      <SectionHeader
        eyebrow={quickstart.eyebrow}
        title={quickstart.title}
        subtitle={quickstart.subtitle}
      />

      <div className="mt-10">
        <Tabs defaultValue="docker">
          <TabsList className="h-auto gap-1 rounded-md bg-muted p-1">
            <TabsTrigger value="docker" className="rounded-sm font-mono text-[12px]">
              {quickstart.tabs.docker}
            </TabsTrigger>
            <TabsTrigger value="pnpm" className="rounded-sm font-mono text-[12px]">
              {quickstart.tabs.pnpm}
            </TabsTrigger>
          </TabsList>

          {(["docker", "pnpm"] as const).map((key) => (
            <TabsContent key={key} value={key} className="mt-4">
              <Terminal
                lines={SNIPPETS[key]}
                labels={{ copy: quickstart.copy, copied: quickstart.copied }}
              />
            </TabsContent>
          ))}
        </Tabs>

        <a
          href={siteConfig.docs.deployment}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-1 text-sm text-foreground underline-offset-4 hover:underline"
        >
          {quickstart.docsCta}
          <ArrowUpRight className="size-3.5" />
        </a>
      </div>
    </Section>
  );
}

type TerminalProps = {
  lines: readonly string[];
  labels: { copy: string; copied: string };
};

function Terminal({ lines, labels }: TerminalProps) {
  // Comments are documentation, not something you want on your clipboard.
  const copyValue = lines.filter((line) => !line.startsWith("#")).join("\n");

  return (
    <div className="surface relative">
      <div className="absolute right-2 top-2 z-10">
        <CopyButton value={copyValue} labels={labels} />
      </div>

      <pre className="overflow-x-auto px-4 py-4 pr-14 font-mono text-[13px] leading-[1.6]">
        <code className="grid">
          {lines.map((line) =>
            line.startsWith("#") ? (
              <span key={line} className="text-smoke">
                {line}
              </span>
            ) : (
              <span key={line} className="text-foreground">
                <span className="select-none text-smoke">$ </span>
                {line}
              </span>
            ),
          )}
        </code>
      </pre>
    </div>
  );
}
