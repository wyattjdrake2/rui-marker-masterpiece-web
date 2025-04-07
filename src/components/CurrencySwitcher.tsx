
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { GanttChartSquare } from "lucide-react";

interface CurrencySwitcherProps {
  currency: "CAD" | "USD";
  onCurrencyChange: (currency: "CAD" | "USD") => void;
}

const CurrencySwitcher = ({ currency, onCurrencyChange }: CurrencySwitcherProps) => {
  return (
    <div className="flex items-center gap-2">
      <GanttChartSquare className="h-4 w-4 text-gray-500" />
      <Select value={currency} onValueChange={(value) => onCurrencyChange(value as "CAD" | "USD")}>
        <SelectTrigger className="w-24 h-8">
          <SelectValue placeholder="Currency" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="CAD">CAD $</SelectItem>
          <SelectItem value="USD">USD $</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CurrencySwitcher;
