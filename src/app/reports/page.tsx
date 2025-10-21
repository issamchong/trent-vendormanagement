import { PageLayout } from "@/components/layout/page-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { vendors, type Vendor } from "@/lib/data";

const activeVendors = vendors.filter((v) => v.status === "active");
const inactiveVendors = vendors.filter((v) => v.status === "inactive");

function VendorTable({ vendors }: { vendors: Vendor[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Contact Person</TableHead>
          <TableHead className="hidden md:table-cell">Email</TableHead>
          <TableHead className="hidden sm:table-cell">Registered On</TableHead>
          <TableHead className="text-right">Performance</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vendors.map((vendor) => (
          <TableRow key={vendor.id}>
            <TableCell className="font-medium">{vendor.name}</TableCell>
            <TableCell>{vendor.contactPerson}</TableCell>
            <TableCell className="hidden md:table-cell">
              {vendor.email}
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              {new Date(vendor.registrationDate).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-right">{vendor.performanceScore}%</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function ReportsPage() {
  return (
    <PageLayout title="Reports">
      <Tabs defaultValue="active">
        <TabsList className="grid w-full grid-cols-2 sm:w-96">
          <TabsTrigger value="active">Active Vendors</TabsTrigger>
          <TabsTrigger value="inactive">Inactive Vendors</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Vendor Report</CardTitle>
              <CardDescription>
                List of all vendors with active contracts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <VendorTable vendors={activeVendors} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="inactive">
          <Card>
            <CardHeader>
              <CardTitle>Inactive Vendor Report</CardTitle>
              <CardDescription>
                List of all vendors without active contracts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <VendorTable vendors={inactiveVendors} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}
