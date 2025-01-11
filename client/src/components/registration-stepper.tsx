import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Mail, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import type { RegistrationState } from "@/lib/types";

const steps = [
  { id: 1, title: "Create Account", icon: Mail },
  { id: 2, title: "Verify Email", icon: CheckCircle },
];

interface RegistrationStepperProps {
  onComplete: (data: RegistrationState) => void;
  walletId: string;
  onLogin: () => void;
}

export function RegistrationStepper({ onComplete, walletId, onLogin }: RegistrationStepperProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();
  const form = useForm<RegistrationState>({
    defaultValues: {
      walletId,
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isVerifying) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
        if (event === 'SIGNED_IN') {
          onComplete(form.getValues() as RegistrationState);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [isVerifying, onComplete, form]);

  const handleRegistration = async (data: RegistrationState) => {
    try {
      setIsLoading(true);

      if (!data.email || !data.password) {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive",
        });
        return;
      }

      const { error, data: authData } = await supabase.auth.signUp({
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

      if (authData.user?.identities?.length === 0) {
        toast({
          title: "Error",
          description: "Email already registered",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Account created! Please verify your email to continue.",
      });

      setIsVerifying(true);
      setCurrentStep(2);
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-[#263238]">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="mt-1"
                {...form.register("email")}
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-[#263238]">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                className="mt-1"
                {...form.register("password")}
              />
            </div>
            <Button
              className="w-full bg-[#339D53] hover:bg-[#339D53]/90"
              onClick={() => handleRegistration(form.getValues())}
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
            <Button
              variant="link"
              className="w-full text-[#263238]"
              onClick={onLogin}
            >
              Already have an account? Sign In
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="text-center space-y-4">
            <Mail className="w-16 h-16 mx-auto text-[#339D53] animate-pulse" />
            <h3 className="text-lg font-semibold text-[#263238]">Check Your Email</h3>
            <p className="text-sm text-[#263238]/70">
              We've sent a verification link to {form.getValues("email")}. 
              Please verify your email to access your dashboard.
            </p>
            <Button
              variant="outline"
              className="mt-4 border-[#263238] text-[#263238] hover:bg-[#263238]/10"
              onClick={() => window.location.reload()}
            >
              I've verified my email
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white">
      <CardContent className="pt-6">
        <div className="flex justify-between mb-8">
          {steps.map((step) => {
            const StepIcon = step.icon;
            return (
              <div
                key={step.id}
                className={`flex flex-col items-center ${
                  step.id === currentStep
                    ? "text-[#339D53]"
                    : step.id < currentStep
                    ? "text-[#339D53]"
                    : "text-gray-400"
                }`}
              >
                <StepIcon className="w-6 h-6 mb-2" />
                <span className="text-sm text-[#263238]">{step.title}</span>
              </div>
            );
          })}
        </div>

        <div className="min-h-[200px]">
          {renderStepContent()}
        </div>
      </CardContent>
    </Card>
  );
}