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
import { Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "../../features/theme/ThemeToggle";

export const NavigationBar = () => {
    return (
        <Navbar
            fluid
            rounded
            className="
                bg-gradient-to-r from-gray-100 via-white to-gray-100 
                dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950
                border-b border-gray-200 dark:border-zinc-800 
                shadow-md dark:shadow-lg
            "
        >
            <NavbarBrand as={Link} to="/">
                <div className="
                    w-10 h-10 me-3 
                    bg-gradient-to-br from-orange-400 to-orange-600 
                    dark:from-orange-500 dark:to-orange-700
                    border border-orange-300/40 dark:border-orange-400/30 
                    rounded-full flex items-center justify-center shadow-md
                ">
                    <Flame className="text-white dark:text-zinc-900 w-5 h-5 drop-shadow-sm" />
                </div>

                <span className="
                    self-center whitespace-nowrap text-xl font-bold 
                    text-gray-800 dark:text-white tracking-wide 
                ">
                    ZenFit
                </span>
            </NavbarBrand>

            <div className="flex md:order-2">
                <ThemeToggle />

                <Dropdown
                    arrowIcon={false}
                    inline
                    placement="bottom-end"
                    className="
                        !bg-white dark:!bg-zinc-900 
                        border border-gray-200 dark:border-zinc-800 
                        !text-gray-800 dark:!text-white shadow-xl
                    "
                    label={
                        <Avatar
                            alt="User settings"
                            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                            rounded
                            className="mx-2"
                        />
                    }
                >
                    <DropdownHeader className="!bg-transparent">
                        <span className="block text-sm font-medium text-gray-800 dark:text-white">
                            Bonnie Green
                        </span>
                        <span className="block truncate text-xs text-gray-500 dark:text-zinc-400">
                            name@flowbite.com
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

                    <DropdownItem className="text-red-500 hover:!bg-red-500/10">
                        Sign out
                    </DropdownItem>
                </Dropdown>

                <NavbarToggle className="text-orange-500 hover:bg-orange-500/10 hover:cursor-pointer dark:hover:bg-zinc-900" />
            </div>

            <NavbarCollapse>
                <NavbarLink
                    as={Link}
                    to="/dashboard"
                    className="text-gray-600 dark:text-zinc-300 hover:text-orange-500! transition"
                >
                    Dashboard
                </NavbarLink>

                <NavbarLink
                    as={Link}
                    to="/workout"
                    className="text-gray-600 dark:text-zinc-300 hover:text-orange-500! transition"
                >
                    Workout
                </NavbarLink>

                <NavbarLink
                    as={Link}
                    to="/habit-tracker"
                    className="text-gray-600 dark:text-zinc-300 hover:text-orange-500! transition"
                >
                    Habit Tracker
                </NavbarLink>

                <NavbarLink
                    as={Link}
                    to="/profile"
                    className="text-gray-600 dark:text-zinc-300 hover:text-orange-500! transition"
                >
                    Profile
                </NavbarLink>
            </NavbarCollapse>
        </Navbar>
    );
};