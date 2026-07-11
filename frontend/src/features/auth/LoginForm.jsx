"use client";

import { useFormik } from "formik";
import Link from "next/link";
import Image from "next/image";
import useLogin from "./hooks/useLogin";

import { IMAGES } from "@/constants/images";
import loginInitialValues from "./constants/loginInitialValues";
import loginSchema from "./validation/loginSchema";

import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";

export default function LoginForm() {
    const loginMutation = useLogin();

    const formik = useFormik({
        initialValues: loginInitialValues,
        validationSchema: loginSchema,
        onSubmit: (values) => {
            loginMutation.mutate(values);
        },
    });


    return (
        <div
            className="
                w-full
                max-w-[430px]
                rounded-[24px]
                border
                border-[#ECECEC]
                bg-white
                px-5
                py-6
                shadow-[0_15px_45px_rgba(0,0,0,0.08)]
            "
        >
            {/* ================= Header ================= */}
            <div className="flex flex-col items-center text-center">
                <Image
                    src={IMAGES.LOGO}
                    alt="GM University"
                    width={50}
                    height={50}
                    className="rounded-full"
                />

                <p className="mt-3 text-[10px] uppercase tracking-[0.35em] font-semibold text-[var(--primary)] font-inter">
                    Welcome Back
                </p>

                <h1 className="mt-1.5 text-[32px] leading-tight font-bold text-[var(--text)] font-inter tracking-tight">
                    Lead Management
                </h1>
            </div>

            {/* ================= Form ================= */}
            <form onSubmit={formik.handleSubmit} className="mt-6 space-y-3">
                <Input
                    label="Username"
                    placeholder="Enter your username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="username"
                    error={
                        formik.touched.username &&
                        formik.errors.username
                    }
                />

                <PasswordInput
                    label="Password"
                    placeholder="Enter your password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={loginMutation.isPending}
                    name="password"
                    error={
                        formik.touched.password &&
                        formik.errors.password
                    }
                />

                <div className="flex items-center justify-between pt-1">
                    <Checkbox
                        label="Remember Me"
                        checked={formik.values.remember}
                        onChange={formik.handleChange}
                        name="remember"
                    />

                    <Link
                        href="#"
                        className="
                            text-[13px]
                            font-medium
                            text-[var(--primary)]
                            hover:underline
                            font-inter
                            whitespace-nowrap
                        "
                    >
                        Forgot Password?
                    </Link>
                </div>

                <Button
                    type="submit"
                    disabled={loginMutation.isPending}
                >
                    {loginMutation.isPending ? "Signing In..." : "Login"}
                </Button>
            </form>

            {/* ================= Footer ================= */}
            <div className="mt-5 border-t border-gray-100 pt-4 text-center">
                <p className="text-[11px] text-gray-400 font-inter">
                    Version 1.0.0
                </p>

                <p className="mt-1 text-[11px] text-gray-500 font-inter">
                    © 2026 GM University
                </p>
            </div>
        </div>
    );
}