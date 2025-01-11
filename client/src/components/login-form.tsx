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
}

interface LoginFormData {
  email: string;
  password: string;
}

export function LoginForm({ onSuccess, onRegister }: LoginFormProps) {
  const { toast } = useToast();
  const form = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    try {
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
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="mt-1"
              {...form.register("email")}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="mt-1"
              {...form.register("password")}
            />
          </div>
          <div className="pt-2 space-y-2">
            <Button type="submit" className="w-full">
              Sign In
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
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
