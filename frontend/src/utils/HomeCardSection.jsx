"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaStar } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import BookModal from "./BookModal";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Toggle } from "@/components/ui/toggle";
import KeywordBar from "@/utils/KeywordBar";
import { dataset, list } from "@/dummy_api/dataSet";
import Image from "next/image";
import pic4 from "../../images/pic4.gif";
import pic5 from "../../images/pic6.jpg";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/contexts/user-context";
import {
  CreateBookmark,
  getImageUrl,
  isUserValid,
  login,
  Signup,
  SignupGoogle,
} from "../../../backend/src/pocketbase";
import { useToast } from "@/components/ui/use-toast";
import { EmptyBookmarkIcon } from "@/icons/EmptyBookmarkIcon";

const HomeCardSection = () => {
  const { mentors, isLoading } = useUser();
  const { toast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmark, setBookmark] = useState([]);

  const handleBookmarkToggle = (mentor) => {
    if (!isUserValid) {
      return <LoginDialog />
    }

    CreateBookmark(
      mentor.avatar,
      mentor.username,
      mentor.rate,
      mentor.bio,
      mentor.awards,
      mentor.interests,
      mentor.rating
    )
      .then(() => {
        toast({
          title: "Added to bookmarks",
          description: "Added to bookmarks successfully!",
          variant: "default",
        });
      })
      .catch((error) => {
        toast({
          title: "Failed to add to bookmarks",
          description: "An error occurred while adding to bookmarks.",
          variant: "destructive",
        });
        console.error("Bookmark addition error:", error);
      });

    // toggle functionality incase  we need it
    // if (isBookmarked && bookmark.length > 0) {
    //   // Check if bookmark is not empty
    //   RemoveBookmark(bookmark[0].id)
    //     .then(() => {
    //       toast({
    //         title: "Removed from bookmarks",
    //         description: "Removed from bookmarks successfully!",
    //         variant: "default",
    //       });
    //       setIsBookmarked(false); // Update state to reflect removal
    //     })
    //     .catch((error) => {
    //       toast({
    //         title: "Failed to remove from bookmarks",
    //         description: "An error occurred while removing from bookmarks.",
    //         variant: "destructive",
    //       });
    //       console.error("Bookmark removal error:", error);
    //     });
    // } else {
    //   CreateBookmark(
    //     mentors[0].fullName,
    //     mentors[0].username,
    //     mentors[0].phoneNumber,
    //     mentors[0].bio,
    //     mentors[0].awards,
    //     mentors[0].businessName,
    //     mentors[0].contact,
    //     mentors[0].account
    //   )
    //     .then(() => {
    //       toast({
    //         title: "Added to bookmarks",
    //         description: "Added to bookmarks successfully!",
    //         variant: "default",
    //       });
    //       setIsBookmarked(true);
    //     })
    //     .catch((error) => {
    //       toast({
    //         title: "Failed to add to bookmarks",
    //         description: "An error occurred while adding to bookmarks.",
    //         variant: "destructive",
    //       });
    //       console.error("Bookmark addition error:", error);
    //     })
    //     .finally(() => {
    //       getBookmarks()
    //         .then((res) => {
    //           setBookmark(res);
    //         })
    //         .catch((error) => {
    //           console.error("Error fetching bookmarks data:", error);
    //           setBookmark([]); // Set bookmark state to empty array in case of error
    //         });
    //     });
    // }
  };

  return (
    <>
      <div>
        <KeywordBar data={dataset} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full py-2">
          <Card className="hidden flex justify-center item-center bg-black ">
            <Image
              src={pic4}
              width={450}
              height={450}
              className="rounded-md"
              alt="Picture of the author"
            />
          </Card>
          <Card className="hidden flex justify-center item-center bg-gray-200">
            <Image
              src={pic5}
              width={450}
              height={450}
              className="rounded-md"
              alt="Picture of the author"
            />
          </Card>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full mt-2">
          {isLoading ? (
            list.map((item, index) => (
              <Skeleton key={index} className="h-52 w-64 rounded-lg" />
            ))
          ) : mentors.length > 0 && (
            mentors.map((item, index) => (
              <Card key={index} className="">
                <CardHeader>
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <Avatar>
                        <AvatarImage
                          src={getImageUrl(
                            item.collectionId,
                            item.id,
                            item.avatar
                          )}
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">
                          {item.username}
                        </h4>
                        <span className="text-sm tracking-tight text-default-400 flex align-middle justify-center">
                          {item.rating}{" "}
                          <FaStar className="ml-1" color="#FFC72C" size={16} />
                        </span>
                      </div>
                    </div>
                    <Toggle
                      aria-label="Toggle italic"
                      variant="outline"
                      onClick={() => handleBookmarkToggle(item)}
                    >
                      <BsJournalBookmarkFill />
                    </Toggle>
                  </div>
                </CardHeader>
                <CardContent className="text-small text-default-400">
                  <div className="flex gap-2 flex-wrap">
                    {item && item.interests
                      ? item.interests.split(",").map((interest, index) => (
                          <Badge key={index} variant="outline">
                            {interest.trim()}
                          </Badge>
                        ))
                      : "N/A"}
                  </div>
                  <div className="mt-1 ">{item.bio}</div>
                </CardContent>
                <CardFooter className="flex justify-between border-t py-2">
                  <BookModal buttonName="Request" data={item} />
                  {item.rate != "free" ? (
                    <Badge
                      variant="outline"
                      className="flex gap-1 rounded-full bg-green-200"
                    >
                      <p className="font-semibold  text-green-700">
                        {item.rate}
                      </p>
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="flex gap-1 rounded-full bg-red-100"
                    >
                      <p className="font-semibold  text-red-500">Free</p>
                    </Badge>
                  )}
                </CardFooter>
              </Card>
            ))
          ) }
        </div>
      </div>
    </>
  );
};

