import React from "react";

const Login = () => {
  return (
    <div>
      <div className="flex grid-cols-2">
        <div className="flex flex-col px-[100px] gap-8">
          <div className="flex flex-col gap-2">
            <div className="text-white font-metropolis text-2xl font-semibold leading-6">
              Recover Your Password
            </div>
            <div className="text-white text-center font-metropolis text-sm font-normal leading-[17px]">
              Enter your email address to reset your password. You will receive
              a password reset code to your inbox.
            </div>
          </div>
          <form className="flex flex-col flex-start gap-2">
            <label className="text-white font-metropolis text-sm font-normal">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex h-[40px] px-3 py-2 justify-between items-center rounded-lg border border-[#E6E6E6] bg-[#1A1A1A]"
            />
          </form>
        </div>
        <div>
          <img
            src="/ctruhLogo.png"
            alt="ctruh logo"
            className="w-[754px] h-[818px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
