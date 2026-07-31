import React from "react";
import LoginHeader from "./LoginHeader";
import LoginForm from "../LoginForm";
import LoginFooter from "./LoginFooter";

export default function LoginCard() {
  return (
    <div
      className="
        w-full
        max-w-full
        sm:max-w-[420px]
        md:max-w-[440px]
        lg:max-w-[480px]
        xl:max-w-[500px]
        rounded-[28px]
        bg-[var(--gmu-card)]
        px-8
        py-10
        md:px-12
        md:py-[52px]
        shadow-[var(--gmu-shadow)]
        flex
        flex-col
      "
    >
      <LoginHeader />
      <LoginForm />
      <LoginFooter />
    </div>
  );
}
