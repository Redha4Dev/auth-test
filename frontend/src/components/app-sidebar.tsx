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
import { logout } from "@/Services/authService";
import { Calendar, ChartBar, ChevronUpSquare, CookieIcon, DoorOpen, Ghost, Home, Inbox, Layers, LogOut, PersonStanding, User, User2 } from "lucide-react";
import { useFormData } from "@/Pages/Steps/FormContext";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent } from "./ui/dropdown-menu";

export function AppSidebar() {
  const navigate = useNavigate();
  const {open} = useSidebar();
  const Logout = async () => {
    try {
      await logout();
      navigate("/Login");
    } catch (error) {
      console.log("Logout failed", error);
    }
  };
  const { formData } = useFormData();
  const Routes = [
    {
      name: "Dashboard",
      icon: <Home/>,
    },
    {
      name: "Analyse",
      icon: <ChartBar/>,
    },
    {
      name: "Users",
      icon: <User/>,
    },
    {
      name: "Meals",
      icon: <CookieIcon/>,
    },
    {
      name: "Time Manage",
      icon: <Calendar/>,
    },
    {
      name: "Inbox",
      icon: <Inbox/>,
    },
  ]
  return (
    <Sidebar collapsible="icon" >
      <SidebarHeader className="text-center">
        <h1 className="font-semibold mx-auto "><Layers/></h1>
        <hr className="border-gray-300" />
      </SidebarHeader>
      <SidebarContent>
        <ul className="mx-auto space-y-2">
          {Routes.map((route, index) => (
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
        </ul>
      </SidebarContent>  
      <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> Username
                    <ChevronUpSquare className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  
                  <DropdownMenuItem>
                  <Button className="w-full" variant='ghost'>
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
