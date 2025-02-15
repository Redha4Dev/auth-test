import React from 'react'
import { useFormData } from './FormContext';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

function Step3() {
  const { formData, setFormData } = useFormData();
  console.log(formData);
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
        <div className='flex flex-col items-center p-4 gap-3'>
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
        <Button variant='link'>Resend Code</Button>
      <Button>Submit</Button>
        </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Step3