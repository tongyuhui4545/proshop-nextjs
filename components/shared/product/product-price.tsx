import { cn } from "@/lib/utils";

const ProductPrice = ({
  value,
  className,
}: {
  value: number;
  className?: string;
}) => {
  //Two decimal places
  const stringValue = value.toFixed(2);
  //Get int/float
  const [intVal, floatValue] = stringValue.split(".");

  return (
    <p className={cn("txet-2xl", className)}>
      <span className="text-xs align-super">$</span>
      {intVal}
      <span className="text-xs align-super">.{floatValue}</span>
    </p>
  );
};

export default ProductPrice;
