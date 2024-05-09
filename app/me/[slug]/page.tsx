import { createClient } from "@/utils/supabase/server";

export default async function UserSlug({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();

  const { data: dataUser } = await supabase
    .from("user_cards")
    .select(`*, users(*)`);

  const data = dataUser ? dataUser[0] : {};

  console.log(data);

  return (
    <div className="bg-white shadow-sm text-black p-2 rounded-md">
      <p>{data.users.name}</p>
      <p>{data.description}</p>
    </div>
  );
}
