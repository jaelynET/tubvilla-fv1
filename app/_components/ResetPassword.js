"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updatePasswordAction } from "../_lib/actions";
import { toast } from "sonner";

function ResetPassword({ isEditProfile = false }) {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(updatePasswordAction, {
    success: false,
  });

  useEffect(() => {
    if (state?.success) {
      toast.success("Updated successfully!");

      const timer = setTimeout(() => {
        router.push("/");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [state?.success, router]);

  return (
    <div className="max-w-md mx-auto space-y-4">
      {!state?.success && (
        <form action={formAction} className="space-y-4">
          {/* Password */}
          <div>
            <h3 className="font-medium">Enter New Password</h3>

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border rounded-sm py-3 px-3 w-full"
            />

            {state?.errors?.password && (
              <p className="text-red-500 text-sm">{state.errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <h3 className="font-medium">Confirm Password</h3>

            <input
              type="password"
              name="passwordConfirm"
              placeholder="Confirm password"
              className="border rounded-sm py-3 px-3 w-full"
            />

            {state?.errors?.passwordConfirm && (
              <p className="text-red-500 text-sm">
                {state.errors.passwordConfirm}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-500 text-white py-3 px-4 rounded-md w-full"
          >
            {isPending ? "Updating..." : "Reset Password"}
          </button>
        </form>
      )}

      {/* SUCCESS UI */}
      {state?.success && (
        <p className="text-green-600 text-sm">Your password has been updated</p>
      )}
    </div>
  );
}

export default ResetPassword;
