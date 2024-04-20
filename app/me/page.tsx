"use server";

import { createClient } from "@/utils/supabase/server";

const UserPage = async () => {
  const supabase = createClient();

  const { data } = await supabase.from("users").select();

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default UserPage;
