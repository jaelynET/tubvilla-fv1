"use client";
import { useState, useActionState } from "react"; // Added Suspense import
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form"; // update path if different

// 1. Rename your original component to ForgotPasswordForm
function ForgotPasswordForm() {
  const searchParams = useSearchParams();

  const { register, formState, getValues, handleSubmit } = useForm();

  const [state, formAction, pending] = useActionState(async (state, input) => {
    return await forgotPasswordAction(input);
  });

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const [emailUsed, setEmailUsed] = useState(searchParams.get("email") ?? "");

  const emailIsValid = isValidEmail(emailUsed);
  const canSubmit = emailIsValid;

  return (
    <form action={(formData) => formAction(formData)} className="space-y-4">
      <h1 className="mb-3">Reset Your Password</h1>
      <input
        type="email"
        name="email"
        value={emailUsed}
        onChange={(e) => setEmailUsed(e.target.value)}
        className="w-full rounded-md border px-3 py-2"
        placeholder="Enter your email"
      />
      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full rounded-md bg-black py-2 text-white
          disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        Send reset link
      </button>
    </form>
  );
}

export default ForgotPasswordForm;
