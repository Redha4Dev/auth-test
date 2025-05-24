import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function EmailVerification() {
    const navigate = useNavigate();
    return(
        <div className="flex justify-center items-center h-screen">
            <Card className="min-w-[350px]">
            <CardHeader>
            <CardTitle>Email Verificated</CardTitle>
            <CardDescription className="font-bold">Thanks for verifing your email . enjoy your experience using our service</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={()=>navigate('/login')} className="border-none shadow-none hover:bg-inherit hover:text-purple-700 hover:underline text-purple-700">log in and enjoy </Button>
            </CardFooter>
        </Card>
      </div>
    )
}

