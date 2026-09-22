"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/context/AuthContext";
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

export default function LoginPage() {
  const router = useRouter();
  const { currentUser, loading, setCurrentUser, users } = useAuth();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [credentialsError, setCredentialsError] = useState({
    emailError: "",
    passwordError: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && currentUser) {
      router.replace("/dashboard");
    }
  }, [loading, currentUser, router]);

  function handleCredentials(e) {
    setError("");
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

    const user = users.find(
      (user) =>
        user.email === credentials.email &&
        user.password === credentials.password,
    );

    if (!user) {
      setError("Invalid email or password");
      return;
    }

    const loggedInUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    localStorage.setItem("currentUser", JSON.stringify(loggedInUser));

    setCurrentUser(loggedInUser);

    router.replace("/dashboard");
  }

  if (loading || currentUser) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <Spinner className="size-6" />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8 sm:px-6">
      <h1 className="mb-8 text-center text-3xl font-bold sm:text-4xl lg:text-5xl">
        Well Production Monitor
      </h1>

      <Card className="w-full max-w-xl py-6 border">
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
