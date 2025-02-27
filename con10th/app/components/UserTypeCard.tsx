import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";

interface SelectCardProps {
    label: string;
    imageSrc?: string;
    value: string;
    selectedValue: string;
    onChange: (value:string) => void;
}


const SelectCard = ({
    label,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    imageSrc,
    value,
    selectedValue,
    onChange
}:SelectCardProps) => {
    return (
        <Card
            className={`w-64 border rounded-lg shadow-md p-4 flex items-center gap-4 transition ${selectedValue === value ? "border-blue-500 ring-2 ring-blue-500" : "border-gray-300"}`}
            onClick={() => onChange(value)}
        >
            <CardContent className="flex items-center gap-4 p-0 cursor-pointer">
                <Image src="" alt="" width={40} height={40} />
                <span className="text-lg font-medium">{label}</span>
                <RadioGroup value={selectedValue} onValueChange={onChange}>
                    <RadioGroupItem value={value} />
                </RadioGroup>
            </CardContent>
        </Card>
    )
}

export default SelectCard;