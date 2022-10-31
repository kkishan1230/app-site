import Image from "next/image";
import Link from "next/link";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";

import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { selectBasketItems } from "../redux/basketSlice";

function Header() {
  const items = useSelector(selectBasketItems);
  const { data: session } = useSession();
  return (
    <div className=" sticky top-0 z-30 flex w-full items-center justify-between bg-[#E7ECEE] p-4">
      <Link href="/">
        <div className="relative h-10 w-5 cursor-pointer opacity-75 transition hover:opacity-100 active:opacity-100">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </Link>
      <div className=" hidden flex-1 items-center justify-center space-x-8  md:flex">
        <div className="hyperLinks">
          <Link href="/products">Product</Link>
        </div>
        <div className="hyperLinks">
          <Link href="/">Explore</Link>
        </div>
        <div className="hyperLinks">
          <Link href="/">Support</Link>
        </div>
        <div className="hyperLinks">
          <Link href="/">Business</Link>
        </div>
      </div>
      <div className="flex items-center justify-center gap-x-4 md:mr-5">
        <MagnifyingGlassIcon className="h-6 w-6 cursor-pointer opacity-75 transition hover:opacity-100" />
        <Link href="/checkout">
          <div className="relative cursor-pointer">
            <span className="absolute -right-1 -top-1 z-50 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-[10px] text-white">
              {items.length}
            </span>

            <ShoppingBagIcon className="h-6 w-6 cursor-pointer opacity-75 transition hover:opacity-100" />
          </div>
        </Link>

        {!session ? (
          <UserIcon
            className=" h-6 w-6 cursor-pointer opacity-75 transition hover:opacity-100"
            onClick={signIn}
          />
        ) : (
          <Image
            src={session.user.image}
            height={25}
            width={25}
            className="cursor-pointer rounded-full"
            onClick={signOut}
          />
        )}
      </div>
    </div>
  );
}

export default Header;
