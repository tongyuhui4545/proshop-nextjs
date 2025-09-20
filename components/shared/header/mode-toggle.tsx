"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

const ModeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>

      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};

export default ModeToggle;
