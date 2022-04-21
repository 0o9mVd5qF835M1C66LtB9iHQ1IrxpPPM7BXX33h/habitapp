import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import {
  HiOutlineDotsVertical,
  HiOutlineMoon,
  HiOutlineUser,
} from "react-icons/hi";
import { GoMarkGithub } from "react-icons/go";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

import { useAuth, useAuthUser } from "../../../../hooks";

export function SettingsDropdown() {
  const user = useAuthUser();
  const { logout } = useAuth();

  return (
    <Menu placement="bottom-end">
      <MenuButton
        as={IconButton}
        aria-label="Settings dropdown"
        icon={<HiOutlineDotsVertical />}
        variant="ghost"
      />
      <MenuList>
        {user.isTemp ? (
          <MenuItem as={Link} to="/login" icon={<HiOutlineUser size={16} />}>
            Sign In
          </MenuItem>
        ) : (
          <MenuItem onClick={logout} icon={<HiOutlineUser size={16} />}>
            Sign out
          </MenuItem>
        )}
        <MenuItem icon={<HiOutlineMoon size={16} />}>Dark Mode</MenuItem>
        <MenuItem icon={<GoMarkGithub size={16} />}>About</MenuItem>
        <MenuItem
          as={Text}
          fontSize="sm"
          color="gray.500"
          _hover={{ backgroundColor: "initial" }}
        >
          © {dayjs().format("YYYY")} Oybek Alimatov
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
