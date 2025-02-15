import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { Link } from 'react-router-dom'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useFormData } from './FormContext'


function Step2() {
  const {formData} = useFormData();
  console.log(formData)
  return (
    <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Kindergarten Informations</CardTitle>
          <CardDescription>
            You can edit this later
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col gap-3">
              <div className="grid gap-2">
                <Label htmlFor="Kindergarten_Name">Name</Label>
                <Input
                  id="Kindergarten_Name"
                  type="text"
                  placeholder="Kindergarten Name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="Adress">Adress</Label>
                <Input
                  id="Adress"
                  type="adress"
                  placeholder=""
                  required
                />
              </div>
              
                <div className='grid gap-2'>
                  <div className="flex items-center">
                    <Label htmlFor="Key">Secrete Key</Label>
                  </div>
                  <Input id="Key" type="text" required />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="picture">Documents</Label>
                  <Input id="picture" type="file" required/>
                </div>
              <div className='grid gap-2'>
                  <div className="flex items-center">
                    <Label htmlFor="">Special Needs Includes ?</Label>
                  </div>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="special needs" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">No</SelectItem>
                      <SelectItem value="Female">Only</SelectItem>
                      <SelectItem value="Bird">Both</SelectItem>
                      <SelectItem value="Mouad">Mouad</SelectItem>
                    </SelectContent>
                  </Select>

              </div>
              
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-violet-600 hover:underline">Log In</Link>
            </div>
        </CardContent>
      </Card>
  )
}

export default Step2