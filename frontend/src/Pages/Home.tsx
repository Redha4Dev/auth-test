import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { logout } from "@/Services/authService";
import { useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { FormProvider } from "./Steps/FormContext";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="w-screen min-h-screen h-fit">
      <FormProvider>
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
          </main>
        </SidebarProvider>
      </FormProvider>
    </div>
  );
}

export default Home;