export default HomeCardSection;


const LoginDialog = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [isloadingGoogle, setIsLoadingGoogle] = useState(false);
  const history = useRouter();
  const { toast } = useToast();
  const { setIsUserValid } = useAuth();

  const toggleMode = () => {
    setIsSignIn(!isSignIn);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!isSignIn && password.length < 8) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      });
      return;
    }

    if ((isSignIn && password.length < 1) || email.length < 1) {
      toast({
        title: "Input cannot be empty",
        description: "Inputs cannot be empty, please provide your credentials",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true); // Set loading state when the form is submitted

    if (isSignIn) {
      login(email, password, setIsUserValid)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          toast({
            title: "Invalid credentials",
            description:
              "Invalid login credentials! please enter correct details.",
            variant: "default",
          });
          console.error("Login error:", error);
          // Handle login error here, such as displaying an error message to the user
        })
        .finally(() => {
          setTimeout(() => {
            setEmail("");
            setPassword("");
            setIsLoading(false);
          }, 3000);
        });
    } else {
      Signup(email, password)
        .then(() => {
          toggleMode();
          toast({
            title: "Account created",
            description:
              "Account created successfully! Login with new credentials.",
            variant: "default",
          });
        })
        .catch((error) => {
          toast({
            title: "Failed to create account",
            description: "Sorry an error just occurred! please try again.",
            variant: "destructive",
          });
          console.error("Signup error:", error);
          // Handle signup error here, such as displaying an error message to the user
        })
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
            setEmail("");
            setPassword("");
          }, 2000);
        });
    }
  };

  const handleGoogle = () => {
    setIsLoadingGoogle(true);
    SignupGoogle();
    setTimeout(() => {
      setIsLoadingGoogle(false);
    }, 3000);
  };

  const buttonText = isSignIn ? "Sign In" : "Sign Up";
  const googleText = isSignIn ? "Sign in with google " : "Sign up with google";
  const linkText = isSignIn ? "Create an account" : "Sign In";

  return (
    <Dialog >
      <DialogTrigger>
        <Button
          size="sm"
          className="w-full bg-blue text-secondary hover:text-primary hover:bg-lightblue2 rounded-md text-lg"
        >
          <CgProfile className="mr-2 h-4 w-4" />
          Log in
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm rounded-md">
        <DialogHeader className="mt-4 mb-2">
          <DialogTitle className="text-left">
            {" "}
            {isSignIn ? "Log in" : "Sign up"}{" "}
          </DialogTitle>
          <DialogDescription className="text-left">
            Get started and book a mentor of your choice
          </DialogDescription>
        </DialogHeader>
        <div>
          <form className="flex flex-col gap-3" onSubmit={handleFormSubmit}>
            <Label htmlFor="email">Email</Label>
            <Input
              className="p-6"
              isRequired
              placeholder="Enter your email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Label htmlFor="password" className="mt-2">
              Password
            </Label>
            <Input
              className="p-6"
              isRequired
              placeholder="Enter password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              size="xl"
              className="bg-blue hover:bg-darkblue text-lg rounded-lg mt-3"
              type="submit"
            >
              {isloading ? "Signing In..." : buttonText}
            </Button>

            <p className=" text-sm">
              {isSignIn ? "Need an account?" : "Already have an account?"}{" "}
              <a
                href="#"
                className="font-semibold text-blue-500 hover:text-blue-700 ml-1 underline"
                onClick={toggleMode}
              >
                {linkText}
              </a>
            </p>

            <Separator />
          </form>
          <Button
            size="xl"
            className="bg-indigo hover:bg-darkblue text-lg rounded-lg w-full mt-3"
            onClick={handleGoogle}
          >
            {isloadingGoogle ? "Signing in.." : googleText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};