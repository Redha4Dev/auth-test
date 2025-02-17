import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { logout } from "@/Services/authService";
import { DoorOpen } from "lucide-react";
import { useFormData } from "@/Pages/Steps/FormContext";

export function AppSidebar() {
  const navigate = useNavigate();
  const Logout = async () => {
    try {
      await logout();
      navigate("/Login");
    } catch (error) {
      console.log("Logout failed", error);
    }
  };
  const { formData } = useFormData();
  return (
    <Sidebar>
      <SidebarHeader className="text-center">
        <h1 className="font-semibold ">Kindergarten</h1>
        <hr className="border-gray-300" />
      </SidebarHeader>
      <SidebarContent />
      <SidebarFooter>
        <div className="flex items-center">
          <div>
            <h1 className="text-2xl font-bold">{formData.username}</h1>
            <p className="text-balance text-muted-foreground">
              {formData.email}
            </p>
          </div>
        </div>
        <Button variant="link" onClick={Logout}>
          {" "}
          <DoorOpen /> Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
