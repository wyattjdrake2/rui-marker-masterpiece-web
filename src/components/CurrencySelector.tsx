
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useCurrency } from "@/contexts/CurrencyContext";

const CurrencySelector = () => {
  const { currency, setCurrency } = useCurrency();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="text-sm flex items-center gap-2 bg-white/80 hover:bg-white border border-gray-200"
        >
          <Globe className="h-4 w-4" />
          {currency}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setCurrency('CAD')}>
          🇨🇦 CAD - Canadian Dollar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setCurrency('USD')}>
          🇺🇸 USD - US Dollar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrencySelector;
