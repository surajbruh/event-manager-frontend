import { useState } from "react";
import { NavLink } from "react-router";
import { useAuth } from "../service/auth/useAuth";
import { routes, protectedRoutes } from "../config/data.json";

export default function Header() {
  const { state: auth } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationRoutes = auth.user ? protectedRoutes : routes;

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="bg-amber-100/50">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 md:py-5 lg:px-8">
        <nav
          className="flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <NavLink
            to="/"
            onClick={closeMenu}
            className="text-xl font-bold"
            aria-label="Gather home"
          >
            Gather
          </NavLink>

          {/* Desktop navigation */}
          <ul className="ml-auto hidden items-center gap-6 md:flex lg:gap-7">
            {navigationRoutes.map((route) => (
              <li key={route.name}>
                <NavLink
                  to={route.href}
                  className={({ isActive }) =>
                    `capitalize ${
                      isActive
                        ? "font-medium underline underline-offset-4"
                        : "hover:underline hover:underline-offset-4"
                    }`
                  }
                >
                  {route.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="rounded-md p-2 md:hidden"
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav
            id="mobile-navigation"
            className="border-t border-blue-200 pt-3 md:hidden"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col gap-1">
              {navigationRoutes.map((route) => (
                <li key={route.name}>
                  <NavLink
                    to={route.href}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `block rounded-md px-3 py-2 capitalize ${
                        isActive
                          ? "bg-blue-200 font-medium"
                          : "hover:bg-blue-50"
                      }`
                    }
                  >
                    {route.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
