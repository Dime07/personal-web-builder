import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full bg-neutral-900 py-4 fixed px-8 flex justify-between">
      <p className="text-2xl text-white font-semibold">TBD ❤️</p>
      <ul className="flex gap-2">
        <li className="px-5 py-1 bg-white rounded-lg font-semibold ">
          <Link href={{ pathname: "/login" }}>Login</Link>
        </li>
        <li className="px-5 py-1 bg-black text-white border-white border rounded-lg font-semibold ">
          <Link href={{ pathname: "/sign-up" }}>Sign Up</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
