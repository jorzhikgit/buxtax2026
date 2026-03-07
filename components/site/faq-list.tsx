import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FAQItem } from "@/types";

export function FAQList({ items }: { items: FAQItem[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <Card key={item.question} className="h-full">
          <CardHeader>
            <CardTitle className="text-lg">{item.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-7 text-muted-foreground">{item.answer}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
