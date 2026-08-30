"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createPackage(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("packages").insert({
    title: formData.get("title"),
    duration_days: parseInt(formData.get("duration_days") as string),
    duration_nights: parseInt(formData.get("duration_nights") as string),
    route: formData.get("route"),
    starting_price: parseFloat(formData.get("starting_price") as string),
    tags_top_left: formData.get("tags_top_left") as string,
    tags_image_bottom: formData.get("tags_image_bottom") as string,
    tags_body_top: formData.get("tags_body_top") as string,
    image_url: formData.get("image_url"),
    description: formData.get("description"),
    itinerary: JSON.parse(formData.get("itinerary") as string || "[]"),
    is_active: formData.get("is_active") === "true",
  });

  if (error) throw new Error(error.message);
  revalidatePath("/admin/dashboard");
  revalidatePath("/packages");
  return { success: true };
}

export async function updatePackage(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("packages")
    .update({
      title: formData.get("title"),
      duration_days: parseInt(formData.get("duration_days") as string),
      duration_nights: parseInt(formData.get("duration_nights") as string),
      route: formData.get("route"),
      starting_price: parseFloat(formData.get("starting_price") as string),
    tags_top_left: formData.get("tags_top_left") as string,
    tags_image_bottom: formData.get("tags_image_bottom") as string,
    tags_body_top: formData.get("tags_body_top") as string,
      image_url: formData.get("image_url"),
      description: formData.get("description"),
      itinerary: JSON.parse(formData.get("itinerary") as string || "[]"),
      is_active: formData.get("is_active") === "true",
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/dashboard");
  revalidatePath("/packages");
  revalidatePath(`/packages/${id}`);
  return { success: true };
}

export async function deletePackage(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("packages").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/dashboard");
  revalidatePath("/packages");
  return { success: true };
}
