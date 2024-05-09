import { createClient } from "@/utils/supabase/client";

export const useCreateUserCard = async (payload: {
  social_media: { name: string; link: string }[];
  description: string;
  user_id: string;
}) => {
  const supabase = createClient();

  return await supabase.from("user_cards").insert([payload]).select();
};
