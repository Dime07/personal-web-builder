import { createClient } from "@/utils/supabase/server";

export default async function UserSlug({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();
  const { data: dataUser } = await supabase
    .from("users")
    .select()
    .eq("slug", params.slug);

  const user = dataUser ? dataUser[0] : {};

  return (
    <div className="bg-white shadow-sm text-black p-2 rounded-md">
      <p>{user.name}</p>
    </div>
  );
}
