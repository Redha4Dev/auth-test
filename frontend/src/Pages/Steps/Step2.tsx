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
  const { formData, setFormData } = useFormData();

  // Handle text input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      Kindergarten: {
        ...formData.Kindergarten,
        [e.target.name]: e.target.value
      }
    });
  };

  // Handle select changes separately
  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      Kindergarten: {
        ...formData.Kindergarten,
        SpecialNeeds: value
      }
    });
  };

  console.log(formData);

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
              name="Name"
              placeholder="Kindergarten Name"
              required
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="Adress">Address</Label>
            <Input
              id="Adress"
              type="text"
              name="Adress"
              placeholder="Kindergarten Address"
              required
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="Key">Secret Key</Label>
            <Input
              id="Key"
              name="Key"
              type="text"
              required
              onChange={handleChange}
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Documents</Label>
            <Input id="picture" name="Picture" type="file" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="special-needs">Special Needs Includes?</Label>
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="No">No</SelectItem>
                <SelectItem value="Only">Only</SelectItem>
                <SelectItem value="Both">Both</SelectItem>
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

export default Step2;
