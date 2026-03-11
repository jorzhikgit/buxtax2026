import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ServiceItem } from "@/types";
import { localizePath, type Locale } from "@/lib/i18n";

export function ServiceCard({ 
  service,
  locale
}: { 
  service: ServiceItem;
  locale?: Locale;
}) {
  const href = locale ? localizePath(service.href, locale) : service.href;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-display text-2xl">{service.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-sm leading-7 text-muted-foreground">{service.description}</p>
        <Link href={href}>
          <Button variant="secondary">Request consultation</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
