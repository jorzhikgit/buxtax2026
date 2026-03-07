"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { hasSupabaseServiceEnv } from "@/lib/supabase/config";
import { sendTelegramLeadNotification } from "@/lib/telegram";

const leadSchema = z.object({
  name: z.string().min(2).max(120),
  phone: z.string().min(6).max(40),
  email: z.string().email(),
  business_type: z.string().min(2).max(120),
  message: z.string().max(500).optional().or(z.literal("")),
  source: z.enum(["landing", "calculator", "blog"])
});

export type LeadActionState =
  | { success: true; message: string }
  | { success: false; message: string; fieldErrors?: Record<string, string[]> };

export async function createLeadAction(input: unknown): Promise<LeadActionState> {
  const parsed = leadSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      message: "Please correct the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors
    };
  }

  const lead = parsed.data;

  if (hasSupabaseServiceEnv()) {
    try {
      const supabase = createAdminSupabaseClient();
      const { error } = await supabase.from("leads").insert({
        name: lead.name,
        phone: lead.phone,
        email: lead.email,
        business_type: lead.business_type,
        message: lead.message || null,
        source: lead.source
      });

      if (error) {
        return {
          success: false,
          message: "Lead was not saved. Please verify Supabase table permissions."
        };
      }
    } catch {
      return {
        success: false,
        message: "Lead storage failed because the Supabase service connection is unavailable."
      };
    }
  }

  await sendTelegramLeadNotification({
    source: lead.source,
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    businessType: lead.business_type,
    message: lead.message
  });

  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/leads");

  return {
    success: true,
    message: hasSupabaseServiceEnv()
      ? "Thank you. Your request has been sent to our accounting team."
      : "Form submission works, but Supabase is not configured yet. Connect env vars to store leads."
  };
}
