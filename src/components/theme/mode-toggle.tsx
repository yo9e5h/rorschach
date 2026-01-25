import { Check, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme/theme-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" title="Toggle theme">
          {theme === "system" ? (
            <Monitor />
          ) : (
            <>
              <Sun className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="flex flex-row items-center justify-between"
        >
          <div className="flex flex-row items-center gap-2">
            <Sun className="h-4 w-4" />
            <span>Light</span>
          </div>
          {theme === "light" && <Check className="text-green-600" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="flex flex-row items-center justify-between"
        >
          <div className="flex flex-row items-center gap-2">
            <Moon className="h-4 w-4" />
            <span>Dark</span>
          </div>
          {theme === "dark" && <Check className="text-green-600" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="flex flex-row items-center justify-between"
        >
          <div className="flex flex-row items-center gap-2">
            <Monitor className="h-4 w-4" />
            <span>System</span>
          </div>
          {theme === "system" && <Check className="text-green-600" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
