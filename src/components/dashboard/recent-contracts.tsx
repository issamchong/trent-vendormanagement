import { contracts } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentContracts() {
  const recentContracts = contracts.slice(0, 5);
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  }

  return (
    <div className="space-y-4">
      {recentContracts.map((contract) => (
        <div key={contract.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`https://i.pravatar.cc/150?u=${contract.vendorName}`} alt="Avatar" />
            <AvatarFallback>{getInitials(contract.vendorName)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{contract.vendorName}</p>
            <p className="text-sm text-muted-foreground">
              Contract Value: ${contract.value.toLocaleString()}
            </p>
          </div>
          <div className="ml-auto font-medium text-sm">
            {new Date(contract.startDate).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
}
