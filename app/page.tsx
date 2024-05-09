import FormUser from "@/components/FormUser";

export default function Index() {
  return (
    <div className="bg-slate-50  flex justify-center items-center">
      <div className="flex justify-center min-h-screen items-start flex-col gap-2 py-10 max-w-[1440px] mx-auto  px-8 shrink-0 w-full">
        <h1 className="text-4xl font-bold">Welcome to ProfileGo</h1>
        <p className="text-xl">You can create your personal social card 😁</p>
        <FormUser />
      </div>
    </div>
  );
}
