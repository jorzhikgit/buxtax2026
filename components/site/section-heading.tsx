import { Badge } from "@/components/ui/badge";

export function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl space-y-4">
      <Badge>{eyebrow}</Badge>
      <div className="space-y-3">
        <h2 className="font-display text-3xl text-foreground sm:text-4xl">{title}</h2>
        {description ? (
          <p className="text-base leading-7 text-muted-foreground sm:text-lg">{description}</p>
        ) : null}
      </div>
    </div>
  );
}
