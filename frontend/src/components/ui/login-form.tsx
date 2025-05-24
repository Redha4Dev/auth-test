import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import form from "../../assets/Email.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../Services/authService";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";  // Import useAuth to access global auth context

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();  // Use setUser to store user in global context
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await logIn({ email, password });
      console.log(response);
      navigate("/Dashboard");

      // Store the user data in the global context
      setUser(response.data.user);  // Update the global user state here
    } catch (error) {
      console.log("Login failed", error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleLogin} className="p-6 md:p-8">
            <div className="flex flex-col py-6 gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your Kindergarten account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="/ForgotPassword"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              
            </div>
          </form>
          <div className="relative hidden md:bg-violet-50 md:rounded-xl bg-muted md:block">
            <img
              src={form}
              alt="Image"
              className="absolute inset-0 my-auto w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-center text-sm text-muted-foreground">
        <p className="text-center">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-link underline-offset-4 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
