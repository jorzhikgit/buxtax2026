"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { createLeadAction } from "@/actions/leads";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { LeadSource } from "@/types";

const leadFormSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  phone: z.string().min(6, "Enter your phone number"),
  email: z.string().email("Enter a valid email"),
  business_type: z.string().min(2, "Select your business type"),
  message: z.string().max(500).optional()
});

type LeadFormValues = z.infer<typeof leadFormSchema>;

export function LeadCaptureForm({
  source,
  title = "Get full tax consultation",
  description = "Leave your details and an accountant will contact you with a tailored recommendation.",
  submitLabel = "Request accountant consultation"
}: {
  source: LeadSource;
  title?: string;
  description?: string;
  submitLabel?: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      business_type: "IP"
    }
  });

  const onSubmit = (values: LeadFormValues) => {
    setStatus(null);
    startTransition(async () => {
      const result = await createLeadAction({ ...values, source });
      setStatus({ ok: result.success, message: result.message });
      if (result.success) {
        reset();
      }
    });
  };

  return (
    <Card className="border-primary/10 bg-white">
      <CardHeader>
        <CardTitle className="font-display text-2xl">{title}</CardTitle>
        <p className="text-sm leading-7 text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Input placeholder="Name" {...register("name")} />
            {errors.name ? <p className="text-xs text-destructive">{errors.name.message}</p> : null}
          </div>
          <div className="space-y-2">
            <Input placeholder="Phone" {...register("phone")} />
            {errors.phone ? (
              <p className="text-xs text-destructive">{errors.phone.message}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Input placeholder="Email" type="email" {...register("email")} />
            {errors.email ? (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Select {...register("business_type")}>
              <option value="IP">Individual Entrepreneur (ИП)</option>
              <option value="LLP">Limited Liability Partnership (ТОО)</option>
              <option value="Startup">Startup</option>
              <option value="Freelancer">Freelancer</option>
              <option value="Small Business">Small Business</option>
            </Select>
            {errors.business_type ? (
              <p className="text-xs text-destructive">{errors.business_type.message}</p>
            ) : null}
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Textarea
              placeholder="Tell us about your accounting or tax question"
              {...register("message")}
            />
            {errors.message ? (
              <p className="text-xs text-destructive">{errors.message.message}</p>
            ) : null}
          </div>
          <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Sending..." : submitLabel}
            </Button>
            {status ? (
              <p className={status.ok ? "text-sm text-primary" : "text-sm text-destructive"}>
                {status.message}
              </p>
            ) : null}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
