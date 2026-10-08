import { useAuth } from "../service/auth/useAuth";
import { routes, protectedRoutes } from "../config/data.json";
import { NavLink } from "react-router";

export default function Header() {
  const { state: auth } = useAuth();
  const navgiationRoutes = auth.user ? protectedRoutes : routes;
  return (
    <header className="shadow-xl">
      <nav>
        <ul className="flex items-center">
          {navgiationRoutes.map((route) => (
            <li className="">
              <NavLink
                key={route.name}
                to={route.href}
                className={`block uppercase px-5 py-7 hover:underline`}
              >
                {route.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
