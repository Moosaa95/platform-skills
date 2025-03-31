"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/states/hooks"
import { closeModal } from "@/states/features/slices/general/modalSlice"
import { Modal } from "@/components/ui/modal"
import { toast } from "sonner"
import { useState } from "react"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  code: z.string().min(3, "Code must be at least 3 characters"),
})

type FormValues = z.infer<typeof formSchema>

export const RequestSkillsModal = () => {
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector((state) => state.generalModal.isOpen)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      code: "",
    },
  })

  const handleSubmitNewSkill = async (values: FormValues) => {
    setIsSubmitting(true)
    console.log(values);
    

    try {
      // In a real app, replace with actual API call
      // Example:
      // await fetch('/api/skills/request', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(values)
      // });

      // Mock API call for demonstration
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Skill request submitted for admin approval")
      form.reset()
      dispatch(closeModal())
    } catch (error) {
      console.error("Failed to submit skill request:", error)
      toast.error("Failed to submit skill request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal
      title="Request a New Skill"
      description="Submit a request to add a new skill to the system"
      isOpen={isOpen}
      onClose={() => {
        if (!isSubmitting) {
          form.reset()
          dispatch(closeModal())
        }
      }}
    >
      <div className="py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitNewSkill)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter skill name" disabled={isSubmitting} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter skill code (min. 3 characters)" disabled={isSubmitting} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-end w-full pt-2 space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset()
                  dispatch(closeModal())
                }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="py-4 px-8 gap-3 bg-accent-color-700 text-white rounded-lg">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Request"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  )
}

