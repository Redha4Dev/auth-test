import React , {useState} from 'react'
import axios from 'axios'
import { useParams , useNavigate } from 'react-router-dom'
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
import { resetPassword } from '@/Services/api'

  


export function Reset() {
    const [password , setPassword] = useState('');
    const [confirmPassword , setConfirmPassword] = useState('');
    const [message , setMessage] = useState('');
    const [isLoading , setIsLoading] = useState(false);
    const { token } = useParams();
    const navigate = useNavigate();

    const handleReset = async (e:any) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (password.length < 8) {
                setMessage('Password must be at least 8 characters long');
                setIsLoading(false);
                return;
            }

            if (password !== confirmPassword) {
                setMessage('Passwords do not match');
                setIsLoading(false);
                return;
              }
            console.log('first step done')
            const res = await resetPassword(token, password, confirmPassword);
            console.log('second step done')
            setMessage(res.data.message || 'Password reset successful');
            console.log('third step done')
        //   navigate('/login');
        } catch (error) {
          console.error(error);
        //   setMessage('Something went wrong'); need to look up later
        } finally {
            setIsLoading(false);
        }
      };
    return (
        <div className="flex flex-col justify-between items-center h-full m-0 bg-[]">
            <div className="mt-24">
                <Card className="min-w-[350px]">
                    <CardHeader>
                        <CardTitle>Reset Password</CardTitle>
                        <CardDescription>Enter your new account's associated password</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleReset}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password1">New Password</Label>
                                    <Input type="password" id="password1" placeholder="Enter your new password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </div>
                            <div className="grid w-full items-center gap-4 mt-5">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password2">Confirme password</Label>
                                    <Input type="password" id="password2" placeholder="Re-Enter the new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>
                            </div>
                            {message && <p className={`mt-4 text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
                            <CardFooter className="flex justify-between p-0">
                                <Button type='submit' disabled={isLoading} className='mt-6'> {isLoading ? 'Resetting...' : 'Reset Password'} </Button>
                            </CardFooter>
                        </form>
                    </CardContent>
                    
                </Card>
            </div>

            <div className="text-balance text-center text-xs text-muted-foreground mb-4 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    );
}
