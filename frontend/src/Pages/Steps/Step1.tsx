import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormData } from "./FormContext";

function Step1() {
  const { formData, setFormData } = useFormData();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Personal Informations</CardTitle>
        <CardDescription>
          Enter your Informations below to create a new account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              placeholder="m@example.com"
              required
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="Username">Username</Label>
            <Input
              id="Username"
              name="username"
              type="text"
              value={formData.username}
              placeholder="User_1234"
              required
              onChange={handleChange}
            />
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                name="password"
                value={formData.password}
                type="password"
                required
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="Confirme-password">Confirme Password</Label>
              </div>
              <Input
                id="Confirme-password"
                name="confirmPassword"
                onChange={handleChange}
                value={formData.confirmPassword}
                type="password"
                required
              />
            </div>
          </div>
          <p className="text-red">
            {formData.password === formData.confirmPassword
              ? ""
              : "The passwords should be the SAME!!"}
          </p>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="">Your Gendre</Label>
            </div>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Gendre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Bird">Bird</SelectItem>
                <SelectItem value="Mouad">Mouad</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-violet-600 hover:underline">
            Log In
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default Step1;
