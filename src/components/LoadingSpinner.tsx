import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner = ({
  message = "Loading...",
}: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
};
