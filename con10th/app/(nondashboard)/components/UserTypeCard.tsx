import { Card, CardContent } from "@/components/ui/card";
import { RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
interface SelectCardProps {
  label: string;
  imageSrc?: string;
  value: string;
  selectedValue: string;
  // onChangeCard: (value: string) => void;
}

const SelectCard = ({
  label,
  imageSrc,
  value,
  selectedValue,
  // onChangeCard
}: SelectCardProps) => {
  return (
    <Card
      className={`w-[270px] h-[96px] border-[1px] rounded-lg shadow-md p-4 flex items-center gap-4 transition cursor-pointer ${
        selectedValue === value 
          ? "border-primary-700 ring-2 ring-primary-600" 
          : "border-primary-400 hover:border-primary-600"
      }`}
      // onClick={() => onChangeCard(value)}
    >
      <CardContent className="flex items-center justify-between w-full p-0">
        <div className="flex items-center gap-4">
          {imageSrc && (
            <Image src={imageSrc} alt={label} width={48} height={48} />
          )}
          <span className="text-lg font-[500]">{label}</span>
        </div>
        <RadioGroupItem
          value={value}
          checked={selectedValue === value}
          onClick={(e) => e.stopPropagation()}
          className="h-6 w-6 text-primary-700"
        />
      </CardContent>
    </Card>
  );
};

export default SelectCard;

