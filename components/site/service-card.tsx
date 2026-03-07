import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ServiceItem } from "@/types";

export function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-display text-2xl">{service.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-sm leading-7 text-muted-foreground">{service.description}</p>
        <Link href={service.href}>
          <Button variant="secondary">Request consultation</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
