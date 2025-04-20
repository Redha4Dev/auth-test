import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

  


export function Reset() {
    return (
        <div className="flex flex-col justify-between items-center h-full m-0 bg-[]">
            <div className="mt-24">
                <Card className="min-w-[350px]">
                    <CardHeader>
                        <CardTitle>Reset Password</CardTitle>
                        <CardDescription>Enter your new account's associated password</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password1">New Password</Label>
                                    <Input type="password" id="password1" placeholder="Enter your new password" />
                                </div>
                            </div>
                            <div className="grid w-full items-center gap-4 mt-5">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password2">Confirme password</Label>
                                    <Input type="password" id="password2" placeholder="Re-Enter the new password" />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button>Reset Password</Button>
                    </CardFooter>
                </Card>
            </div>

            <div className="text-balance text-center text-xs text-muted-foreground mb-4 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    );
}
