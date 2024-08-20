import { IconType } from "react-icons";
import { FlexProps, BoxProps } from "@chakra-ui/react";

// Interface for link items in the sidebar
export interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}

// Interface for NavItem component props
export interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
  href: string;
  isActive?: boolean;
<<<<<<< HEAD
  onClose?: () => void;
=======
  onClose: () => void;
>>>>>>> d3d538c7d0f72827f8e88f61303532d1344b6de3
}

// Interface for SidebarContent component props
export interface SidebarProps extends BoxProps {
  onClose: () => void;
  activeNav: string;
}