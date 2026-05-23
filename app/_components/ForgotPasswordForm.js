"use client";
import { useState, useActionState } from "react"; // Added Suspense import
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form"; // update path if different
import { forgotPasswordAction } from "../_lib/actions";
import SpinnerMini from "./SpinnerMini";

function ForgotPasswordForm() {
  const searchParams = useSearchParams();

  const [state, formAction, pending] = useActionState(async (state, input) => {
    return await forgotPasswordAction(input);
  }, null);

  const [emailUsed, setEmailUsed] = useState(searchParams.get("email") ?? "");

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const emailIsValid = isValidEmail(emailUsed);
  const canSubmit = emailIsValid && !pending;

  return (
    <form action={(formData) => formAction(formData)} className="space-y-4">
      <h1 className="mb-3 text-2xl font-semibold">Reset Your Password</h1>

      <input
        type="email"
        name="email"
        value={emailUsed}
        onChange={(e) => setEmailUsed(e.target.value)}
        className="w-full rounded-md border px-3 py-2"
        placeholder="Enter your email"
        disabled={pending}
      />

      <button
        type="submit"
        disabled={!canSubmit}
        className="
          w-full rounded-md bg-black py-2 text-white
          disabled:cursor-not-allowed disabled:opacity-50
        "
      >
        {pending ? <SpinnerMini /> : "Send reset link"}
      </button>

      {/* Success state */}
      {state?.success && (
        <div className="rounded-md bg-green-50 p-3 text-sm text-green-700">
          Password reset link sent successfully.
        </div>
      )}

      {/* Error state */}
      {state?.error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
          {state.error}
        </div>
      )}
    </form>
  );
}

export default ForgotPasswordForm;
