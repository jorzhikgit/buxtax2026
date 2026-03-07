import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Testimonial } from "@/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="h-full bg-[#163642] text-white">
      <CardHeader>
        <CardTitle className="font-display text-2xl">{testimonial.name}</CardTitle>
        <p className="text-sm uppercase tracking-[0.18em] text-white/70">{testimonial.role}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-7 text-white/84">{testimonial.quote}</p>
      </CardContent>
    </Card>
  );
}
