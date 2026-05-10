import {
    Avatar,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
} from "flowbite-react";
import { Flame, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "../../features/theme/ThemeToggle";
import { FavIcon } from "../common/FavIcon";
import { useAuthStore } from "../../store/authStore";
import { useState } from "react";
import { DialogModal } from "../common/DialogModal";

export const NavigationBar = () => {
    const { user, logout } = useAuthStore()
    const [openLogout, setOpenLogout] = useState(false);

    return (
        <div className="transition-all duration-200">
            <Navbar
                rounded
                className="fixed top-0 left-0 right-0 z-50
                bg-gradient-to-r from-gray-100 via-white to-gray-100 
                dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950
                border-b border-gray-200 dark:border-zinc-800 
                shadow-md dark:shadow-lg
            "
            >
                <NavbarBrand as={Link} to="/">
                    <FavIcon />

                    <span className="
                    self-center whitespace-nowrap text-xl font-bold 
                    text-gray-800 dark:text-white tracking-wide 
                    font-space
                ">
                        ZenFit
                    </span>
                </NavbarBrand>

                <div className="flex md:order-2 font-inter gap-3">
                    <ThemeToggle />

                    {user && <Dropdown
                        arrowIcon={false}
                        inline
                        placement="bottom-end"
                        className="
                        !bg-white dark:!bg-zinc-900 
                        border border-gray-200 dark:border-zinc-800 
                        !text-gray-800 dark:!text-white shadow-xl
                    "
                        label={
                            <div
                                className="size-10 rounded-full flex items-center justify-center p-3 bg-orange-500 font-extrabold text-white dark:text-zinc-950"
                            >
                                {user.name[0]}
                            </div>
                        }
                    >
                        <DropdownHeader className="bg-transparent!">
                            <span className="block text-sm font-medium text-gray-800 dark:text-white">
                                {user.name}
                            </span>
                            <span className="block truncate text-xs text-gray-500 dark:text-zinc-400">
                                {user.email}
                            </span>
                        </DropdownHeader>

                        <DropdownItem as={Link}
                            to="/dashboard" className="text-gray-600 dark:text-zinc-300 hover:!bg-gray-100 dark:hover:!bg-zinc-800">
                            Dashboard
                        </DropdownItem>

                        <DropdownItem as={Link}
                            to="/workout" className="text-gray-600 dark:text-zinc-300 hover:!bg-gray-100 dark:hover:!bg-zinc-800">
                            Workout
                        </DropdownItem>

                        <DropdownItem as={Link}
                            to="/habit-tracker" className="text-gray-600 dark:text-zinc-300 hover:!bg-gray-100 dark:hover:!bg-zinc-800">
                            Habit Tracker
                        </DropdownItem>

                        <DropdownItem as={Link}
                            to="/profile" className="text-gray-600 dark:text-zinc-300 hover:!bg-gray-100 dark:hover:!bg-zinc-800">
                            Profile
                        </DropdownItem>

                        <DropdownDivider className="!bg-gray-200 dark:!bg-zinc-800" />

                        <DropdownItem onClick={() => setOpenLogout(true)} className="text-red-500 hover:!bg-red-500/10">
                            Sign out
                        </DropdownItem>
                    </Dropdown>}
                    {user && <button
                        onClick={() => setOpenLogout(true)}
                        className="flex items-center gap-2 px-3 py-3 rounded-full hover:bg-orange-500/10 dark:hover:bg-zinc-900 hover:cursor-pointer
                        text-orange-500 dark:text-gray-200
                        transition"
                    >
                        <LogOut />
                    </button>}

                    <NavbarToggle className="text-orange-500 hover:bg-orange-500/10 hover:cursor-pointer dark:hover:bg-zinc-900" />
                </div>

                <NavbarCollapse>
                    {user && <NavbarLink
                        as={Link}
                        to="/dashboard"
                        className="text-gray-600 dark:text-zinc-300 hover:text-orange-500! transition font-inter"
                    >
                        Dashboard
                    </NavbarLink>}

                    {user && <NavbarLink
                        as={Link}
                        to="/workout"
                        className="text-gray-600 dark:text-zinc-300 hover:text-orange-500! transition"
                    >
                        Workout
                    </NavbarLink>}

                    {user && <NavbarLink
                        as={Link}
                        to="/habit-tracker"
                        className="text-gray-600 dark:text-zinc-300 hover:text-orange-500! transition"
                    >
                        Habit Tracker
                    </NavbarLink>}

                    {user && <NavbarLink
                        as={Link}
                        to="/profile"
                        className="text-gray-600 dark:text-zinc-300 hover:text-orange-500! transition"
                    >
                        Profile
                    </NavbarLink>

                    }
                    {!user && <NavbarLink
                        as={Link}
                        to="/login"
                        className="text-gray-600 dark:text-zinc-300 hover:text-orange-500! transition"
                    >
                        Sign In
                    </NavbarLink>}
                    {!user && <NavbarLink
                        as={Link}
                        to="/signup"
                        className="text-gray-600 dark:text-zinc-300 hover:text-orange-500! transition"
                    >
                        Sign Up
                    </NavbarLink>}

                </NavbarCollapse>
                <DialogModal open={openLogout} onOpenChange={setOpenLogout} title="Logout" description="Are you sure you need to logout?" isButton={true} actionTitle="Logout" action={logout} />
            </Navbar>
        </div>
    );
};