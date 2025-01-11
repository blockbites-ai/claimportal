import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

interface LoginFormProps {
  onSuccess: (userData: { email: string }) => void;
  onRegister: () => void;
  walletId: string;
}

interface LoginFormData {
  email: string;
  password: string;
}

export function LoginForm({ onSuccess, onRegister, walletId }: LoginFormProps) {
  const [isResetting, setIsResetting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      onSuccess({ email: data.email });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      setIsLoading(true);
      const email = form.getValues("email");

      if (!email) {
        toast({
          title: "Error",
          description: "Please enter your email address",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin,
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Password reset instructions sent to your email",
      });
      setIsResetting(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isResetting) {
    return (
      <Card className="w-full max-w-md mx-auto bg-[#F8BB33]">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4 text-[#263238]">Reset Password</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-[#263238]">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="mt-1 bg-white"
                {...form.register("email")}
              />
            </div>
            <div className="pt-2 space-y-2">
              <Button
                className="w-full bg-[#339D53] hover:bg-[#339D53]/90"
                onClick={handleResetPassword}
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Instructions"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full bg-white hover:bg-white/90"
                onClick={() => setIsResetting(false)}
                disabled={isLoading}
              >
                Back to Login
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-[#F8BB33]">
      <CardContent className="pt-6">
        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-[#263238]">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="mt-1 bg-white"
              {...form.register("email")}
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-[#263238]">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="mt-1 bg-white"
              {...form.register("password")}
            />
          </div>
          <Button
            type="button"
            variant="link"
            className="px-0 text-[#263238]"
            onClick={() => setIsResetting(true)}
          >
            Forgot password?
          </Button>
          <div className="pt-2 space-y-2">
            <Button
              type="submit"
              className="w-full bg-[#339D53] hover:bg-[#339D53]/90"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full bg-white hover:bg-white/90"
              onClick={onRegister}
            >
              Create Account
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}