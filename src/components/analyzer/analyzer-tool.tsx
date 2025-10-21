"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FileUp,
  Loader2,
  ShieldAlert,
  Lightbulb,
  FileText,
} from "lucide-react";
import {
  analyzeContract,
  type SmartContractAnalysisOutput,
} from "@/ai/flows/smart-contract-analysis";
import { useToast } from "@/hooks/use-toast";

export function AnalyzerTool() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<SmartContractAnalysisOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        setFile(selectedFile);
        setResult(null); // Reset result when a new file is selected
      }
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please select a contract file to analyze.",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        const contractDataUri = reader.result as string;
        const analysisResult = await analyzeContract({ contractDataUri });
        setResult(analysisResult);
      } catch (error) {
        console.error("Analysis Error:", error);
        toast({
          variant: "destructive",
          title: "Analysis Failed",
          description:
            "An error occurred during the analysis. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = (error) => {
      console.error("File Read Error:", error);
      toast({
        variant: "destructive",
        title: "File Read Error",
        description: "Could not read the selected file. Please try again.",
      });
      setIsLoading(false);
    };
  };

  const LoadingSkeleton = () => (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-destructive" />
          <CardTitle>Risk Assessment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[80%]" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          <CardTitle>Optimization Suggestions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[85%]" />
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-8">
      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
            <FileUp className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="mt-4">Upload Your Contract</CardTitle>
          <CardDescription>
            Select a document file (.pdf, .doc, .txt) to begin the AI analysis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mx-auto max-w-sm space-y-4">
            <Label htmlFor="contract-file" className="sr-only">
              Upload Contract
            </Label>
            <Input
              id="contract-file"
              type="file"
              onChange={handleFileChange}
              className="file:text-primary file:font-semibold"
              accept=".pdf,.doc,.docx,.txt"
            />
            {file && (
              <Alert variant="default" className="text-left">
                <FileText className="h-4 w-4" />
                <AlertDescription>Selected file: {file.name}</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <Button onClick={handleAnalyze} disabled={isLoading || !file}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Analyzing..." : "Analyze Contract"}
          </Button>
        </CardFooter>
      </Card>

      {isLoading && <LoadingSkeleton />}

      {result && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-destructive" />
              <CardTitle>Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">
                {result.riskAssessment}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              <CardTitle>Optimization Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">
                {result.optimizationSuggestions}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
