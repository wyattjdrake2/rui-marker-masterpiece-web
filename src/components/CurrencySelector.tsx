
import { Button } from "@/components/ui/button";
import { useCurrency } from "@/contexts/CurrencyContext";

const CurrencySelector = () => {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={currency === 'CAD' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setCurrency('CAD')}
        className="text-sm"
      >
        CAD
      </Button>
      <Button
        variant={currency === 'USD' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setCurrency('USD')}
        className="text-sm"
      >
        USD
      </Button>
    </div>
  );
};

export default CurrencySelector;
