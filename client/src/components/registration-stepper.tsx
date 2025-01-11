import { useState } from "react";
import { useForm } from "react-hook-form";
import { Wallet, Mail, Shield, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { RegistrationState } from "@/lib/types";

const steps = [
  { id: 1, title: "Connect Wallet", icon: Wallet },
  { id: 2, title: "Validate Holder", icon: Shield },
  { id: 3, title: "Enter Email", icon: Mail },
  { id: 4, title: "Verify Email", icon: CheckCircle2 },
];

interface RegistrationStepperProps {
  onComplete: (data: RegistrationState) => void;
}

export function RegistrationStepper({ onComplete }: RegistrationStepperProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();
  const form = useForm<RegistrationState>({
    defaultValues: {
      walletId: "",
      email: "",
      verificationCode: "",
    },
  });

  const handleNextStep = async (data: Partial<RegistrationState>) => {
    if (currentStep === 1 && !data.walletId) {
      toast({
        title: "Error",
        description: "Please enter a wallet ID",
        variant: "destructive",
      });
      return;
    }

    if (currentStep === 3 && !data.email) {
      toast({
        title: "Error",
        description: "Please enter your email",
        variant: "destructive",
      });
      return;
    }

    if (currentStep === 4 && !data.verificationCode) {
      toast({
        title: "Error",
        description: "Please enter verification code",
        variant: "destructive",
      });
      return;
    }

    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete(data as RegistrationState);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <Label htmlFor="walletId">Wallet ID</Label>
            <Input
              id="walletId"
              placeholder="Enter your wallet ID"
              {...form.register("walletId")}
            />
          </div>
        );
      case 2:
        return (
          <div className="text-center py-8">
            <Shield className="w-16 h-16 mx-auto mb-4 text-primary animate-pulse" />
            <p>Validating NFT holder status...</p>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...form.register("email")}
            />
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <Label htmlFor="verificationCode">Verification Code</Label>
            <Input
              id="verificationCode"
              placeholder="Enter verification code"
              {...form.register("verificationCode")}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="pt-6">
        <div className="flex justify-between mb-8">
          {steps.map((step) => {
            const StepIcon = step.icon;
            return (
              <div
                key={step.id}
                className={`flex flex-col items-center ${
                  step.id === currentStep
                    ? "text-primary"
                    : step.id < currentStep
                    ? "text-green-500"
                    : "text-gray-400"
                }`}
              >
                <StepIcon className="w-6 h-6 mb-2" />
                <span className="text-sm">{step.title}</span>
              </div>
            );
          })}
        </div>

        <div className="min-h-[200px] flex flex-col justify-between">
          {renderStepContent()}
          
          <div className="mt-6 flex justify-end">
            <Button
              onClick={() => handleNextStep(form.getValues())}
            >
              {currentStep === 4 ? "Complete" : "Continue"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
