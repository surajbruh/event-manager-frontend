import { useState } from "react";
import { loginUser, registerUser } from "../service/auth/authService";
import { useAuth } from "../service/auth/useAuth";
import { useNavigate } from "react-router";
import { type AuthPayload } from "../service/auth/authService";

const userRole = ["user", "organizer", "admin"];

export default function AuthForm({ mode }: { mode: "LOGIN" | "REGISTER" }) {
  const isSignUpPage = mode === "REGISTER";
  const [submitting, setSubmitting] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const { dispatch } = useAuth();
  const navigate = useNavigate();

  async function submit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);

    const formData = Object.fromEntries(new FormData(e.currentTarget));
    console.log(formData);
    // return;
    const fn = isSignUpPage ? registerUser : loginUser;

    try {
      const data = await fn(formData as AuthPayload);
      dispatch({ type: "SET_USER", payload: data });

      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 sm:py-12">
      <section className="mx-auto max-w-3xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold uppercase leading-tight sm:text-4xl md:text-5xl">
            {isSignUpPage ? "Create an account" : "Log in"}
          </h1>

          {/* <p className="mt-2 text-sm text-gray-600 sm:text-base">
            Fill in the details below to publish your event.
          </p> */}
        </header>

        <form
          onSubmit={submit}
          className="rounded-xl bg-white p-5 shadow-sm sm:p-8"
        >
          <div className="space-y-6">
            {/* Name */}
            {isSignUpPage && (
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium"
                >
                  Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  minLength={3}
                  placeholder="Enter your name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>
            )}
            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                minLength={3}
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type={hidePassword ? "password" : "text"}
                required
                minLength={3}
                placeholder="Enter your password"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              />

              <div className="mt-2 flex items-center gap-2">
                <input
                  id="showPassword"
                  name="showPassword"
                  type="checkbox"
                  checked={!hidePassword}
                  onChange={(e) => setHidePassword(!e.target.checked)}
                  className="h-4 w-4 cursor-pointer"
                />

                <label
                  htmlFor="showPassword"
                  className="cursor-pointer text-sm font-medium"
                >
                  Show password
                </label>
              </div>
            </div>
            {/* Role */}
            {isSignUpPage && (
              <div>
                <label
                  htmlFor="role"
                  className="mb-2 block text-sm font-medium"
                >
                  Role
                </label>

                <select
                  name="role"
                  id="role"
                  required
                  className="capitalize w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                >
                  <option value="" disabled hidden>
                    Select a role
                  </option>
                  {userRole.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-black px-5 py-3 font-medium uppercase text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting
                ? isSignUpPage
                  ? "Signing up..."
                  : "Logging in"
                : isSignUpPage
                  ? "Sign up"
                  : "Log in"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
