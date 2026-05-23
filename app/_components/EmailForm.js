"use client";

import { startTransition, Suspense, useActionState, useState } from "react";

import PasswordForm from "./PasswordForm";
import OneTapComponent from "./OneTap";
import { useSearchParams } from "next/navigation";
import CreateAccount from "./CreateAccount";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SpinnerMini from "./SpinnerMini";
import { signInUser } from "../_lib/actions";

function EmailForm() {
  // const searchParams = useSearchParams();
  // console.log(searchParams);
  const initialState = {
    user: "",
  };

  const router = useRouter();

  // const [state, formAction, pending] = useActionState(signInUser, initialState);
  const [state, formAction, isPending] = useActionState(
    async (state, input) => {
      if (input === null) {
        return initialState;
      }
      return await signInUser(input);
    },
    initialState,
  );

  async function handleSubmit() {
    startTransition(() => {
      formAction(null);
    });
  }

  function onForgotPassword(email) {
    router.push(`/forgot-password?email=${encodeURIComponent(email)}`);
  }

  return (
    <>
      {!state?.user && !state?.createAccount && (
        <div className="w-full max-w-md mx-auto bg-white border border-stone-200/60 rounded-xl shadow-sm p-6 sm:p-8 mt-10 md:mt-16">
          <form
            action={(formData) => formAction(formData)}
            className="flex flex-col gap-5"
          >
            {/* --- FORM HEADER --- */}
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight text-stone-900 sm:text-2xl">
                Login or Create Account
              </h2>
            </div>

            {/* --- ERROR MESSAGE BREAKDOWNS --- */}
            {(state?.message || state?.errors) && (
              <div className="bg-red-50 border border-red-200/60 rounded-md p-3 text-xs text-red-600 space-y-1 font-medium">
                {state?.message && <p>{state?.message}</p>}
                {state?.errors && <p>{state?.errors}</p>}
              </div>
            )}

            {/* --- EMAIL INPUT FIELD --- */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-xs font-bold text-stone-600 uppercase tracking-wide"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="example@email.com"
                className="w-full border border-stone-200 bg-white rounded-md py-3 px-4 text-sm text-stone-900 transition-all placeholder-stone-400
            focus:border-button focus:ring-1 focus:ring-button focus:outline-none shadow-sm"
              />
            </div>

            {/* --- SUBMIT / CONTINUE BUTTON --- */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-button hover:bg-[#4d4238] text-white font-bold text-sm py-3.5 px-4 rounded-md shadow-sm 
          transition-all duration-200 tracking-wider uppercase select-none cursor-pointer active:scale-[0.99] mt-1"
            >
              {isPending ? (
                <>
                  <SpinnerMini />
                  <span>Continuing...</span>
                </>
              ) : (
                // If you are using a single-step form, use "Continue"
                <span>Continue</span>
              )}
            </button>
          </form>
        </div>
      )}
      {state?.user && (
        <div className="w-full max-w-md mx-auto bg-white border border-stone-200/60 rounded-xl shadow-sm p-6 sm:p-8 mt-10 md:mt-16">
          <div className="flex flex-col gap-6">
            {/* --- CURRENT USER IDENTITY BANNER --- */}
            <div className="bg-stone-50 border border-stone-200/40 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                  Signing in as
                </p>
                <p className="text-sm font-semibold text-stone-800 truncate mt-0.5">
                  {state.user}
                </p>
              </div>

              {/* Change Email Action Link */}
              <button
                type="button"
                onClick={handleSubmit}
                className="text-xs font-bold text-button hover:text-[#4d4238] underline transition-colors cursor-pointer select-none text-left"
              >
                Change email
              </button>
            </div>

            {/* =================================================================
          PRIMARY PASSWORD FORM INPUT 
         ================================================================= */}
            <div className="relative">
              <PasswordForm userEmail={state.user} />
            </div>

            {/* --- SECONDARY HELP UTILITIES --- */}
            <div className="flex justify-center border-t border-stone-100 pt-4">
              <button
                type="button"
                onClick={() => onForgotPassword(state.user)}
                className="text-xs font-medium text-stone-500 hover:text-stone-800 transition-colors cursor-pointer select-none"
              >
                Forgot your password?
              </button>
            </div>
          </div>
        </div>
      )}

      {state?.createAccount && (
        <CreateAccount userEmail={state.createAccount} />
      )}
    </>
  );
}

export default EmailForm;

//  <form action={(formData) => formAction(formData)}>
//       <div>
//         <h2>Login or Create account</h2>

//         <p className="text-red-500">{state?.message}</p>
//         <p className="text-red-500">{state?.errors}</p>

//         <input
//           placeholder="example@email.com"
//           className=" border border-primary-400 rounded-sm py-3 px-3"
//           name="email"
//         />
//         <button className="rounded-md bg-blue-500 py-3 px-3 cursor-pointer">
//           Continue
//         </button>
//       </div>
//     </form>
