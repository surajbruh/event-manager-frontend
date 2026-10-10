import { useNavigate } from "react-router";
import { axiosInstance } from "../axiosInstance";
import { useAuth } from "../service/auth/useAuth";

const registerPayload = {
  name: "suraj",
  email: "imsurajyadav088@gmail.com",
  password: "password",
};
const loginPayload = {
  email: "adityachauhan044@gmail.com",
  password: "surajyadav123",
};

export default function AuthPage({ mode }: { mode: "LOGIN" | "REGISTER" }) {
  const { state: auth, dispatch } = useAuth();
  const nav = useNavigate();

  async function handleAuth() {
    try {
      const url = mode === "REGISTER" ? "/auth/register" : "/auth/login";
      const data = mode === "REGISTER" ? registerPayload : loginPayload;

      //   updates loading state
      dispatch({
        type: "AUTHENTICATING",
        payload: true,
      });

      console.log(url, data);
      const response = await axiosInstance.post(url, data);

      dispatch({
        type: "SET_USER",
        payload: response.data.user,
      });

      nav("/");
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({
        type: "AUTHENTICATING",
        payload: false,
      });
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-8">
      <button
        disabled={auth.loading.auth}
        onClick={handleAuth}
        className="w-fit bg-black px-3 py-3 text-sm uppercase text-white hover:underline sm:text-base md:text-lg"
      >
        {auth.loading.auth ? "auth..." : mode}
      </button>
    </main>
  );
}
