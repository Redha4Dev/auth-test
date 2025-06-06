import { Separator } from "@/components/ui/separator";
import { getKid, getParent } from "@/Services/api";
import { ChevronLeft } from "lucide-react";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

function ParentProfile() {
  const { id, name } = useParams();
  interface Profile {
    gender: string;
    age?: number;
    parent?: string;
    school?: string;
    code?: string;
  }

  const [profile, setProfile] = useState<Profile>({});

  const handleGetParentProfile = async () => {
    try {
      const ParentProfile = await getParent(name, id);
      console.log(ParentProfile);
      setProfile(ParentProfile.PARENT);
      console.log(ParentProfile.PARENT);

    } catch (error) {
      console.error("Error fetching kid profile:", error);
    }
  };

  React.useEffect(() => {
    handleGetParentProfile();
  }, []);

  const firstLetter = name?.[0]?.toUpperCase() || "";

  return (
    <div className="w-full p-4 h-fit min-h-screen">
      <header className="flex items-center w-full gap-3">
        <Link to={`/Users/Parents`} className="flex">
          <ChevronLeft /> Back
        </Link>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1>{name}'s Profile</h1>
      </header>

      <div className="flex flex-col min-w-[70%] w-fit  mt-3 bg-[#f4f4f4] rounded-xl shadow-md mx-auto">
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
        <div className="flex flex-col   gap-4 items-center">
          <h1 className="text-2xl font-semibold">Hi, I'm {name} 👋</h1>
        </div>
        <div className="flex flex-col w-[95%] mx-auto rounded-lg my-2 gap-4 p-4  bg-[#a075eb4a]">
          <h1 className="font-semibold text-[#a075eb9e] text-3xl jomhuria-regular">
            General Infomation :
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-3 w-full bg-[#a075eb4a] items rounded-lg p-4">
              <h1 className="font-semibold text-[#a075ebc2] jomhuria-regular text-2xl">
                Name:
              </h1>
              <p className="text-sm font-medium">{name}</p>
            </div>
            <div className="flex gap-3 w-full bg-[#a075eb4a] items rounded-lg p-4">
              <h1 className="font-semibold text-[#a075ebc2] jomhuria-regular text-2xl">
                Email:
              </h1>
              <p className="text-sm font-medium">{profile.email}</p>
            </div>
            <div className="flex gap-3 w-full bg-[#a075eb4a] items rounded-lg p-4">
              <h1 className="font-semibold text-[#a075ebc2] jomhuria-regular text-2xl">
                Gender:
              </h1>
              <p className="text-sm font-medium">{profile.gender}</p>
            </div>
            <div className="flex gap-3 w-full bg-[#a075eb4a] items rounded-lg p-4">
              <h1 className="font-semibold text-[#a075ebc2] jomhuria-regular text-2xl">
                Parent:
              </h1>
              <p className="text-sm font-medium">{profile.parent}</p>
            </div>
            <div className="flex gap-3 w-full bg-[#a075eb4a] items rounded-lg p-4">
              <h1 className="font-semibold text-[#a075ebc2] jomhuria-regular text-2xl">
                School:
              </h1>
              <p className="text-sm font-medium">{profile.school}</p>
            </div>
            <div className="flex gap-3 w-full bg-[#a075eb4a] items rounded-lg p-4">
              <h1 className="font-semibold text-[#a075ebc2] jomhuria-regular text-2xl">
                id:
              </h1>
              <p className="text-sm font-medium">{id}</p>
            </div>
            <div className="flex gap-3 w-full bg-[#a075eb4a] items rounded-lg p-4">
              <h1 className="font-semibold text-[#a075ebc2] jomhuria-regular text-2xl">
                Code:
              </h1>
              <p className="text-sm font-medium">{profile.code}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParentProfile;
