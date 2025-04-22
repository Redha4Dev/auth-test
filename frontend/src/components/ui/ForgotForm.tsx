import React , {useState} from 'react'
import axios from 'axios'
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
import { ForgotPassword } from '@/Services/api'

  


export function Forgot() {
    const [email , setEmail] = useState('')
    const [message , setMessage] = useState('')
    const handleForgotPassword = async () => {
        try {
          ForgotPassword(email);
        } catch (err) {
          setMessage(err.response?.data?.message || 'Something went wrong.');
          console.log('bad')
        }
      };

    return (
        <div className="flex flex-col justify-between items-center h-full m-0 bg-[]">
            <div className="mt-24">
                <Card className="min-w-[350px]">
                    <CardHeader>
                        <CardTitle>Forgot Password</CardTitle>
                        <CardDescription>Enter account associated email</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input type="email" id="email" placeholder="Your used email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button onClick={handleForgotPassword}>Send Reset Link</Button>
                      <p> {message} </p>
                    </CardFooter>
                </Card>
            </div>

            <div className="text-balance text-center text-xs text-muted-foreground mb-4 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    );
}
