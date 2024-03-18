"use client";

import React from "react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UploadIcon } from "@/icons/UploadIcon";

const SettingCard = () => {
  const [isFollowed, setIsFollowed] = React.useState(false);
  const [value, onChange] = useState(new Date());

  return (
    <>
      <div className="min-h-screen border border-gray-200 rounded-lg p-10 text-lg">
        {/* Profile image */}
        <Label className="text-lg">Your profile picture</Label>
        <div className="flex items-center justify-center mt-1 border-2 border-gray-600 rounded-lg border-dashed bg-inputbackground h-32 w-32">
        <UploadIcon/>
        </div>
        <Input id="picture" type="file" className='max-w-xs bg-inputbackground mt-4 ' />
        <Separator className="my-6"></Separator>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <Label className="text-lg">Full name</Label>
            <Input
              className="py-6 px-3 bg-inputbackground"
              placeholder="Please enter your full name"
            />
          </div>
          <div>
            <Label className="text-lg">Email</Label>
            <Input
              className="py-6 px-3 bg-inputbackground"
              placeholder="Please enter your full name"
            />
          </div>
          <div>
            <Label className="text-lg">Username</Label>
            <Input
              className="py-6 px-3 bg-inputbackground"
              placeholder="Please enter your full name"
            />
          </div>
          <div>
            <Label className="text-lg">Phone number (optional)</Label>
            <Input
              className="py-6 px-3 bg-inputbackground"
              placeholder="Please enter your full name"
            />
          </div>
        </div>
        <div className="mt-6">
          <Label className="text-lg">Bio</Label>
          <Textarea
            className="sm:h-40 bg-inputbackground"
            placeholder="Write your Bio here e.g your hobbies, interests ETC"
          />
        </div>

        <div className="mt-6">
          <Label className="text-lg">Awards/Recognitions</Label>
          <Textarea
            className="sm:h-24 bg-inputbackground"
            placeholder="Notable awards and recognitions you want to mention"
          />
        </div>

        <div>
          <Button
            size="xl"
            className="bg-blue hover:bg-darkblue text-lg rounded-lg mt-6"
            type="submit"
          >
            Update Profile
          </Button>
        </div>
      </div>
    </>
  );
};

export default SettingCard;