import { formatCurrency } from "@/lib/utils";

export function ResultRow({
  label,
  value,
  emphasize = false
}: {
  label: string;
  value: number | string;
  emphasize?: boolean;
}) {
  const displayValue =
    typeof value === "number" ? formatCurrency(value) : value;

  return (
    <div className="flex items-center justify-between gap-4 border-b border-border/60 py-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={emphasize ? "font-semibold text-foreground" : "font-medium"}>
        {displayValue}
      </span>
    </div>
  );
}
