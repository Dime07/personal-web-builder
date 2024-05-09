import { createClient } from "@/utils/supabase/client";

export const useCreateUser = async (payload: {
  name: string;
  slug: string;
}) => {
  const supabase = createClient();

  return await supabase.from("users").insert([payload]).select();
};
