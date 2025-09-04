import { ContentCard } from "./ContentCard";
import { FileText, Target, MessageCircle, Image, Clock, Eye } from "lucide-react";

interface ProcessingResult {
  blog?: string;
  linkedin?: string;
  twitter?: string;
  thumbnail?: string;
  summary?: string;
  transcript?: string;
}

interface ResultsSectionProps {
  results: ProcessingResult;
  isVisible: boolean;
}

export const ResultsSection = ({ results, isVisible }: ResultsSectionProps) => {
  if (!isVisible || Object.keys(results).length === 0) return null;

  const contentMappings = [
    {
      key: "summary" as keyof ProcessingResult,
      title: "Video Summary",
      icon: <Eye className="h-5 w-5 text-accent" />
    },
    {
      key: "blog" as keyof ProcessingResult,
      title: "Blog Draft",
      icon: <FileText className="h-5 w-5 text-primary" />
    },
    {
      key: "linkedin" as keyof ProcessingResult,
      title: "LinkedIn Post",
      icon: <Target className="h-5 w-5 text-blue-600" />
    },
    {
      key: "twitter" as keyof ProcessingResult,
      title: "Twitter Thread",
      icon: <MessageCircle className="h-5 w-5 text-sky-500" />
    },
    {
      key: "thumbnail" as keyof ProcessingResult,
      title: "Thumbnail Ideas",
      icon: <Image className="h-5 w-5 text-emerald-600" />
    },
  ];

  return (
    <section className="py-16 bg-gradient-muted">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Generated Content
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your AI-transformed content is ready to use across multiple platforms
          </p>
        </div>

        <div className="grid gap-6">
          {contentMappings.map(({ key, title, icon }) => (
            <ContentCard
              key={key}
              title={title}
              content={results[key] || ""}
              icon={icon}
              className="animate-fade-in"
            />
          ))}
          
          {results.transcript && (
            <ContentCard
              title="Full Transcript"
              content={results.transcript}
              icon={<Clock className="h-5 w-5 text-muted-foreground" />}
              className="animate-fade-in"
            />
          )}
        </div>
      </div>
    </section>
  );
};