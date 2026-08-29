"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function bookCamp(formData: FormData) {
  const supabase = await createClient();

  const camp_id = formData.get("camp_id") as string;
  const full_name = formData.get("full_name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const chosen_date = formData.get("chosen_date") as string;
  const spots_booked = parseInt(formData.get("spots_booked") as string);
  const price_per_person = parseFloat(formData.get("price_per_person") as string);

  const total_price = spots_booked * price_per_person;

  const { error } = await supabase.from("camp_bookings").insert({
    camp_id,
    full_name,
    email,
    phone,
    spots_booked,
    total_price,
    chosen_date
  });

  if (error) {
    console.error("Booking Error:", error);
    return { error: error.message };
  }

  revalidatePath(`/camps/${camp_id}`);
  revalidatePath('/camps');

  return { success: true };
}

export async function bookPackage(formData: FormData) {
  const supabase = await createClient();

  const package_id = formData.get("package_id") as string;
  const full_name = formData.get("full_name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const number_of_travelers = parseInt(formData.get("number_of_travelers") as string);
  const starting_price = parseFloat(formData.get("starting_price") as string);
  const custom_requests = formData.get("custom_requests") as string;

  const total_price = number_of_travelers * starting_price;

  const { error } = await supabase.from("package_bookings").insert({
    package_id,
    full_name,
    email,
    phone,
    number_of_travelers,
    custom_requests,
    total_price,
  });

  if (error) {
    console.error("Booking Error:", error);
    return { error: error.message };
  }

  revalidatePath(`/packages/${package_id}`);
  revalidatePath('/packages');

  return { success: true };
}
