import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "@/Services/authService";
import {
  Calendar,
  ChartBar,
  ChevronUpSquare,
  ChevronDown,
  ChevronRight,
  CookieIcon,
  Home,
  Inbox,
  Layers,
  LogOut,
  User2,
  Users,
} from "lucide-react";
import { useFormData } from "@/Pages/Steps/FormContext";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "./ui/dropdown-menu";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "@/context/AuthContext";


export function AppSidebar() {
  const navigate = useNavigate();
  const { open } = useSidebar();
  const [usersOpen, setUsersOpen] = useState(false);
  const [username , setUsername] = useState("Username");
  const [role, setRole] = useState("parent")
  const handleGetUser = async () => {
    try {
      const reponse = await getCurrentUser();
      console.log(reponse);
      setUsername(reponse.name);
      setRole(reponse.role);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetUser();
  }, []);
  
  const Logout = async () => {
    try {
      await logout();
      navigate("/Login");
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  const getFilteredRoutes = () => {
    const allRoutes = [
      { name: "Dashboard", icon: <Home />, roles: ["admin", "teacher", "parent"] },
      { name: "Analyse", icon: <ChartBar />, roles: ["admin", "teacher"] },
      { name: "Meals", icon: <CookieIcon />, roles: ["admin", "parent", "teacher"] },
      { name: "Scheduling", icon: <Calendar />, roles: ["admin", "parent", "teacher"] },
      { name: "Inbox", icon: <Inbox />, roles: ["admin", "parent", "teacher"] },
    ];
  
    return allRoutes.filter(route => route.roles.includes(role));
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="text-center">
        <h1 className="font-semibold mx-auto "><Layers /></h1>
        <hr className="border-gray-300" />
      </SidebarHeader>
      <SidebarContent>
        <ul className="mx-auto space-y-2">
          {getFilteredRoutes().map((route, index) => (
            <li key={index}>
              <Button
                variant="ghost"
                onClick={() => navigate(`/${route.name}`)}
                className="flex items-center w-full justify-start"
              >
                {route.icon}
                <span className="ml-2">{route.name}</span>
              </Button>
            </li>
          ))}
          <li>
            <Button
              variant="ghost"
              onClick={() => setUsersOpen(!usersOpen)}
              className="flex items-center w-full justify-start"
            >
              <Users />
              <span className="ml-2">Users</span>
              {usersOpen ? <ChevronDown className="ml-auto" /> : <ChevronRight className="ml-auto" />}
            </Button>
            {usersOpen && (
              <ul className="ml-6 space-y-2">
                <li>
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/Users/Parents")}
                    className="flex items-center w-full justify-start"
                  >
                    <User2 />
                    <span className="ml-2">Parents</span>
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/Users/Kids")}
                    className="flex items-center w-full justify-start"
                  >
                    <User2 />
                    <span className="ml-2">Kids</span>
                  </Button>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> { username }
                  <ChevronUpSquare className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <Button className="w-full" variant='ghost' onClick={() => navigate("/settings")}>
                    Settings
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button onClick={Logout} className="w-full" variant='ghost'>
                    SignOut
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
