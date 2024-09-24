"use client";

import { useState } from "react";
import LoginForm from "../components/socialLogins";
import { doLogin, doRegister } from "./actions";
import { useRouter } from "next/navigation";
import { sendEmail } from "../components/sendEmail";

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
  const [mailSent, setMailSent] = useState(false);
  const [logged, setLogged] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (activeTab === "login") {
      setLogged(true);
      const formData = new FormData(event.target);
      try {
        const res = await doLogin(formData);
        if (res) {
          router.push("/home");
        }

        setLogged(false);
      } catch (err) {
        setLogged(false);
        alert("something went wrong");
      }
    } else {
      const formData = new FormData(event.target);
      if (formData.get("password") !== formData.get("confirm-password")) {
        alert("Passwords do not match");
        return;
      }
      try {
        setMailSent(true);
        const res = await doRegister(formData);
        ("use server");
        await sendEmail({
          name: formData.get("name"),
          email: formData.get("email"),
          verifyLink: res.verifyLink,
        });

        router.push("/home");

        setMailSent(false);
      } catch (err) {
        setMailSent(false);
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
                    {!logged ? "Login" : <Spinner />}
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
                    {!mailSent ? " Sign Up" : <Spinner />}
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

const Spinner = () => {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
