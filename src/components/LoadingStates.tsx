import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardHeader } from "./ui/card";

export const LoadingCard = () => (
  <Card className="zen-card">
    <CardHeader>
      <Skeleton className="h-6 w-[200px]" />
      <Skeleton className="h-4 w-[300px] mt-2" />
    </CardHeader>
    <CardContent className="space-y-3">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </CardContent>
  </Card>
);

export const LoadingStats = () => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    {[1, 2, 3, 4].map((i) => (
      <Card key={i} className="zen-card">
        <CardContent className="pt-6">
          <Skeleton className="h-4 w-20 mb-2" />
          <Skeleton className="h-8 w-16 mb-2" />
          <Skeleton className="h-3 w-24" />
        </CardContent>
      </Card>
    ))}
  </div>
);

export const LoadingList = ({ items = 3 }) => (
  <div className="space-y-3">
    {Array.from({ length: items }).map((_, i) => (
      <Card key={i} className="p-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-3 w-[300px]" />
          </div>
        </div>
      </Card>
    ))}
  </div>
);

export const LoadingSpinner = ({
  size = "default",
}: {
  size?: "sm" | "default" | "lg";
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-primary border-t-transparent`}
      />
    </div>
  );
};

export const PulseLoader = () => (
  <div className="flex space-x-2 items-center justify-center">
    <div
      className="h-3 w-3 bg-primary rounded-full animate-pulse"
      style={{ animationDelay: "0ms" }}
    />
    <div
      className="h-3 w-3 bg-primary rounded-full animate-pulse"
      style={{ animationDelay: "150ms" }}
    />
    <div
      className="h-3 w-3 bg-primary rounded-full animate-pulse"
      style={{ animationDelay: "300ms" }}
    />
  </div>
);
