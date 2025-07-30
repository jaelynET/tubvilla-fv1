"use client";

import { useActionState } from "react";
import { loginAction } from "../_lib/actions";
import { useSearchParams } from "next/navigation";

function PasswordForm({ userEmail }) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("rdirect") || "/";
  const credentialsEmail = {
    email: userEmail,
  };
  const loginData = loginAction.bind(null, credentialsEmail);
  const [state, formAction, pending] = useActionState(async (state, input) => {
    return await loginData(input);
  });
  return (
    //  <form action={async (formData) => await loginData(formData)}>
    <form action={(formData) => formAction(formData)}>
      <input className="hidden" name="callbackUrl" defaultValue={callbackUrl} />
      <p className="text-red-500"> {state?.error} </p>
      <p className="text-red-500"> {state?.message} </p>

      <input
        type="text"
        className=" border border-primary-400 rounded-sm py-3 px-3"
        name="password"
      />
      <button className="rounded-md bg-blue-500 py-3 px-3 cursor-pointer">
        log in
      </button>
    </form>
  );
}
export default PasswordForm;
