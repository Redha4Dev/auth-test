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
  const handleSignUp = async (e:any) => {
    e.preventDefault();
    const name = formData.username;
    const email = formData.email;
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;
    const role = "admin";
    const kids = [];
    const gender = formData.gender;

    try {
      await signUpAdmin({
        name,
        email,
        password,
        confirmPassword,
        role,
        kids,
        gender,
      });
      navigate("/");
    } catch (error) {
      console.log("Sign Up failed", error);
    }
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Account Confomation</CardTitle>
          <CardDescription>
            Press submit to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center p-4 gap-3">
            <h1>Create your account</h1>
            <Button onClick={handleSignUp}>Submit</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Step3;
