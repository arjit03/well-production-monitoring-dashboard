"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const demoUsers = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: 2,
    name: "Analyst User",
    email: "analyst@example.com",
    password: "analyst123",
    role: "analyst",
  },
  {
    id: 3,
    name: "Viewer User",
    email: "viewer@example.com",
    password: "viewer123",
    role: "viewer",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [credentialsError, setCredentialsError] = useState({
    emailError: "",
    passwordError: "",
  });
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleCredentials(e) {
    if (e.target.name === "email") {
      setCredentialsError((prev) => {
        return { ...prev, emailError: "" };
      });
    } else if (e.target.name === "password") {
      setCredentialsError((prev) => {
        return { ...prev, passwordError: "" };
      });
    }
    setCredentials((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  function handleLogin(event) {
    event.preventDefault();
    setError("");

    if (!credentials.email && !credentials.password) {
      return setCredentialsError((prev) => {
        return {
          ...prev,
          emailError: "Email cannot be empty",
          passwordError: "Password cannot be empty",
        };
      });
    } else if (!credentials.email) {
      return setCredentialsError((prev) => {
        return {
          ...prev,
          emailError: "Email cannot be empty",
        };
      });
    } else if (!credentials.password) {
      return setCredentialsError((prev) => {
        return {
          ...prev,
          passwordError: "Password cannot be empty",
        };
      });
    } else if (!emailRegex.test(credentials.email)) {
      return setCredentialsError((prev) => ({
        ...prev,
        emailError: "Please enter a valid email address",
      }));
    }
    const user = demoUsers.find(
      (user) =>
        user.email === credentials.email &&
        user.password === credentials.password,
    );

    if (!user) {
      setError("Invalid email or password");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    router.replace("/dashboard");
  }

  return (
    <main className="flex gap-2 min-h-screen flex-col items-center justify-center bg-muted/40 px-4 py-8 sm:px-6">
      <h1 className="mb-8  text-center text-3xl font-bold sm:text-4xl lg:text-5xl">
        Well Production Monitor
      </h1>

      <Card className="w-full max-w-xl py-6">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl sm:text-3xl">Welcome back</CardTitle>

          <CardDescription className="text-sm sm:text-base">
            Sign in to access the monitoring dashboard.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            {error && <p className="text-sm text-destructive">{error}</p>}
            <div className="space-y-2">
              {credentialsError.emailError && (
                <p className="text-sm text-destructive">
                  {credentialsError.emailError}
                </p>
              )}
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                type="text"
                name="email"
                placeholder="Enter your email"
                value={credentials.email}
                onChange={handleCredentials}
              />
            </div>

            <div className="space-y-2">
              {credentialsError.passwordError && (
                <p className="text-sm text-destructive">
                  {credentialsError.passwordError}
                </p>
              )}
              <Label htmlFor="password">Password</Label>

              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={handleCredentials}
              />
            </div>

            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
