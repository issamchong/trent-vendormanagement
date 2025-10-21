import { PageLayout } from "@/components/layout/page-layout";
import { VendorStatsCards } from "@/components/dashboard/vendor-stats-cards";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { RecentContracts } from "@/components/dashboard/recent-contracts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <PageLayout title="Dashboard">
      <div className="flex flex-col gap-6">
        <VendorStatsCards />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Vendor Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <PerformanceChart />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Contracts</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentContracts />
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
