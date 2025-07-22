import { NavLink } from "react-router-dom";

export default function GuestLinks() {
    return (
        <div className="flex items-center gap-2">
            <NavLink
                className={({ isActive }) =>
                    `px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ease-out ${
                        isActive
                            ? "bg-primary text-primary-content shadow-sm"
                            : "text-base-content/70 hover:text-base-content hover:bg-base-200/50"
                    }`
                }
                to={'/login'}
            >
                Login
            </NavLink>

            <div className="w-px h-4 bg-base-300"></div>

            <NavLink
                className={({ isActive }) =>
                    `px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ease-out ${
                        isActive
                            ? "bg-secondary text-secondary-content shadow-sm"
                            : "text-base-content/70 hover:text-base-content hover:bg-base-200/50"
                    }`
                }
                to={'/register'}
            >
                Register
            </NavLink>
        </div>
    )
}
