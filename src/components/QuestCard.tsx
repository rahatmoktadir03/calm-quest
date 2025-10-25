import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface QuestCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export const QuestCard = ({ icon: Icon, title, description, delay = 0 }: QuestCardProps) => {
  return (
    <Card 
      className="card-glow bg-gradient-card border-border/50 backdrop-blur-sm"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader>
        <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center mb-4 animate-glow-pulse">
          <Icon className="w-7 h-7 text-primary-foreground" />
        </div>
        <CardTitle className="text-xl text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-muted-foreground leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};
