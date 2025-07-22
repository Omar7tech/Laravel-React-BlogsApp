import GuestLinks from "./GuestLinks";
import Links from "./Links";
import ThemeToggeler from "./ThemeToggeler";

export default function NavBar() {
    return (
        <div className="bg-base-100/70 backdrop-blur-lg navbar  shadow-sm fixed top-0 left-0 right-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow space-x-2">
                        <Links />
                    </ul>
                </div>
                <a className="btn btn-sm btn-ghost text-lg">Dev Blogs</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-2">
                    <Links />
                </ul>
            </div>
            <div className="navbar-end space-x-2 mr-2">
                <div className="space-x-2">
                    <GuestLinks />
                </div>
                <ThemeToggeler />
            </div>
        </div>
    )
}
