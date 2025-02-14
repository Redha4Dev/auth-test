import React from 'react'
import { useMultistepForm } from '../components/ui/useMultistepForm'
import Step1 from './Steps/Step1'
import Step2 from './Steps/Step2'
import Step3 from './Steps/Step3'
import { Button } from '@/components/ui/button'
import { School, Shield, User } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

function SignUp() {
  const {step , currentStepIndex , prevStep, nextStep} = useMultistepForm([<Step1 />, <Step2 />, <Step3 />])
  return (
    <div className='flex flex-col bg-muted items-center p-6 md:p-10 h-screen'>
      
      
      <div className='flex gap-4 rounded-2xl shadow-lg bg-[#f7f7f7] p-4'>
        <p>Step {currentStepIndex + 1} of 3</p>
        <div className='w-fit flex items-center justify-center'>
          <div className='flex min-w-52 items-center w-full rounded-2xl text-3xl'>
            <Button className='rounded-full z-10  p-2' variant='outline' disabled={currentStepIndex < 0}>
              <User/>
            </Button>
            <Progress  value={(currentStepIndex >= 1 ? 100 : 0 )}/>
            <Button className='rounded-full p-2 ' variant='outline' disabled={currentStepIndex < 1}>
              <School/>
            </Button>
            <Progress value={(currentStepIndex >= 2 ? 100 : 0 )}/>
            <Button className='rounded-full p-2' variant='outline' disabled={currentStepIndex < 2}>
              <Shield/>
            </Button>
          </div>
        </div>
      </div>
      {step}
      <div className='flex gap-4'>
        <Button variant='outline' onClick={prevStep} disabled={currentStepIndex === 0}>Back</Button>
        <Button onClick={nextStep} disabled={currentStepIndex === 3}>Next</Button>
      </div>
    </div>
  )
}

export default SignUp