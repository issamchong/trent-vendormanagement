import { PageLayout } from "@/components/layout/page-layout";
import { AnalyzerTool } from "@/components/analyzer/analyzer-tool";

export default function AnalyzerPage() {
  return (
    <PageLayout title="Smart Contract Analyzer">
      <div className="mx-auto max-w-4xl">
        <AnalyzerTool />
      </div>
    </PageLayout>
  );
}
