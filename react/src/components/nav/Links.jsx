import { NavLink } from "react-router-dom";
import List from "./List";

export default function Links() {
    return (
        <>
            <List>
                <NavLink 
                    className={({ isActive }) => 
                        `block px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform ${
                            isActive 
                                ? "bg-base-300 font-semibold  scale-105" 
                                : "hover:bg-base-200 hover:translate-x-1"
                        }`
                    } 
                    to={'/'}
                >
                    Home
                </NavLink>
            </List>
            <List>
                <NavLink 
                    className={({ isActive }) => 
                        `block px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform ${
                            isActive 
                                ? "bg-base-300 font-semibold  scale-105" 
                                : "hover:bg-base-200 hover:translate-x-1"
                        }`
                    } 
                    to={'/about'}
                >
                    About
                </NavLink>
            </List>
            <List>
                <NavLink 
                    className={({ isActive }) => 
                        `block px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform ${
                            isActive 
                                ? "bg-base-300 font-semibold  scale-105" 
                                : "hover:bg-base-200 hover:translate-x-1"
                        }`
                    } 
                    to={'/blogs'}
                >
                    Blogs
                </NavLink>
            </List>
        </>
    )
}