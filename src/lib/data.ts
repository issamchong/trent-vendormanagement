export type Vendor = {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  status: "active" | "inactive";
  performanceScore: number;
  registrationDate: string;
};

export type Contract = {
  id: string;
  vendorName: string;
  startDate: string;
  endDate: string;
  value: number;
  status: "active" | "expired" | "pending";
};

export const vendors: Vendor[] = [
  {
    id: "VEN-001",
    name: "Innovate Solutions",
    contactPerson: "Alice Johnson",
    email: "alice.j@innovatesolutions.com",
    status: "active",
    performanceScore: 92,
    registrationDate: "2023-01-15",
  },
  {
    id: "VEN-002",
    name: "TechPro Services",
    contactPerson: "Bob Williams",
    email: "bob.w@techpro.com",
    status: "active",
    performanceScore: 88,
    registrationDate: "2022-11-20",
  },
  {
    id: "VEN-003",
    name: "Global Connect",
    contactPerson: "Charlie Brown",
    email: "charlie.b@globalconnect.net",
    status: "inactive",
    performanceScore: 75,
    registrationDate: "2021-05-30",
  },
  {
    id: "VEN-004",
    name: "Synergy Corp",
    contactPerson: "Diana Prince",
    email: "diana.p@synergy.org",
    status: "active",
    performanceScore: 95,
    registrationDate: "2023-03-10",
  },
  {
    id: "VEN-005",
    name: "QuantumLeap Inc.",
    contactPerson: "Ethan Hunt",
    email: "ethan.h@quantumleap.com",
    status: "active",
    performanceScore: 85,
    registrationDate: "2023-06-01",
  },
  {
    id: "VEN-006",
    name: "Legacy Systems",
    contactPerson: "Fiona Glenanne",
    email: "fiona.g@legacysys.com",
    status: "inactive",
    performanceScore: 68,
    registrationDate: "2020-09-12",
  },
];

export const contracts: Contract[] = [
    {
        id: "CON-101",
        vendorName: "Innovate Solutions",
        startDate: "2023-02-01",
        endDate: "2024-02-01",
        value: 50000,
        status: "active",
    },
    {
        id: "CON-102",
        vendorName: "TechPro Services",
        startDate: "2023-01-01",
        endDate: "2023-12-31",
        value: 75000,
        status: "expired",
    },
    {
        id: "CON-103",
        vendorName: "Synergy Corp",
        startDate: "2023-04-01",
        endDate: "2024-04-01",
        value: 120000,
        status: "active",
    },
    {
        id: "CON-104",
        vendorName: "QuantumLeap Inc.",
        startDate: "2023-07-01",
        endDate: "2024-07-01",
        value: 95000,
        status: "active",
    },
     {
        id: "CON-105",
        vendorName: "Innovate Solutions",
        startDate: "2024-03-01",
        endDate: "2025-03-01",
        value: 65000,
        status: "pending",
    },
];

export const getVendorStats = () => {
  const total = vendors.length;
  const active = vendors.filter(v => v.status === 'active').length;
  const inactive = total - active;
  return { total, active, inactive };
}
