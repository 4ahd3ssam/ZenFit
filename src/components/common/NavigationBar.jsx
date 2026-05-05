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

export const NavigationBar = () => {
    return (
        <Navbar
            fluid
            rounded
            className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border-b border-zinc-800 shadow-lg"
        >
            <NavbarBrand as={Link} to="/">
                <div className="w-10 h-10 me-3 bg-gradient-to-br from-orange-500 to-orange-700 border border-orange-400/30 rounded-full flex items-center justify-center shadow-md">
                    <Flame className="text-white w-5 h-5 drop-shadow-sm" />
                </div>
                <span className="self-center whitespace-nowrap text-xl font-semibold text-white tracking-wide">
                    ZenFit
                </span>
            </NavbarBrand>

            <div className="flex md:order-2">
                <Dropdown
                    arrowIcon={false}
                    inline
                    placement="bottom-end"
                    className="!bg-zinc-900 !border border-zinc-800! !text-white shadow-xl"
                    label={
                        <Avatar
                            alt="User settings"
                            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                            rounded
                        />
                    }
                >
                    <DropdownHeader className="!bg-zinc-900 overflow-hidden">
                        <span className="block text-sm text-white font-medium">
                            Bonnie Green
                        </span>
                        <span className="block truncate text-xs text-zinc-400">
                            name@flowbite.com
                        </span>
                    </DropdownHeader>

                    <DropdownItem className="!text-zinc-300 hover:!bg-zinc-800">
                        Dashboard
                    </DropdownItem>

                    <DropdownItem className="!text-zinc-300 hover:!bg-zinc-800">
                        Workout
                    </DropdownItem>

                    <DropdownItem className="!text-zinc-300 hover:!bg-zinc-800">
                        Habit Tracker
                    </DropdownItem>

                    <DropdownItem className="!text-zinc-300 hover:!bg-zinc-800">
                        Profile
                    </DropdownItem>

                    <DropdownDivider className="!bg-zinc-800" />

                    <DropdownItem className="text-red-400 hover:!bg-red-500/10">
                        Sign out
                    </DropdownItem>
                </Dropdown>
                <NavbarToggle className="text-orange-400 hover:bg-orange-500/10" />
            </div>

            <NavbarCollapse>
                <NavbarLink
                    as={Link}
                    to="/dashboard"
                    className="text-zinc-300 hover:text-orange-400 transition"
                >
                    Dashboard
                </NavbarLink>

                <NavbarLink
                    as={Link}
                    to="/workout"
                    className="text-zinc-300 hover:text-orange-400 transition"
                >
                    Workout
                </NavbarLink>

                <NavbarLink
                    as={Link}
                    to="/habit-tracker"
                    className="text-zinc-300 hover:text-orange-400 transition"
                >
                    Habit Tracker
                </NavbarLink>

                <NavbarLink
                    as={Link}
                    to="/profile"
                    className="text-zinc-300 hover:text-orange-400 transition"
                >
                    Profile
                </NavbarLink>
            </NavbarCollapse>
        </Navbar>
    );
};