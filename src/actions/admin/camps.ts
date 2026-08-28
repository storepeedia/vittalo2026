"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createCamp(formData: FormData) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("camps").insert({
    title: formData.get("title"),
    activity_type: formData.get("activity_type"),
    start_date: formData.get("start_date"),
    end_date: formData.get("end_date"),
    total_spots: parseInt(formData.get("total_spots") as string),
    available_spots: parseInt(formData.get("total_spots") as string), // Assuming new camp has all spots available
    price_per_person: parseFloat(formData.get("price_per_person") as string),
    image_url: formData.get("image_url"),
    description: formData.get("description"),
    inclusions: (formData.get("inclusions") as string).split(",").map((s) => s.trim()),
    is_active: formData.get("is_active") === "true",
  });

  if (error) throw new Error(error.message);
  revalidatePath("/admin/dashboard");
  revalidatePath("/camps");
  return { success: true };
}

export async function updateCamp(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("camps")
    .update({
      title: formData.get("title"),
      activity_type: formData.get("activity_type"),
      start_date: formData.get("start_date"),
      end_date: formData.get("end_date"),
      total_spots: parseInt(formData.get("total_spots") as string),
      price_per_person: parseFloat(formData.get("price_per_person") as string),
      image_url: formData.get("image_url"),
      description: formData.get("description"),
      inclusions: (formData.get("inclusions") as string).split(",").map((s) => s.trim()),
      is_active: formData.get("is_active") === "true",
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/dashboard");
  revalidatePath("/camps");
  revalidatePath(`/camps/${id}`);
  return { success: true };
}

export async function deleteCamp(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("camps").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/dashboard");
  revalidatePath("/camps");
  return { success: true };
}
