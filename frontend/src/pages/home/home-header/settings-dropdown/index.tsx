import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import {
  IoEllipsisVertical,
  IoLogoGithub,
  IoMoonOutline,
  IoPersonOutline,
} from "react-icons/io5";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

import { useAuthUser } from "../../../../hooks";

export function SettingsDropdown() {
  const user = useAuthUser();

  return (
    <Menu placement="bottom-end">
      <MenuButton
        as={IconButton}
        aria-label="Settings dropdown"
        icon={<IoEllipsisVertical />}
        variant="ghost"
      />
      <MenuList>
        <MenuItem as={Link} to="/login" icon={<IoPersonOutline size={16} />}>
          {user.isTemp ? "Sign In" : "Sign out"}
        </MenuItem>
        <MenuItem icon={<IoMoonOutline size={16} />}>Dark Mode</MenuItem>
        <MenuItem icon={<IoLogoGithub size={16} />}>About</MenuItem>
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
