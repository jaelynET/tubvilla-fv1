"use client";

import { useForm } from "react-hook-form";
import { startTransition, useActionState, useState } from "react";
import { signupAction } from "../_lib/actions";

function CreateAccount() {
  const [isOpen, setIsOpen] = useState(false);
  const { register, formState, getValues, handleSubmit } = useForm();
  const { errors } = formState;

  const [state, formAction, pending] = useActionState(async (state, input) => {
    return await signupAction(input);
  });

  function onSubmit({ fullName, email, password }) {
    startTransition(() => {
      formAction({ fullName, email, password });
    });
  }

  return (
    <div>
      <p onClick={() => setIsOpen((show) => !show)} className="cursor-pointer">
        Create account
      </p>

      {isOpen && (
        // <form action={signupAction}>
        <form action={handleSubmit(onSubmit)}>
          <div>
            <h3>Full name</h3>
            <p className="text-red-500">{errors?.fullName?.message}</p>
            <input
              type="text"
              placeholder="full name"
              id="fullName"
              className=" border border-primary-400 rounded-sm py-3 px-3"
              {...register("fullName", { required: "This field is required" })}
            />
          </div>

          <div>
            <h3>Email</h3>
            <p className="text-red-500">{errors?.email?.message}</p>

            <input
              type="text"
              placeholder="email"
              id="email"
              className=" border border-primary-400 rounded-sm py-3 px-3"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please provide a valid email address!",
                },
              })}
            />
          </div>
          <div>
            <h3>Password</h3>
            <p className="text-red-500">{errors?.password?.message}</p>

            <input
              type="text"
              placeholder="password"
              id="password"
              className=" border border-primary-400 rounded-sm py-3 px-3"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message:
                    "Password needs to have a minimum length of 8 characters",
                },
              })}
            />
          </div>
          <div>
            <h3>Confirm password</h3>
            <p className="text-red-500">{errors?.passwordConfirm?.message}</p>

            <input
              type="text"
              placeholder="confirm password"
              id="passwordConfirm"
              className=" border border-primary-400 rounded-sm py-3 px-3"
              {...register("passwordConfirm", {
                required: "This field is required",
                validate: (value) =>
                  value === getValues().password || "Passwords need to match",
              })}
            />
          </div>
          <button className="rounded-md bg-primary-400 py-3 px-3 cursor-pointer">
            Sign up
          </button>
        </form>
      )}
    </div>
  );
}

export default CreateAccount;
