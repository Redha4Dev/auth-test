import { Separator } from "@/components/ui/separator";
import { getTeacher } from "@/Services/api";
import { updateTeacherInfos } from "@/Services/authService";
import { ChevronLeft, Edit2, Save, X } from "lucide-react";
import React, { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

export default function EditTeacherPage() {
  const { id, name } = useParams();
  const [profile, setProfile] = React.useState({});
  const [searchParam, setSearchParam] = useSearchParams();
  const navigate = useNavigate();

  const handleGetTeacherProfile = async () => {
    console.log(name, id);
    try {
      const teacherData = await getTeacher(name, id);
      console.log(teacherData);
      setProfile(teacherData.teacher);
    } catch (error) {
      console.error("Error fetching teacher profile:", error);
    }
  };

  React.useEffect(() => {
    handleGetTeacherProfile();
  }, []);

  const isEditMode = searchParam.get('edit');
  
  function toggleEditMode() {
    setSearchParam({ edit: '1' });
  }
  
  function handleCancel() {
    handleGetTeacherProfile();
    navigate(-1);
  }

  const handleSave = async () => {
    try {
      const updateData = {
        _id: profile._id,
        name: profile.name,
        email: profile.email,
        gender: profile.gender,
        subject: profile.subject,
        school: profile.school,
        code: profile.code,
      };

      console.log('Sending update data:', updateData);
      const response = await updateTeacherInfos(updateData);
      console.log('Received response:', response);

      // Handle the actual response format from your backend
      if (response && response.user) {
        // Backend returns { user: updatedUser }
        setProfile(response.user);
        setSearchParam({});
        alert('Profile updated successfully!');
      } else if (response) {
        // Any other successful response
        setSearchParam({});
        alert('Profile updated successfully!');
        await handleGetTeacherProfile(); // Refresh the data
      } else {
        throw new Error('No response received');
      }
    } catch (error) {
      console.error('Error updating teacher profile:', error);
      alert('Failed to update profile. Please try again.');
      await handleGetTeacherProfile();
    }
  };

  function handleInputChange(field: string, value: string) {
    setProfile({ ...profile, [field]: value });
  }

  const saving = false;
  const firstLetter = name?.[0]?.toUpperCase() || "";

  return (
    <div className="w-full p-4 h-fit min-h-screen">
      <header className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <Link to={`/Users/Teachers`} className="flex">
            <ChevronLeft /> Back
          </Link>
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1>{profile.name || name}'s Profile</h1>
        </div>

        {!isEditMode ? (
          <Button onClick={toggleEditMode} variant="outline" size="sm">
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleCancel} variant="outline" size="sm">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave} size="sm" disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        )}
      </header>

      <div className="flex flex-col min-w-[70%] w-fit mt-3 bg-[#f4f4f4] rounded-xl shadow-md mx-auto">
        <div className="w-full flex items-center justify-center bg-[length:100%_60%] bg-no-repeat bg-top h-32 bg-gradient-to-r from-[#a075eb] to-[#e4d3f1] rounded-t-xl">
          <div
            className={`flex items-center justify-center w-20 h-20 rounded-full text-white text-4xl font-bold
              ${
                profile.gender === "Male"
                  ? "bg-blue-500"
                  : profile.gender === "Female"
                  ? "bg-pink-500"
                  : "bg-gray-400"
              }`}
          >
            {firstLetter}
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-2xl font-semibold">Hi, I'm {profile.name || name} 👋</h1>
        </div>

        <div className="flex flex-col w-[95%] mx-auto rounded-lg my-2 gap-4 p-4 bg-[#a075eb4a]">
          <h1 className="font-semibold text-[#a075eb9e] text-3xl jomhuria-regular">
            General Information:
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-3 w-full bg-[#a075eb4a] items-center rounded-lg p-4">
              <h1 className="font-semibold text-white jomhuria-regular text-2xl min-w-fit">Name:</h1>
              {isEditMode ? (
                <Input
                  value={profile.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="bg-transparent"
                />
              ) : (
                <p className="text-sm font-medium">{profile.name}</p>
              )}
            </div>

            <div className="flex gap-3 w-full bg-[#a075eb4a] items-center rounded-lg p-4">
              <h1 className="font-semibold text-white jomhuria-regular text-2xl min-w-fit">Email:</h1>
              {isEditMode ? (
                <Input
                  type="email"
                  value={profile.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-transparent"
                />
              ) : (
                <p className="text-sm font-medium">{profile.email}</p>
              )}
            </div>

            <div className="flex gap-3 w-full bg-[#a075eb4a] items-center rounded-lg p-4">
              <h1 className="font-semibold text-white jomhuria-regular text-2xl min-w-fit">Gender:</h1>
              {isEditMode ? (
                <Select
                  value={profile.gender || ""}
                  onValueChange={(value) => handleInputChange("gender", value)}
                >
                  <SelectTrigger className="bg-transparent">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm font-medium">{profile.gender}</p>
              )}
            </div>

            <div className="flex gap-3 w-full bg-[#a075eb4a] items-center rounded-lg p-4">
              <h1 className="font-semibold text-white jomhuria-regular text-2xl min-w-fit">Subject:</h1>
              {isEditMode ? (
                <Input
                  value={profile.subject || ""}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  className="bg-transparent"
                />
              ) : (
                <p className="text-sm font-medium">{profile.subject}</p>
              )}
            </div>

            <div className="flex gap-3 w-full bg-[#a075eb4a] items-center rounded-lg p-4">
              <h1 className="font-semibold text-white jomhuria-regular text-2xl min-w-fit">School:</h1>
              {isEditMode ? (
                <Input
                  value={profile.school || ""}
                  onChange={(e) => handleInputChange("school", e.target.value)}
                  className="bg-transparent"
                />
              ) : (
                <p className="text-sm font-medium">{profile.school}</p>
              )}
            </div>

            <div className="flex gap-3 w-full bg-[#a075eb4a] items-center rounded-lg p-4">
              <h1 className="font-semibold text-white jomhuria-regular text-2xl min-w-fit">Code:</h1>
              {isEditMode ? (
                <Input
                  value={profile.code || ""}
                  onChange={(e) => handleInputChange("code", e.target.value)}
                  className="bg-transparent"
                />
              ) : (
                <p className="text-sm font-medium">{profile.code}</p>
              )}
            </div>

            <div className="flex gap-3 w-full bg-[#a075eb4a] items-center rounded-lg p-4">
              <h1 className="font-semibold text-white jomhuria-regular text-2xl min-w-fit">ID:</h1>
              <Input value={profile._id || id} readOnly />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}