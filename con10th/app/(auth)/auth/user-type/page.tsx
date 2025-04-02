'use client'
import SelectCard from "@/app/(nondashboard)/components/UserTypeCard";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { Typography } from "@/components/ui/typography/Typography";
import Link from "next/link";
import { useState } from "react";

export default function UserType() {
    const options = [
        {label: "I am a client", imageSrc: "", value:"client"},
        {label: "I am an expert", imageSrc: "", value:"expert"},
        
    ]

    const [selectedValue, setSelectedValue] = useState<string>('') 
    return (
        <div className="container space-y-9 flex flex-col items-center justify-center h-[calc(100vh-320px)]">
            <Typography variant="primary" size={36} className="font-[800]">Join as a client or an expert!</Typography>
            <div className="flex flex-col items-center space-y-4">
                <RadioGroup value={selectedValue} onValueChange={setSelectedValue} className="flex space-x-4">
                    {options.map((option) => (
                        <SelectCard 
                            key={option.value}
                            label={option.label}
                            imageSrc={option.imageSrc}
                            value={option.value}
                            selectedValue={selectedValue}
                            
                        />
                    ))}
                </RadioGroup>
                <Button variant="outline" className="rounded-lg">Join Con10th</Button>
            </div>
            <div className="flex space-x-3 items-center mt-4">
                <Typography variant="primary" size={20} className="font-[600] leading-[30px]">Already have an account?</Typography>
                <Link href="/login">
                    <Typography variant="secondary" size={20}>Login</Typography>
                </Link>
            </div>
        </div>
    )
}