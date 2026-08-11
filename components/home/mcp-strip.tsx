import { Reveal } from "@/components/primitives/reveal";
import { builtinMcps } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/** Social proof, developer edition: the servers that ship in the repo. */
export function McpStrip({ dict }: { dict: Dictionary }) {
  return (
    <section className="container-site py-14">
      <Reveal className="flex flex-col gap-5 border-y border-border py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="eyebrow text-faint">{dict.mcpStrip.label}</p>

        <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {builtinMcps.map((mcp) => (
            <li key={mcp} className="font-mono text-[13px] text-stone">
              {mcp}
            </li>
          ))}
        </ul>

        <p className="text-[13px] leading-[1.54] text-faint sm:max-w-[28ch]">
          {dict.mcpStrip.note}
        </p>
      </Reveal>
    </section>
  );
}
