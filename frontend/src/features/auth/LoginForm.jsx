"use client";

import { useFormik } from "formik";
import Link from "next/link";
import { User, Lock, ArrowRight } from "lucide-react";
import useLogin from "./hooks/useLogin";

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
        onSubmit: async (values) => {
            await loginMutation.mutateAsync(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="mt-6 space-y-4 w-full">
            <Input
                label="Username"
                placeholder="admin"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="username"
                icon={<User size={18} strokeWidth={1.5} />}
                error={
                    formik.touched.username &&
                    formik.errors.username
                }
            />

            <PasswordInput
                label="Password"
                placeholder="••••••••••••"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={loginMutation.isPending}
                name="password"
                icon={<Lock size={18} strokeWidth={1.5} />}
                error={
                    formik.touched.password &&
                    formik.errors.password
                }
            />

            <div className="flex items-center justify-between pt-2 pb-2">
                <Checkbox
                    label="Remember Me"
                    checked={formik.values.remember}
                    onChange={formik.handleChange}
                    name="remember"
                    variant="maroon"
                />

                <Link
                    href="#"
                    className="
                        text-[13px]
                        font-medium
                        text-[var(--gmu-maroon)]
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
                variant="maroon"
                disabled={loginMutation.isPending}
                className="mt-2 h-12"
            >
                {loginMutation.isPending ? "Signing In..." : (
                    <span className="flex items-center justify-center gap-2">
                        Sign In <ArrowRight size={18} />
                    </span>
                )}
            </Button>
        </form>
    );
}