import { redirect } from "next/navigation";

import { getCurrentAdminUser } from "@/lib/auth";

export default async function AdminIndexPage() {
  const user = await getCurrentAdminUser();
  redirect(user ? "/admin/dashboard" : "/admin/login");
}
