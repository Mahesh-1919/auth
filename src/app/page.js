"use client";

import { useState } from "react";
import LoginForm from "../components/socialLogins";
import { doLogin, doRegister } from "./actions";
import { useRouter } from "next/navigation";
import * as emailjs from "emailjs-com";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const router = useRouter();

  const sendEmail = async ({ name, email, verifyLink }) => {
    const data = {
      name: name,
      email: email,
      verifyLink: verifyLink,
    };

    emailjs.init("2hUV1GLHX6hixJRJS");

    emailjs
      .send("service_l0f690e", "template_zzahj9c", data, "2hUV1GLHX6hixJRJS")

      .then(
        (result) => {
          alert("Email sent");
        },
        (error) => {
          alert("Error sending email");
        }
      );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (activeTab === "login") {
      const formData = new FormData(event.target);
      try {
        const res = await doLogin(formData);
        if (res) {
          router.push("/home");
        }
      } catch (err) {
        alert("something went wrong");
      }
    } else {
      const formData = new FormData(event.target);
      if (formData.get("password") !== formData.get("confirm-password")) {
        alert("Passwords do not match");
        return;
      }
      try {
        const res = await doRegister(formData);
        await sendEmail({
          name: formData.get("name"),
          email: formData.get("email"),
          verifyLink: res.verifyLink,
        });

        router.push("/home");
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">
            Login or create a new account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" className="">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup">Signup</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      name="password"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full  bg-black p-2 rounded-md text-white hover:bg-gray-900"
                  >
                    Login
                  </button>
                </div>
              </form>
              <LoginForm />
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      required
                      name="name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      name={"password"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      required
                      name="confirm-password"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full  bg-black p-2 rounded-md text-white hover:bg-gray-900"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            <a href="#" className="underline">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Terms of Service
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
