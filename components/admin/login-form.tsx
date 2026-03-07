"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { adminLoginAction } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

type FormValues = z.infer<typeof schema>;

export function AdminLoginForm() {
  const [status, setStatus] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { register, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(schema)
  });

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader>
        <CardTitle className="font-display text-3xl">Admin login</CardTitle>
        <p className="text-sm leading-7 text-muted-foreground">
          Sign in with your Supabase Auth admin user.
        </p>
      </CardHeader>
      <CardContent>
        <form
          className="grid gap-4"
          onSubmit={handleSubmit((values) =>
            startTransition(async () => {
              const result = await adminLoginAction(values);
              if (result?.success === false) {
                setStatus(result.message);
              }
            })
          )}
        >
          <Input type="email" placeholder="Admin email" {...register("email")} />
          <Input type="password" placeholder="Password" {...register("password")} />
          <Button disabled={isPending}>{isPending ? "Signing in..." : "Login"}</Button>
          {status ? <p className="text-sm text-destructive">{status}</p> : null}
        </form>
      </CardContent>
    </Card>
  );
}
