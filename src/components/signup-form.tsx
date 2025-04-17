"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authService } from "@/services/loginapis";

// Reusable alert component
function Alert({ message, type }: { message: string; type: 'success' | 'error' }) {
  if (!message) return null;

  const bgColor = type === 'success' ? 'bg-green-100' : 'bg-red-100';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';

  return (
    <div className={`p-4 mb-4 rounded ${bgColor} ${textColor}`}>
      {message}
    </div>
  );
}

interface FormData {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' }>({
    message: "",
    type: "error",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ message: "", type: "error" });

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const nameParts = formData.fullname.split(" ");
      const firstname = nameParts[0];
      const lastname = nameParts.slice(1).join(" ") || "";

      const userData = {
        fullname: {
          firstname,
          lastname,
        },
        email: formData.email,
        password: formData.password,
      };

      await authService.register(userData);

      setAlert({
        message: "Account created successfully! Redirecting to login...",
        type: "success",
      });

      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);

    } catch (error) {
      setAlert({
        message: error instanceof Error ? error.message : "Registration failed",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your details below to create your account
        </p>
      </div>

      {/* Alert Message */}
      {alert.message && <Alert message={alert.message} type={alert.type} />}

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="fullname">Full Name</Label>
          <Input
            id="fullname"
            type="text"
            placeholder="John Doe"
            required
            value={formData.fullname}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            minLength={8}
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
          />
          <p className="text-muted-foreground text-xs">
            Password must be at least 8 characters
          </p>
        </div>

        <div className="grid gap-3">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </Button>
      </div>
    </form>
  );
}
