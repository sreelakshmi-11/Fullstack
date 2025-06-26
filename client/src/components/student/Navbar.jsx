import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../../context/appContext";

const Navbar = () => {
  const isCourseListPage = location.pathname.includes("/course-list");
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const { navigate, isEducator } = useContext(AppContext);
  return (
    <div
      className={`flex items-start w-full justify-between px-4 sm:px-10 md:px-14 lg:px-16 border-b  border-gray-500 py-4 ${
        isCourseListPage ? "bg-white" : "bg-cyan-100/70"
      } `}
    >
      <img
        src={assets.logo}
        alt="logo"
        className="w-28 lg:w-32 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <div className="flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-5">
          {user && (
            <>
              <button
                className="text-black !bg-transparent pr-2.5"
                onClick={() => {
                  navigate("/educator");
                }}
              >
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>{" "}
              |
              <Link to="/my-enrollments" className="text-black p-2.5">
                My Enrollments
              </Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton className="bg-none" />
        ) : (
          <button
            className="flex items-center justify-center !bg-blue-500 text-white px-5 py-2 !rounded-full"
            onClick={() => openSignIn()}
          >
            Create Account
          </button>
        )}
      </div>
      {/* for mobile */}
      {/* <div className="md:hidden flex ">
        {user && (
          <div className="flex items-center gap-5">
            <button className="text-black !bg-transparent pr-2.5">
              Become Educator
            </button>{" "}
            |
            <Link to="/my-enrollments" className="text-black p-2.5">
              My Enrollments
            </Link>
          </div>
        )}
        {user ? (
          <UserButton className="bg-none" />
        ) : (
          <button onClick={() => openSignIn}>
            <img src={assets.user_icon} />
          </button>
        )}
      </div> */}
    </div>
  );
};

export default Navbar;
