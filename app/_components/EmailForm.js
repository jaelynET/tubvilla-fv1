"use client";

import { startTransition, useActionState } from "react";
import { signInUser } from "../_lib/actions";
import PasswordForm from "./PasswordForm";
import OneTapComponent from "./OneTap";
import { useSearchParams } from "next/navigation";

function EmailForm() {
  const searchParams = useSearchParams();
  console.log(searchParams);
  const initialState = {
    user: "",
  };

  // const [state, formAction, pending] = useActionState(signInUser, initialState);
  const [state, formAction, pending] = useActionState(async (state, input) => {
    if (input === null) {
      return initialState;
    }
    return await signInUser(input);
  }, initialState);

  async function handleSubmit() {
    startTransition(() => {
      formAction(null);
    });
  }

  return (
    <div>
      {state?.user ? (
        <>
          <div>
            <p>{state.user}</p>
            <button onClick={handleSubmit} className="cursor-pointer">
              change email
            </button>
          </div>
          <PasswordForm userEmail={state.user} />
        </>
      ) : (
        <form action={(formData) => formAction(formData)}>
          <div>
            <h2>Enter email address</h2>

            <p className="text-red-500">{state?.message}</p>
            <p className="text-red-500">{state?.errors}</p>

            <input
              placeholder="example@email.com"
              className=" border border-primary-400 rounded-sm py-3 px-3"
              name="email"
            />
            <button className="rounded-md bg-blue-500 py-3 px-3 cursor-pointer">
              Continue
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default EmailForm;
