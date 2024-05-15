"use client";

import SingleFormInput from "@/components/SingleFormInput";
import { IconGoogleColored } from "@/assets/icons";
import { useState } from "react";
import createAccount from "@/utils/actions/createAccount";
import SubmitButton from "./SubmitButton";
import { toast } from "react-toastify";
import Modal from "./Modal";
import login from "@/utils/actions/login";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [signUp, toggleSignUp] = useState(false);
  const [showModal, setShowModal] = useState(false);

  async function formAction(formData) {
    // call createAccount if signUp is true
    if (signUp) {
      try {
        const resp = await createAccount(formData);

        // if create account is successful
        if (resp.success) {
          setShowModal(true);
        } else {
          // if create account is not successful
          toast.error(resp.message, { position: "top-right" });
        }
      } catch (error) {
        // if error occur during account creating
        toast.error("An error occurred! Please try again", {
          position: "top-right",
        });
      }
    } else {
      // call login if signUp is false
      try {
        const resp = await login(formData);

        // if login is successful
        if (resp.success) {
          toast.success(`Hello ${resp.user.name}! Welcome back 👋`);
          localStorage.setItem("user", JSON.stringify(resp.user));
          router.push("/");
        } else {
          // if login is not successful
          toast.error(resp.message, { position: "top-right" });
        }
      } catch (error) {
        // if error occur during logging in
        console.log(error);
        toast.error("An error occurred! Please try again", {
          position: "top-right",
        });
      }
    }
  }

  return (
    <div className="mx-auto w-[90vw] max-w-md px-6 md:max-w-lg lg:px-0 lg:pr-6">
      <h3 className="mb-6 font-medium">
        {signUp ? "Create an account" : "Login"}
      </h3>
      {signUp && (
        <small className="-mt-4 mb-4 block pl-2 font-semibold text-button2/80">
          Fill all inputs marked with *
        </small>
      )}

      {/* login form */}
      <form action={formAction} className="">
        {signUp && (
          <div className="grid-cols-2 gap-6 md:grid">
            <SingleFormInput placeholder="First name *" name="firstName" />
            <SingleFormInput placeholder="Last name *" name="lastName" />
          </div>
        )}

        <SingleFormInput placeholder="Email *" type="email" name="email" />
        <SingleFormInput
          placeholder="Password *"
          type="password"
          name="password"
        />
        {signUp && (
          <>
            <SingleFormInput
              placeholder="Confirm password *"
              type="password"
              name="matchingPassword"
            />
            <SingleFormInput placeholder="Address" name="address" />
          </>
        )}

        {/* error message */}
        <small className="-mt-4 block font-semibold text-red-500"></small>

        {/* form submit button */}
        <SubmitButton signUp={signUp} />

        {/* google sign in button */}
        <button
          className="flex w-full items-center justify-center gap-2 rounded border p-2 duration-300 hover:bg-hoverButton1 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 xs:p-3"
          type="button"
          disabled
          title="Not yet active"
        >
          <IconGoogleColored className="text-4xl" /> Sign-in with Google
        </button>

        {/* toggle sign in & sign up */}
        <p className="mt-8 flex items-center justify-center gap-4 text-center opacity-75">
          {signUp ? "Already have an account? " : "Don't have an account? "}
          <button
            type="button"
            className="border-b border-black duration-200 hover:text-text1"
            onClick={() => toggleSignUp(!signUp)}
          >
            {signUp ? "Login In" : "Create account"}
          </button>
        </p>
      </form>
      <Modal showModal={showModal} />
    </div>
  );
}
