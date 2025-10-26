"use client";

import { useState } from "react";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { vendors as initialVendors, type Vendor } from "@/lib/data";
import { PlusCircle, MoreHorizontal } from "lucide-react";

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors);

  const toggleVendorStatus = (vendorId: string) => {
    setVendors(
      vendors.map((vendor) =>
        vendor.id === vendorId
          ? {
              ...vendor,
              status: vendor.status === "active" ? "inactive" : "active",
            }
          : vendor
      )
    );
  };

  return (
    <PageLayout title="Vendors">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All Vendors</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2">
                <PlusCircle className="h-4 w-4" />
                Register Vendor
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Register New Vendor</DialogTitle>
                <DialogDescription>
                  Fill out the form below to add a new vendor to the system.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Innovate Solutions"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="contact" className="text-right">
                    Contact Person
                  </Label>
                  <Input
                    id="contact"
                    placeholder="Alice Johnson"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="contact@innovate.com"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Register</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="text-right">Performance</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
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
                    <Badge
                      variant={
                        vendor.status === "active" ? "default" : "secondary"
                      }
                      className={
                        vendor.status === "active"
                          ? "bg-green-500/20 text-green-700 hover:bg-green-500/30"
                          : "bg-red-500/20 text-red-700 hover:bg-red-500/30"
                      }
                    >
                      {vendor.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {vendor.performanceScore}%
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onSelect={() => toggleVendorStatus(vendor.id)}
                        >
                          {vendor.status === "active"
                            ? "Deactivate"
                            : "Activate"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </PageLayout>
  );
}
