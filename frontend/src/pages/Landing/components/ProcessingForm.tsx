import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Youtube, Sparkles, Target, FileText } from "lucide-react";
import { LoadingSpinner } from "./LoadingSpinner";

interface ProcessingFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

export interface FormData {
  url: string;
  tone: string;
  audience: string;
  language: string;
  outputs: string[];
}

const outputOptions = [
  { id: "blog", label: "Blog Draft", icon: <FileText className="h-4 w-4" /> },
  { id: "linkedin", label: "LinkedIn Post", icon: <Target className="h-4 w-4" /> },
  { id: "twitter", label: "Twitter Thread", icon: <Sparkles className="h-4 w-4" /> },
  { id: "thumbnail", label: "Thumbnail Text", icon: <Youtube className="h-4 w-4" /> },
];

export const ProcessingForm = ({ onSubmit, isLoading }: ProcessingFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    url: "",
    tone: "professional",
    audience: "content creators, marketers",
    language: "en",
    outputs: ["blog", "linkedin", "twitter", "thumbnail"],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleOutputChange = (outputId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      outputs: checked 
        ? [...prev.outputs, outputId]
        : prev.outputs.filter(id => id !== outputId)
    }));
  };

  return (
    <Card className="bg-gradient-card border-0 shadow-medium">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="p-2 rounded-lg bg-gradient-primary">
            <Youtube className="h-6 w-6 text-white" />
          </div>
          Content Repurposer
        </CardTitle>
        <p className="text-muted-foreground">
          Transform YouTube videos into multiple content formats with AI
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* YouTube URL */}
          <div className="space-y-2">
            <Label htmlFor="url" className="text-sm font-semibold">YouTube URL</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={formData.url}
              onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
              required
              className="bg-background border-border shadow-soft"
            />
          </div>

          {/* Settings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Tone */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Tone</Label>
              <Select value={formData.tone} onValueChange={(value) => setFormData(prev => ({ ...prev, tone: value }))}>
                <SelectTrigger className="bg-background border-border shadow-soft">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                  <SelectItem value="educational">Educational</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Language */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Language</Label>
              <Select value={formData.language} onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}>
                <SelectTrigger className="bg-background border-border shadow-soft">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Custom Audience */}
            <div className="space-y-2">
              <Label htmlFor="audience" className="text-sm font-semibold">Target Audience</Label>
              <Input
                id="audience"
                placeholder="e.g., founders, marketers"
                value={formData.audience}
                onChange={(e) => setFormData(prev => ({ ...prev, audience: e.target.value }))}
                className="bg-background border-border shadow-soft"
              />
            </div>
          </div>

          {/* Output Types */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Content Types to Generate</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {outputOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2 p-3 rounded-lg bg-muted/30 border border-border/50">
                  <Checkbox
                    id={option.id}
                    checked={formData.outputs.includes(option.id)}
                    onCheckedChange={(checked) => handleOutputChange(option.id, checked as boolean)}
                  />
                  <div className="flex items-center gap-2">
                    {option.icon}
                    <Label htmlFor={option.id} className="text-sm font-medium cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            disabled={isLoading || !formData.url || formData.outputs.length === 0}
            className="w-full"
            variant="gradient"
            size="lg"
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" />
                Processing Video...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Transform Content
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};