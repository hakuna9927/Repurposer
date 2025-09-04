import { Button } from "@/components/ui/button";
import { ArrowDown, Youtube, FileText, MessageCircle, Image } from "lucide-react";

interface HeroProps {
  onScrollToForm: () => void;
}

export const Hero = ({ onScrollToForm }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.3),transparent_50%)] animate-pulse" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Main Heading */}
        <div className="space-y-6 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Turn YouTube Videos into
            <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent animate-gradient-shift">
              Multiple Content Formats
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            AI-powered content repurposing that transforms one YouTube video into blog posts, LinkedIn content, Twitter threads, and thumbnail ideas in seconds.
          </p>
        </div>

        {/* Feature Icons */}
        <div className="flex justify-center items-center gap-8 my-12 text-white/80">
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              <Youtube className="h-6 w-6" />
            </div>
            <span className="text-sm font-medium">YouTube</span>
          </div>
          <ArrowDown className="h-6 w-6 animate-bounce" />
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              <FileText className="h-6 w-6" />
            </div>
            <span className="text-sm font-medium">Blog</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              <MessageCircle className="h-6 w-6" />
            </div>
            <span className="text-sm font-medium">Social</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              <Image className="h-6 w-6" />
            </div>
            <span className="text-sm font-medium">Thumbnails</span>
          </div>
        </div>

        {/* CTA Button */}
        <Button 
          onClick={onScrollToForm}
          variant="hero"
          size="lg"
          className="text-lg px-8 py-6 h-auto shadow-glow hover:shadow-primary transition-all duration-300"
        >
          Start Repurposing Content
          <ArrowDown className="h-5 w-5 ml-2 animate-bounce" />
        </Button>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 text-white/90">
          <div className="space-y-1">
            <div className="text-3xl font-bold">4+</div>
            <div className="text-sm">Content Formats</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-bold">AI</div>
            <div className="text-sm">Powered</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-bold">Instant</div>
            <div className="text-sm">Generation</div>
          </div>
        </div>
      </div>
    </section>
  );
};