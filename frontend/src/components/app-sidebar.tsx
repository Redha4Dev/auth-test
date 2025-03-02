import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { logout } from "@/Services/authService";
import { Calendar, ChartBar, CookieIcon, DoorOpen, Home, Inbox, Layers, LogOut, PersonStanding, User } from "lucide-react";
import { useFormData } from "@/Pages/Steps/FormContext";

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
                className="flex items-center justify-start"
              >
                {route.icon}
                <span className="ml-2">{route.name}</span>
              </Button>
            </li>
          ))}
        </ul>
      </SidebarContent>  
      <SidebarFooter>
        <div className="flex items-center">
          <div>
            <h1 className="text-2xl font-bold">{formData.username}</h1>
            <p className="text-balance text-muted-foreground">
              {formData.email}
            </p>
          </div>
        </div>
        <ul className="mx-auto space-y-2">
          <li>
            <Button variant="link" onClick={Logout}>
              <LogOut/>
              <span className="ml-2">{open == true ? "Logout" : ""}</span>
            </Button>
          </li>
        </ul>
      </SidebarFooter>
    </Sidebar>
  );
}
