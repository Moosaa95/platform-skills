"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { useRegisterMutation } from '@/states/features/endpoints/auth/authApiSlice';




// zod schemas
const step1Schema = z.object({
	role: z.enum(["client", "expert"])
})

const step2Schema = z.object({
	first_name: z.string().min(2, "First name must be at least 2 characters"),
	last_name: z.string().min(2, "Last name must be at least 2 characters"),
	email: z.string().email("Invalid email address"),
})

const step3Schema = z.object({
	password: z.string().min(8, "Password must be at least 8 characters"),
	re_password: z.string(),
  }).refine(data => data.password === data.re_password, {
	message: "Passwords don't match",
	path: ["re_password"]
  });

// @ts-ignore
export const registerSchema = step1Schema.merge(step2Schema).merge(step3Schema) //ignore

type FormValues = z.infer<typeof registerSchema>

export default function useRegister() {
	const router = useRouter();
	const searchParams = useSearchParams();
    const roleFromQuery = searchParams.get("role");
	const [register, {isLoading}] = useRegisterMutation();
	const [currentStep, setCurrentStep] = useState(roleFromQuery ? 2 : 1);
	const [formData, setFormData] = useState<Partial<FormValues>>({})

	
	const schemaForStep = () => {
		switch (currentStep) {
		  case 1: return step1Schema;
		  case 2: return step2Schema;
		  case 3: return step3Schema;
		  default: return registerSchema;
		}
	  };
	
	const form = useForm({
		resolver: zodResolver(schemaForStep()),
		defaultValues: {
			role: roleFromQuery || "",
			first_name: "",
			last_name: "",
			email: "",
			password: "",
			re_password: "",
		}
	});

	console.log("FORM", form)

	const handleNext = async () => {
		const isValid = await form.trigger();
		if (isValid) {
		  const currentValues = form.getValues();
		  setFormData(prev => ({ ...prev, ...currentValues }));
		  setCurrentStep(prev => prev + 1);
		  
		}
		console.log("FORM NEXT", formData);
		
	};


	const handleBack = () => {
		setCurrentStep(prev => Math.max(prev - 1, 1));
	};

	const onSubmit = async (finalData: FormValues) => {
		try {
			const completeData = {
			...formData,
			password: finalData.password
			};
		
			const {message, status, user_email} = await register(completeData).unwrap();
			
			if (status) {
				localStorage.setItem("pendingVerificationEmail", user_email)
				router.push('/auth/verify-otp');
			}
			else {
				toast.error(message)
			}
		} catch (error) {
			console.error("Registration error:", error); // Add error logging
			toast.error('Failed to register account');
		}
	  };

	return {
		form,
		currentStep,
		isLoading,
		handleNext,
		handleBack,
		onSubmit
	};
}