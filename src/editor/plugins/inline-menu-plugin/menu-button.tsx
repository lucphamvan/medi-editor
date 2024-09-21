import { Center, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";

const Color = {
  icon: "#dcdfe6",
};

interface MenuButtonProps {
  icon: IconType;
  handleClick: () => void;
}

const MenuButton = ({ icon, handleClick }: MenuButtonProps) => {
  return (
    <Center rounded="sm">
      <Icon
        cursor="pointer"
        as={icon}
        fontSize={22}
        color={Color.icon}
        onClick={handleClick}
      />
    </Center>
  );
};

export default MenuButton;
