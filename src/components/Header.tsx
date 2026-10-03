import { useAuth } from "../auth/useAuth";
import { axiosInstance } from "../axiosInstance";
import { routes, protectedRoutes } from "../config/data.json";
import { NavLink } from "react-router";

export default function Header() {
  const { state: authState, dispatch } = useAuth();
  async function handleLogin() {
    try {
      dispatch({
        type: "SIGNING_IN",
        payload: true,
      });

      const data = {
        email: "adityachauhan044@gmail.com",
        password: "surajyadav123",
      };
      const response = await axiosInstance.post("/auth/login", data);

      dispatch({
        type: "SET_USER",
        payload: response.data.user,
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({
        type: "SIGNING_IN",
        payload: false,
      });
    }
  }

  async function handleLogout() {
    try {
      dispatch({
        type: "SIGNING_OUT",
        payload: true,
      });

      const response = await axiosInstance.post("/auth/logout");
      console.log(response);

      dispatch({
        type: "SET_USER",
        payload: null,
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({
        type: "SIGNING_OUT",
        payload: false,
      });
    }
  }

  return (
    <header className="flex items-center">
      <nav className="flex items-center">
        <ul className="flex items-center gap-2">
          {routes.map((route, index) => (
            <li key={index}>
              <NavLink
                to={route.href}
                className={({ isActive }) =>
                  `hover:bg-gray-100 block px-5 py-4 text-sm xl:text-base font-semibold uppercase transition-colors ${
                    isActive && "text-red-600"
                  }`
                }
              >
                {route.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {authState.user && (
          <ul className="flex items-center gap-2">
            {protectedRoutes.map((route, index) => (
              <li key={index}>
                <NavLink
                  to={route.href}
                  className={({ isActive }) =>
                    `hover:bg-gray-100 block px-5 py-4 text-sm xl:text-base font-semibold uppercase transition-colors ${
                      isActive && "text-red-600"
                    }`
                  }
                >
                  {route.name}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </nav>

      <div className="ml-auto flex items-center gap-2">
        {authState.user ? (
          <button
            onClick={handleLogout}
            className="block px-5 py-4 text-sm xl:text-base font-semibold uppercase hover:bg-red-300 transition-colors"
          >
            {authState.loading.signOut ? "signing out..." : "logout"}
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="block px-5 py-4 text-sm xl:text-base font-semibold uppercase hover:bg-green-300 transition-colors "
          >
            {authState.loading.signIn ? "signing in..." : "login"}
          </button>
        )}
      </div>
    </header>
  );
}
