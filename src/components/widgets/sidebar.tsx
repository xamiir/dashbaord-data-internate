import {
  Link,
  matchPath,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  LayoutDashboardIcon,
  XIcon,
  BellIcon,
  Users2,
  MenuIcon,
  Shield,
  MapIcon,
  Bike,
  UserCheck,
  CreditCard,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PATHS } from "@/routers/paths";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../ui/toggle-mode";
import React, { useState } from "react";
import { Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import Assets from "@/assets";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useStores } from "@/models/helpers";
import { observer } from "mobx-react-lite";
import { useTheme } from "next-themes";

const mapIcons = (icon: string) => {
  switch (icon) {
    case "dashboard":
      return <LayoutDashboardIcon className="mr-3 h-5 w-5" />;
    case "users":
      return <Users2 className="mr-3 h-5 w-5" />;
    case "shield":
      return <CreditCard className="mr-3 h-5 w-5" />;
    case "countries":
      return <MapIcon className="mr-3 h-5 w-5" />;
    case "settings":
      return <Bike className="mr-3 h-5 w-5" />;
    case "drivers":
      return <UserCheck className="mr-3 h-5 w-5" />;
    default:
      return <LayoutDashboardIcon className="mr-3 h-5 w-5" />;
  }
};

export const Sidebar = observer(function Sidebar() {
  const {
    authStore: { logout },
  } = useStores();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleSidebarCollapse = () => setSidebarCollapsed(!sidebarCollapsed);

  const navigate = useNavigate();

  const location = useLocation();

  function getActive(path: string) {
    return path
      ? !!matchPath({ path: path, end: false }, location.pathname)
      : false;
  }

  const menuItems = [
    { path: PATHS.Overview.app, icon: "dashboard", subject: "Dashboard" },
    { path: PATHS.Overview.users.root, icon: "users", subject: "Users" },
    { path: PATHS.Overview.owners.root, icon: "users", subject: "Owners" },
    { path: PATHS.Overview.drivers.root, icon: "drivers", subject: "Drivers" },
    {
      path: PATHS.Overview.motorcycles.root,
      icon: "settings",
      subject: "Motorcycles",
    },
  ];

  return (
    <main className="flex h-screen bg-background">
      <aside
        className={cn(
          "fixed inset-y-0 border-r left-0 z-50 transition-all duration-300 ease-in-out md:relative shadow-xl flex flex-col",
          "border-gray-200 bg-gradient-to-b from-white to-gray-50 dark:border-gray-700 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800",
          sidebarCollapsed ? "w-16" : "w-72",
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="p-4 md:p-8">
          <div className="flex items-center justify-between mb-10">
            <div
              className={cn(
                "flex items-center space-x-3",
                sidebarCollapsed && "md:justify-center"
              )}
            >
              <img
                src={Assets.logo}
                alt="logo"
                className="w-8 h-8 md:w-12 md:h-12 rounded-xl shadow-md"
              />
              {!sidebarCollapsed && (
                <div className="hidden md:block">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">
                    Motorcycle
                  </h2>
                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                    Management System
                  </p>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={toggleSidebarCollapse}
              >
                {sidebarCollapsed ? (
                  <ChevronRight className="h-5 w-5" />
                ) : (
                  <ChevronLeft className="h-5 w-5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={toggleSidebar}
              >
                <XIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <nav className="space-y-3">
            {menuItems.map((menu) => (
              <Link
                key={menu.path}
                to={menu.path}
                onClick={() => {
                  setSidebarOpen(false);
                }}
              >
                <Button
                  variant={getActive(menu.path) ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start capitalize h-12 text-left font-medium transition-all duration-200 hover:bg-gray-50 hover:shadow-sm dark:hover:bg-gray-700 dark:hover:shadow-sm",
                    sidebarCollapsed && "md:justify-center md:px-0",
                    getActive(menu.path)
                      ? "bg-blue-50 text-blue-700 border border-blue-200 shadow-sm dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700"
                      : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                  )}
                >
                  {mapIcons(menu.icon)}
                  {!sidebarCollapsed && menu.subject}
                </Button>
              </Link>
            ))}
          </nav>
        </div>

        <div
          className={cn(
            "mt-auto border-t border-gray-200 dark:border-gray-700",
            sidebarCollapsed ? "p-4" : "p-8"
          )}
        >
          <div className="text-center">
            {!sidebarCollapsed && (
              <>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Motorcycle v1.0.0
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  © 2024 All rights reserved
                </p>
              </>
            )}
            {sidebarCollapsed && (
              <p className="text-xs text-gray-500 dark:text-gray-400">v1.0.0</p>
            )}
          </div>
        </div>
      </aside>

      <div
        className={cn(
          "flex-1 overflow-auto transition-all duration-300",
          sidebarCollapsed ? "md:ml-16" : "md:ml-0"
        )}
      >
        <header className="sticky top-0 z-40 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 flex items-center justify-between p-6 shadow-sm">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 md:hidden"
              onClick={toggleSidebar}
            >
              <MenuIcon className="h-6 w-6" />
            </Button>
          </div>
          <div className="gap-4 flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <img
                    src={Assets.logo}
                    width={36}
                    height={36}
                    alt="Avatar"
                    className="overflow-hidden rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ModeToggle />

            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                navigate(PATHS.Auth.login);
                setSidebarOpen(false);
              }}
            >
              <BellIcon className="h-4 w-4" />
            </Button>
          </div>
        </header>
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </div>
    </main>
  );
});
