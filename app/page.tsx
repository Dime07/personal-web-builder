import FormUser from "@/components/FormUser";

export default function Index() {
  return (
    <div className="bg-slate-50 pt-[66px]">
      <div className="flex justify-center items-start flex-col gap-2 py-2 max-w-[1440px] mx-auto  px-8">
        <h1 className="text-4xl font-bold">Welcome to TBD</h1>
        <p className="text-xl">You can create your personal social card 😁</p>
        <FormUser />
      </div>
    </div>
  );
}
