import { useFormData } from "./FormContext";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signUpAdmin } from "@/Services/authService";
import { useNavigate } from "react-router-dom";

function Step3() {
  const { formData } = useFormData();
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    const name = formData.username;
    const email = formData.email;
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    try {
      await signUpAdmin({
        name,
        email,
        password,
        confirmPassword,
        admin: String,
      });
      navigate("/");
    } catch (error) {
      console.log("Login failed", error);
    }
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Account Confomation</CardTitle>
          <CardDescription>
            You will receive a code to your email to confirm your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center p-4 gap-3">
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <Button variant="link">Resend Code</Button>
            <Button onClick={handleSignUp}>Submit</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Step3;
