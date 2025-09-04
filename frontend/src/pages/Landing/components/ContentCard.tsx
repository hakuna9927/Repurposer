import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "./CopyButton";
import { cn } from "@/lib/utils";

interface ContentCardProps {
  title: string;
  content: string;
  icon?: React.ReactNode;
  className?: string;
}

export const ContentCard = ({ title, content, icon, className }: ContentCardProps) => {
  if (!content) return null;
  
  return (
    <Card className={cn("bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-foreground">
          <div className="flex items-center gap-2">
            {icon}
            <span className="text-lg font-semibold">{title}</span>
          </div>
          <CopyButton text={content} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
          <pre className="whitespace-pre-wrap text-sm text-foreground/90 font-medium leading-relaxed">
            {content}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};