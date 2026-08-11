import { Reveal } from "@/components/primitives/reveal";
import { Section, SectionHeader } from "@/components/primitives/section";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type CellProps = {
  meta: string;
  title: string;
  body: string;
  delay?: number;
};

function Cell({ meta, title, body, delay = 0 }: CellProps) {
  return (
    <Reveal delay={delay}>
      <article className="surface flex h-full flex-col p-4">
        <p className="eyebrow text-faint">{meta}</p>
        <h3 className="mt-4 text-base font-medium tracking-[-0.01em] text-foreground">{title}</h3>
        <p className="mt-2 text-[13px] leading-[1.54] text-muted-foreground">{body}</p>
      </article>
    </Reveal>
  );
}

export function Features({ dict }: { dict: Dictionary }) {
  const { features } = dict;
  const item = features.items;

  const cells = [item.gateway, item.runner, item.collab, item.memory, item.network, item.editions];

  return (
    <Section id="capabilities" className="py-20 md:py-24">
      <SectionHeader
        eyebrow={features.eyebrow}
        title={features.title}
        subtitle={features.subtitle}
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cells.map((cell, index) => (
          <Cell key={cell.title} {...cell} delay={(index % 3) * 0.05} />
        ))}
      </div>
    </Section>
  );
}
