import { useState, useRef } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ProcessingForm, FormData } from "./components/ProcessingForm";
import { ResultsSection } from "./components/ResultsSection";
import { Footer } from "./components/Footer";
import { useToast } from "@/hooks/use-toast";

interface ProcessingResult {
  blog?: string;
  linkedin?: string;
  twitter?: string;
  thumbnail?: string;
  summary?: string;
  transcript?: string;
}

export const Landing = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ProcessingResult>({});
  const [showResults, setShowResults] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFormSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setShowResults(false);
    
    try {
      // In a real app, this would call your FastAPI backend
      // For demo purposes, we'll simulate the API call
      const response = await simulateApiCall(formData);
      
      setResults(response);
      setShowResults(true);
      
      toast({
        title: "Content Generated Successfully!",
        description: "Your AI-powered content is ready to use.",
      });
    } catch (error) {
      console.error("Processing failed:", error);
      toast({
        title: "Processing Failed",
        description: "Please try again or check your YouTube URL.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Simulate API call - replace with actual FastAPI endpoint
  const simulateApiCall = async (formData: FormData): Promise<ProcessingResult> => {
    await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate processing time
    
    return {
      summary: "This engaging video discusses the fundamentals of content marketing in 2024. The speaker covers key strategies for building audience engagement, measuring ROI, and leveraging AI tools for content creation. Perfect for marketers looking to stay ahead of trends and maximize their content impact.",
      blog: `# The Future of Content Marketing in 2024\n\nContent marketing continues to evolve at a rapid pace, and 2024 brings exciting new opportunities for brands to connect with their audiences. In this comprehensive guide, we'll explore the key strategies that are shaping the industry.\n\n## Key Takeaways\n\n1. **AI Integration**: Artificial intelligence is becoming essential for content creation and optimization\n2. **Personalization at Scale**: Tailoring content for individual audience segments\n3. **Video-First Strategy**: Short-form and long-form video content dominance\n4. **Community Building**: Focus on fostering genuine connections\n\n## Implementation Tips\n\n- Start with audience research and persona development\n- Invest in quality content creation tools\n- Measure engagement metrics beyond vanity numbers\n- Build consistent publishing schedules\n\nThe future belongs to brands that can balance automation with authentic human connection.`,
      linkedin: `🚀 Just watched an incredible video about content marketing trends for 2024!\n\nKey insights that caught my attention:\n\n✅ AI isn't replacing creativity - it's amplifying it\n✅ Personalization is moving from nice-to-have to essential\n✅ Video content continues to dominate engagement metrics\n✅ Community building beats broadcasting every time\n\nFor fellow marketers: What trends are you seeing in your industry? How are you adapting your content strategy?\n\n#ContentMarketing #DigitalMarketing #AI #MarketingTrends2024`,
      twitter: `🧵 Thread: Content Marketing in 2024\n\n1/ The landscape is shifting faster than ever. Here's what's working now:\n\n2/ AI tools are becoming essential - not for replacing creativity, but for scaling good ideas and optimizing performance\n\n3/ Personalization isn't optional anymore. Generic content gets ignored. Tailored experiences drive engagement.\n\n4/ Video-first strategy wins. Whether it's TikTok, YouTube Shorts, or LinkedIn video posts - motion captures attention\n\n5/ Community > Audience. Stop broadcasting, start conversations. Build genuine relationships with your followers.\n\n6/ The brands winning in 2024 balance automation with authentic human connection. Technology serves the relationship, not the other way around.\n\nWhat content trends are you seeing? 👇`,
      thumbnail: `Content Marketing 2024: AI Revolution`,
    };
  };

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: "linear-gradient(135deg, #0a1a2f 0%, #1c2746 50%, #23395d 100%)",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Navigation */}
      <Navbar />
      
      {/* Hero Section */}
      <Hero onScrollToForm={handleScrollToForm} />
      
      {/* Form Section */}
      <section ref={formRef} className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <ProcessingForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        </div>
      </section>

      {/* Results Section */}
      <ResultsSection results={results} isVisible={showResults} />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};