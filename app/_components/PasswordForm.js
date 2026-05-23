"use client";

import { useActionState, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; //

import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "../utils/supabase/client";
import { useForm } from "react-hook-form";
import SpinnerMini from "./SpinnerMini";

function PasswordForm({ userEmail }) {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";
  // const redirectTo = searchParams.get("callbackUrl") || "/";

  const { register, formState, getValues, handleSubmit } = useForm();
  const { errors, isSubmitting } = formState;

  const [authError, setAuthError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const isLoading = isSubmitting || isRedirecting;
  async function onSubmit({ password }) {
    setAuthError(null);
    setIsRedirecting(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password,
    });

    if (error) {
      setAuthError("Invalid email or password. Please try again.");
      setIsRedirecting(false);
      return;
    }

    router.replace(next);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 w-full"
    >
      {/* --- ERROR MESSAGE CALLOUT --- */}
      {(authError || errors?.password) && (
        <div className="bg-red-50 border border-red-200/60 rounded-md p-3 text-xs text-red-600 space-y-1 font-medium">
          {authError && <p>{authError}</p>}
          {errors?.password?.message && <p>{errors?.password?.message}</p>}
        </div>
      )}
      {/* --- PASSWORD INPUT FIELD --- */}
      <div className="flex flex-col gap-1.5 relative">
        <label
          htmlFor="password"
          className="text-xs font-bold text-stone-600 uppercase tracking-wide"
        >
          Password
        </label>

        <div className="relative w-full">
          <input
            id="password"
            type={showPassword ? "text" : "password"} // Fixed: Secure standard type masks characters safely
            placeholder="••••••••"
            className="w-full border border-stone-200 bg-white rounded-md py-3 pl-4 pr-11 text-sm text-stone-900 transition-all placeholder-stone-300
              focus:border-button focus:ring-1 focus:ring-button focus:outline-none shadow-sm"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />

          {/* --- OPTIONAL: SHOW / HIDE PASSWORD TOGGLE BUTTON --- */}
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* --- SUBMIT / LOG IN BUTTON --- */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-button hover:bg-[#4d4238] text-white font-bold text-sm py-3.5 px-4 rounded-md shadow-sm 
          transition-all duration-200 tracking-wider uppercase select-none cursor-pointer active:scale-[0.99] mt-1"
      >
        {isLoading ? (
          <>
            <SpinnerMini />
            <span>Logging you in ..</span>
          </>
        ) : (
          // If you are using a single-step form, use "Continue"
          <span>Log in</span>
        )}
      </button>
    </form>
  );
}
export default PasswordForm;
