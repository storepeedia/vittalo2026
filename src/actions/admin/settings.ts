"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateContactSettings(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email")?.toString();
  const phone = formData.get("phone")?.toString();

  if (!email || !phone) {
    throw new Error("Email and phone are required.");
  }

  const { error } = await supabase
    .from("contact_settings")
    .update({ email, phone, updated_at: new Date().toISOString() })
    .eq("id", 1);

  if (error) {
    console.error("Error updating contact settings:", error);
    throw error;
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/");
}
