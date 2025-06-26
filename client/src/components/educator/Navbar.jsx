import React from "react";
import { assets } from "../../assets/assets";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useUser();

  return (
    <div className="flex items-center justify-between px-4 border border-gray-500 py-3">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-28" />
      </Link>
      <div className="flex gap-2">
        <p>Hi! {user ? user.fullName : "Developers"}</p>
        {user ? (
          <UserButton />
        ) : (
          <img src={assets.profile_img} className="max-w-8" />
        )}
      </div>
    </div>
  );
};

export default Navbar;
