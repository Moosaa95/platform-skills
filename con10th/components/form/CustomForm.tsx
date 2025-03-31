// components/ui/multi-step-form.tsx
"use client";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";

export function MultiStepForm({
  children,
  schema,
  defaultValues,
  onSubmit,
}: {
  children: React.ReactNode;
  schema: any;
  defaultValues?: any;
  onSubmit: (data: any) => void;
}) {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <Form {...methods}>
        <form 
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {children}
          <div className="mt-6 flex justify-end gap-4">
            <Button type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
}