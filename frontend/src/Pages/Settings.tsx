import React, { useEffect, useState } from "react";
import { updatePassword } from "@/Services/api";
import { 
  SidebarInset,
  SidebarProvider, 
  SidebarTrigger 
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@radix-ui/react-separator";
import { getCurrentUser } from "@/Services/authService";
import { updateUserData } from "@/Services/authService";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Lock, 
  Bell, 
  Palette, 
  Shield,
  Mail
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

function Settings() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [adress, setAdress] = useState("");
  const [isLoading , setIsLoading] = useState(false);
  const [isUpdatingAccount , setIsUpdatingAccount] = useState(false);
  const [userID, setUserID] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePasswordResponseMessage, setChangePasswordResponseMessage] = useState("");
  const [updateAccountMessage, setUpdateAccountMessage] = useState("");
  
  const handleGetUser = async () => {
    try {
      const response = await getCurrentUser();
      console.log(response);
      setUsername(response.name);
      setEmail(response.email);
      setRole(response.role);
      setAdress(response.adress || "No adress");
      setUserID(response._id);
    } catch (error) {
      console.log(error);
    }
  };


  const handleUpdateAccount = async (e: any) => {
    e.preventDefault();
    setIsUpdatingAccount(true);
    setUpdateAccountMessage("");
    
    try {
      const updateData = { name: username, email: email, address: adress };
      
      const response = await updateUserData(updateData);
      setUpdateAccountMessage("Account updated successfully!");
      await handleGetUser();
    } catch (error:any) {
      console.log(error);
      setUpdateAccountMessage(error.message || "Failed to update account");
    } finally {
      setIsUpdatingAccount(false);
    }
  };


  const handleUpdatePassword = async (e:any) => {
            if (!userID) {
                setChangePasswordResponseMessage("User not authenticated");
                return;
            }
            
            setIsLoading(true);
            setChangePasswordResponseMessage("");
          e.preventDefault();
          setIsLoading(true);
          try {
              if (newPassword.length < 8) {
                setChangePasswordResponseMessage('Password must be at least 8 characters long');
                setIsLoading(false);
                return;
              }
  
              if (newPassword !== confirmPassword) {
                setChangePasswordResponseMessage('Passwords do not match');
                setIsLoading(false);
                return;
                }
              const res = await updatePassword(userID, currentPassword, newPassword, confirmPassword);
              setChangePasswordResponseMessage(res.message || 'Password reset successful');
          } catch (error) {
            console.log(error);
          } finally {
              setIsLoading(false);
          }
        };

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-xl font-semibold">Settings</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col my-3 p-4 pt-0">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="account" className="flex items-center gap-2">
                <User size={16} />
                <span className="hidden sm:inline">Account</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Lock size={16} />
                <span className="hidden sm:inline">Security</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell size={18} />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    Update your account details and personal information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                {updateAccountMessage && (
                                            <div className={`p-3 rounded ${updateAccountMessage.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {updateAccountMessage}
                                            </div>
                                         )
                }
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={username} onChange={(e) => setUsername(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" value={role} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adress">Adress</Label>
                    <Input id="adress" value={adress} onChange={(e) => setAdress(e.target.value)} />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleGetUser}>Cancel</Button>
                  <Button onClick={handleUpdateAccount} disabled={isUpdatingAccount}>
                    {isUpdatingAccount ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your password and security preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                {changePasswordResponseMessage && (<div className="p-3 bg-primary rounded">
                                         {changePasswordResponseMessage}
                                     </div>
                                    )
                }
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleUpdatePassword} disabled={isLoading} >
                    {isLoading ? "Updating..." : "Update Password"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Customize how you receive notifications.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive important updates via email.
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Messages</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications for new messages.
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Settings;