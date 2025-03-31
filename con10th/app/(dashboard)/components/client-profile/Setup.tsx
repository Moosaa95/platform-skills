"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import ProgressIndicator from "../ui/progress-indicator"
import ProfilePhotoUpload from "../ui/upload"
import { useGetClientProfileMutation, useUpdateClientProfileDetailsMutation, useUpdateClientProfilePictureMutation } from "@/states/features/endpoints/client/clientApiSlice"


// TODO : to use zod validation later

// Define the form data structure
interface ProfileFormData {
  profilePhoto?: File | null
  firstName: string
  lastName: string
  gender: string
  country: string
  bio: string;
  role?: string;
}

export default function ClientProfileSetup({id}:{id:string}) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)
  const [formData, setFormData] = useState<ProfileFormData>({
    profilePhoto: null,
    firstName: "",
    lastName: "",
    gender: "",
    country: "",
    bio: "",
  })

  const [getClientProfile, {isLoading:isLoadingClientProfile, isError, error}] =  useGetClientProfileMutation()
  const [updateClientProfilePicture, { isLoading: isUpdatingPhoto }] = useUpdateClientProfilePictureMutation()
  const [updateClientProfileDetails, { isLoading: isLoadingProfile }] = useUpdateClientProfileDetailsMutation()

  useEffect(() => {
    const fetchClientProfile = async () => {
      try {
        const response = await getClientProfile({ client_id: id }).unwrap();  
        if (response.profile_picture){
          setProfileImageUrl(response.profile_picture)
        }
        
        
        setFormData((prev) => ({
          ...prev,
          firstName: response.first_name || "",
          lastName: response.last_name || "",
          gender: response.gender || "",
          country: response.country || "",
          bio: response.bio || "",
        }));
      } catch (err) {
        toast.error("Failed to load client profile. Please try again.");
      }
    };
    fetchClientProfile();
  }, [id, getClientProfile]);
  
  // Update form data
  const updateFormData = (field: keyof ProfileFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Handle photo upload
  const handlePhotoUpload = async(file: File | null) => {
    if (!file) return 

    try{
      await updateClientProfilePicture({client_id:id, photo:file}).unwrap()
      toast.success("Success")
    }catch (error:any) {
      toast.error(error.data?.error || "Failed to upload profile photo")
    }
  }


  // Navigate to next step
  const handleNext = () => {
    // Validate current step
    if (currentStep === 1) {
      if (!formData.firstName || !formData.lastName || !formData.gender || !formData.country) {
        toast.error("Please fill in all required fields")
        return
      }
    } else if (currentStep === 2) {
      if (!formData.bio) {
        toast.error("Please enter your bio")
        return
      }
    }

    // Move to next step
    setCurrentStep((prev) => prev + 1)
    window.scrollTo(0, 0)
  }

  // Navigate to previous step
  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
    window.scrollTo(0, 0)
  }

  // Handle form submission
  const handleSubmit = async () => {
      if (!formData.bio) {
        toast.error("Please enter your bio")
        return
      }
  
      setIsSubmitting(true)
      

      const data =  {
        client_id: id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        gender: formData.gender,
        country: formData.country,
        bio: formData.bio,
      }
      console.log("PASSING DATA", data)
      try {
        // Update profile details
        await updateClientProfileDetails(data).unwrap()
  
        toast.success("Profile setup completed successfully!")
        router.push(`/client/${id}/dashboard`)
      } catch (error: any) {
        console.error("Error updating profile:", error)
        toast.error(error.data?.error || "Failed to update profile")
      } finally {
        setIsSubmitting(false)
      }
    }

  if (isLoadingProfile) {
    return <div className="flex justify-center p-8">Loading profile...</div>
  }

  return (
    <div className="flex flex-col">

      {/* Progress bar */}
      <div className="w-full h-2 bg-orange-100">
        <div
          className="h-full bg-orange-500 transition-all duration-300"
          style={{ width: `${(currentStep / 2) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex">
        {/* Left sidebar with progress indicator */}
        <div className="hidden md:block w-24 border-r p-6">
          <ProgressIndicator currentStep={currentStep} totalSteps={2} />
        </div>

        {/* Main content */}
        <div className="flex-1 py-8 px-4 md:px-12 max-w-3xl mx-auto w-full">
          {/* Step 1: Basic Profile */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h1 className="text-2xl md:text-5xl font-bold text-primary-900 text-center">
                Welcome! Let's get your new profile all set up.
              </h1>

              <div className="flex flex-col items-center mb-6">
                <p className="text-sm text-gray-500 mb-2">Upload a clear profile photo (Optional)</p>
                <ProfilePhotoUpload onPhotoUpload={handlePhotoUpload} initialImage={profileImageUrl || undefined} />
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="firstName">First name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateFormData("firstName", e.target.value)}
                    placeholder="First name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="lastName">Last name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => updateFormData("lastName", e.target.value)}
                    placeholder="Last name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="gender">Your gender *</Label>
                  <Select value={formData.gender} onValueChange={(value) => updateFormData("gender", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="country">Which country do you live in? *</Label>
                  <Select value={formData.country} onValueChange={(value) => updateFormData("country", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          

          {currentStep === 2 && (
            <div className="space-y-6">
              <h1 className="text-2xl md:text-3xl font-bold text-primary-900 text-center">Finally, your bio!</h1>

              <div>
                <Label htmlFor="bio">Short description about yourself and your expertise.</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => updateFormData("bio", e.target.value)}
                  placeholder="Write a brief bio..."
                  className="h-32"
                  required
                />
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="mt-8 flex justify-between">
            {currentStep > 1 ? (
              <Button variant="ghost" className="text-accent-color-700 flex items-center gap-2" onClick={handleBack}>
                <ChevronLeft size={16} />
                Back
              </Button>
            ) : (
              <div></div>
            )}

            {currentStep < 2 ? (
              <Button className="bg-accent-color-700 hover:bg-accent-color-600 text-white px-6 rounded-full" onClick={handleNext}>
                Continue
              </Button>
            ) : (
              <Button
                className="bg-accent-color-700 hover:bg-accent-color-600 text-white px-6 rounded-full"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Completing..." : "Complete"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}



"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, PlusCircle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import ProgressIndicator from "../ui/progress-indicator"
import ProfilePhotoUpload from "../ui/upload"
import { useGetExpertProfileMutation } from "@/states/features/endpoints/expert/expertApiSlice"
import SkillsSelector, { type Skill } from "../skills/Skills"
import CountrySelector from "../country/CountrySelector"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Define the service structure
interface Service {
  id?: string
  skillId: string
  title: string
  description: string
  price: string
  isActive: boolean
}

// Define the form data structure
interface ProfileFormData {
  profilePhoto?: File | null
  firstName: string
  lastName: string
  gender: string
  country: string
  jobTitle: string
  skills: Skill[]
  experienceLevel: string
  bio: string
  title: string
  services: Service[]
}

export default function ExpertProfileSetup({ id }: { id: string }) {
  const router = useRouter()

  const [getExpertProfile, { isLoading }] = useGetExpertProfileMutation()

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)
  const [formData, setFormData] = useState<ProfileFormData>({
    profilePhoto: null,
    firstName: "",
    lastName: "",
    gender: "",
    country: "",
    jobTitle: "",
    skills: [],
    experienceLevel: "",
    bio: "",
    title: "",
    services: [],
  })

  useEffect(() => {
    const fetchClientProfile = async () => {
      try {
        const response = await getExpertProfile({ expert_id: id }).unwrap()
        if (response.profile_picture) {
          setProfileImageUrl(response.profile_picture)
        }

        setFormData((prev) => ({
          ...prev,
          firstName: response.first_name || "",
          lastName: response.last_name || "",
          gender: response.gender || "",
          country: response.country || "",
          bio: response.bio || "",
          skills: response.skills || [],
          title: response.title || "",
          services: response.services || [],
        }))
      } catch (err) {
        toast.error("Failed to load client profile. Please try again.")
      }
    }
    fetchClientProfile()
  }, [id, getExpertProfile])

  // Update form data
  const updateFormData = (field: keyof ProfileFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Handle photo upload
  const handlePhotoUpload = async (file: File | null) => {
    if (!file) return
    updateFormData("profilePhoto", file)
  }

  // Handle skills update
  const handleSkillsUpdate = (skills: Skill[]) => {
    updateFormData("skills", skills)
  }

  // Add a new service
  const addService = () => {
    if (formData.services.length >= 3) {
      toast.error("You can add a maximum of 3 services")
      return
    }

    const newService: Service = {
      skillId: formData.skills.length > 0 ? formData.skills[0].id : "",
      title: "",
      description: "",
      price: "",
      isActive: true,
    }

    updateFormData("services", [...formData.services, newService])
  }

  // Update a service
  const updateService = (index: number, field: keyof Service, value: any) => {
    const updatedServices = [...formData.services]
    updatedServices[index] = { ...updatedServices[index], [field]: value }
    updateFormData("services", updatedServices)
  }

  // Remove a service
  const removeService = (index: number) => {
    const updatedServices = formData.services.filter((_, i) => i !== index)
    updateFormData("services", updatedServices)
  }

  // Navigate to next step
  const handleNext = () => {
    // Validate current step
    if (currentStep === 1) {
      if (!formData.firstName || !formData.lastName || !formData.gender || !formData.country) {
        toast.error("Please fill in all required fields")
        return
      }
    } else if (currentStep === 2) {
      if (formData.skills.length === 0) {
        toast.error("Please select at least one skill")
        return
      }
    } else if (currentStep === 3) {
      if (formData.services.length === 0) {
        toast.error("Please add at least one service")
        return
      }

      // Validate each service
      for (let i = 0; i < formData.services.length; i++) {
        const service = formData.services[i]
        if (!service.skillId || !service.title || !service.description || !service.price) {
          toast.error(`Please complete all fields for Service ${i + 1}`)
          return
        }
      }
    }

    // Move to next step
    setCurrentStep((prev) => prev + 1)
    window.scrollTo(0, 0)
  }

  // Navigate to previous step
  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
    window.scrollTo(0, 0)
  }

  // Handle form submission
  const handleSubmit = async () => {
    if (!formData.bio) {
      toast.error("Please enter your bio")
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, you would submit the form data to your API
      console.log("Submitting form data:", formData)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast.success("Profile setup completed successfully!")
      router.push("/dashboard")
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Failed to complete profile setup. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get skill name by ID
  const getSkillNameById = (skillId: string) => {
    const skill = formData.skills.find((s) => s.id === skillId)
    return skill ? skill.name : "Unknown Skill"
  }

  return (
    <div className="flex flex-col">
      {/* Progress bar */}
      <div className="w-full h-2 bg-orange-100">
        <div
          className="h-full bg-orange-500 transition-all duration-300"
          style={{ width: `${(currentStep / 5) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex">
        {/* Left sidebar with progress indicator */}
        <div className="hidden md:block w-24 border-r p-6">
          <ProgressIndicator currentStep={currentStep} totalSteps={5} />
        </div>

        {/* Main content */}
        <div className="flex-1 py-8 px-4 md:px-12 max-w-3xl mx-auto w-full">
          {/* Step 1: Basic Profile */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h1 className="text-2xl md:text-5xl font-bold text-primary-900 text-center">
                Welcome! Let's get your new profile all set up.
              </h1>

              <div className="flex flex-col items-center mb-6">
                <p className="text-sm text-gray-500 mb-2">Upload a clear profile photo (Optional)</p>
                <ProfilePhotoUpload onPhotoUpload={handlePhotoUpload} initialImage={profileImageUrl} />
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="firstName">First name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateFormData("firstName", e.target.value)}
                    placeholder="First name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="lastName">Last name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => updateFormData("lastName", e.target.value)}
                    placeholder="Last name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="gender">Your gender *</Label>
                  <Select value={formData.gender} onValueChange={(value) => updateFormData("gender", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="country">Which country do you live in? *</Label>
                  <CountrySelector
                    value={formData.country}
                    onValueChange={(value) => updateFormData("country", value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Skills & Experience */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h1 className="text-2xl md:text-3xl font-bold text-primary-900 text-center">
                What's your Skills & Level of Experience?
              </h1>

              <div className="space-y-6">
                <div>
                  <Label>What are your key skills? (Up to 2 things) *</Label>
                  <SkillsSelector selectedSkills={formData.skills} onSkillsChange={handleSkillsUpdate} />
                  <p className="text-xs text-gray-500 mt-1">Your expertise</p>
                </div>

                <div>
                  <Label htmlFor="jobTitle">Your professional title *</Label>
                  <Input
                    id="jobTitle"
                    value={formData.jobTitle}
                    onChange={(e) => updateFormData("jobTitle", e.target.value)}
                    placeholder="Eg: Product Designer, Writer, etc."
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="experienceLevel">Your experience level *</Label>
                  <Select
                    value={formData.experienceLevel}
                    onValueChange={(value) => updateFormData("experienceLevel", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                      <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                      <SelectItem value="advanced">Advanced (5-10 years)</SelectItem>
                      <SelectItem value="expert">Expert (10+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Services */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h1 className="text-2xl md:text-3xl font-bold text-primary-900 text-center">
                What services will you offer?
              </h1>

              <div className="relative w-full h-40 mb-6 rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg?height=160&width=600"
                  alt="Services illustration"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end">
                  <div className="p-4 text-center w-full">
                    <h3 className="text-lg font-semibold text-white">Link your services to your skills</h3>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {formData.services.map((service, index) => (
                  <Card key={index} className="relative">
                    <CardContent className="pt-6">
                      <div className="absolute top-2 right-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeService(index)}
                          className="h-8 w-8 text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>

                      <h3 className="font-medium mb-4">Service {index + 1}</h3>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor={`service-skill-${index}`}>Link to Skill *</Label>
                          <Select
                            value={service.skillId}
                            onValueChange={(value) => updateService(index, "skillId", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a skill" />
                            </SelectTrigger>
                            <SelectContent>
                              {formData.skills.map((skill) => (
                                <SelectItem key={skill.id} value={skill.id}>
                                  {skill.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor={`service-title-${index}`}>Service Title *</Label>
                          <Input
                            id={`service-title-${index}`}
                            value={service.title}
                            onChange={(e) => updateService(index, "title", e.target.value)}
                            placeholder="E.g., Logo Design, Content Writing"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor={`service-description-${index}`}>Description *</Label>
                          <Textarea
                            id={`service-description-${index}`}
                            value={service.description}
                            onChange={(e) => updateService(index, "description", e.target.value)}
                            placeholder="Describe what you offer in this service"
                            className="h-24"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor={`service-price-${index}`}>Price *</Label>
                          <Input
                            id={`service-price-${index}`}
                            type="number"
                            value={service.price}
                            onChange={(e) => updateService(index, "price", e.target.value)}
                            placeholder="0.00"
                            required
                          />
                          <p className="text-xs text-gray-500 mt-1">Enter price in your local currency</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {formData.services.length < 3 && (
                  <Button
                    variant="outline"
                    className="w-full border-dashed border-2 py-6 flex items-center justify-center gap-2"
                    onClick={addService}
                  >
                    <PlusCircle size={18} />
                    Add Service {formData.services.length + 1}
                  </Button>
                )}

                {formData.services.length === 0 && (
                  <div className="text-center text-gray-500 py-4">
                    You haven't added any services yet. Click the button above to add your first service.
                  </div>
                )}

                {formData.services.length === 3 && (
                  <p className="text-sm text-amber-600 text-center">Maximum of 3 services reached</p>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Bio */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h1 className="text-2xl md:text-3xl font-bold text-primary-900 text-center">Finally, your bio!</h1>

              <div>
                <Label htmlFor="bio">Short description about yourself and your expertise.</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => updateFormData("bio", e.target.value)}
                  placeholder="Write a brief professional bio..."
                  className="h-32"
                  required
                />
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h1 className="text-2xl md:text-3xl font-bold text-primary-900 text-center">Review Your Profile</h1>

              <div className="space-y-6">
                <div className="flex flex-col items-center">
                  {profileImageUrl ? (
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-2">
                      <img
                        src={profileImageUrl || "/placeholder.svg"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                      <span className="text-2xl text-gray-500">
                        {formData.firstName.charAt(0)}
                        {formData.lastName.charAt(0)}
                      </span>
                    </div>
                  )}
                  <h2 className="text-xl font-semibold">
                    {formData.firstName} {formData.lastName}
                  </h2>
                  <p className="text-gray-500">{formData.jobTitle}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Gender</p>
                    <p className="text-gray-600">{formData.gender}</p>
                  </div>
                  <div>
                    <p className="font-medium">Country</p>
                    <p className="text-gray-600">{formData.country}</p>
                  </div>
                  <div>
                    <p className="font-medium">Experience</p>
                    <p className="text-gray-600">{formData.experienceLevel}</p>
                  </div>
                </div>

                <div>
                  <p className="font-medium">Skills</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {formData.skills.map((skill) => (
                      <Badge key={skill.id} variant="secondary">
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-medium">Bio</p>
                  <p className="text-gray-600 mt-1">{formData.bio}</p>
                </div>

                <div>
                  <p className="font-medium">Services ({formData.services.length})</p>
                  <div className="space-y-3 mt-2">
                    {formData.services.map((service, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-md">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{service.title}</h4>
                          <Badge variant="outline">{getSkillNameById(service.skillId)}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                        <p className="text-sm font-medium mt-2">Price: ${service.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="mt-8 flex justify-between">
            {currentStep > 1 ? (
              <Button variant="ghost" className="text-orange-500 flex items-center gap-2" onClick={handleBack}>
                <ChevronLeft size={16} />
                Back
              </Button>
            ) : (
              <div></div>
            )}

            {currentStep < 5 ? (
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 rounded-full" onClick={handleNext}>
                Continue
              </Button>
            ) : (
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 rounded-full"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Completing..." : "Complete"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}



"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, PlusCircle, Trash2, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import ProgressIndicator from "../ui/progress-indicator"
import ProfilePhotoUpload from "../ui/upload"
import { useGetExpertProfileMutation } from "@/states/features/endpoints/expert/expertApiSlice"
import SkillsSelector, { type Skill } from "../skills/Skills"
import CountrySelector from "../country/CountrySelector"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Define the service structure
interface Service {
  id?: string
  skillId: string
  title: string
  description: string
  price: string
  isActive: boolean
}

// Define the portfolio item structure
interface PortfolioItem {
  id?: string
  title: string
  image: string // base64 encoded image
  file?: File // For temporary storage during upload
}

// Define the form data structure
interface ProfileFormData {
  profilePhoto?: File | null
  firstName: string
  lastName: string
  gender: string
  country: string
  jobTitle: string
  skills: Skill[]
  experienceLevel: string
  bio: string
  title: string
  services: Service[]
  portfolio: PortfolioItem[]
}

export default function ExpertProfileSetup({ id }: { id: string }) {
  const router = useRouter()

  const [getExpertProfile, { isLoading }] = useGetExpertProfileMutation()

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)
  const [formData, setFormData] = useState<ProfileFormData>({
    profilePhoto: null,
    firstName: "",
    lastName: "",
    gender: "",
    country: "",
    jobTitle: "",
    skills: [],
    experienceLevel: "",
    bio: "",
    title: "",
    services: [],
    portfolio: [],
  })

  useEffect(() => {
    const fetchClientProfile = async () => {
      try {
        const response = await getExpertProfile({ expert_id: id }).unwrap()
        if (response.profile_picture) {
          setProfileImageUrl(response.profile_picture)
        }

        setFormData((prev) => ({
          ...prev,
          firstName: response.first_name || "",
          lastName: response.last_name || "",
          gender: response.gender || "",
          country: response.country || "",
          bio: response.bio || "",
          skills: response.skills || [],
          title: response.title || "",
          services: response.services || [],
          portfolio: response.portfolio || [],
        }))
      } catch (err) {
        toast.error("Failed to load client profile. Please try again.")
      }
    }
    fetchClientProfile()
  }, [id, getExpertProfile])

  // Update form data
  const updateFormData = (field: keyof ProfileFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Handle photo upload
  const handlePhotoUpload = async (file: File | null) => {
    if (!file) return
    updateFormData("profilePhoto", file)
  }

  // Handle skills update
  const handleSkillsUpdate = (skills: Skill[]) => {
    updateFormData("skills", skills)
  }

  // Add a new service
  const addService = () => {
    if (formData.services.length >= 3) {
      toast.error("You can add a maximum of 3 services")
      return
    }

    const newService: Service = {
      skillId: formData.skills.length > 0 ? formData.skills[0].id : "",
      title: "",
      description: "",
      price: "",
      isActive: true,
    }

    updateFormData("services", [...formData.services, newService])
  }

  // Update a service
  const updateService = (index: number, field: keyof Service, value: any) => {
    const updatedServices = [...formData.services]
    updatedServices[index] = { ...updatedServices[index], [field]: value }
    updateFormData("services", updatedServices)
  }

  // Remove a service
  const removeService = (index: number) => {
    const updatedServices = formData.services.filter((_, i) => i !== index)
    updateFormData("services", updatedServices)
  }

  // Add a new portfolio item
  const addPortfolioItem = () => {
    if (formData.portfolio.length >= 5) {
      toast.error("You can add a maximum of 5 portfolio items")
      return
    }

    const newPortfolioItem: PortfolioItem = {
      title: "",
      image: "",
    }

    updateFormData("portfolio", [...formData.portfolio, newPortfolioItem])
  }

  // Update a portfolio item
  const updatePortfolioItem = (index: number, field: keyof PortfolioItem, value: any) => {
    const updatedPortfolio = [...formData.portfolio]
    updatedPortfolio[index] = { ...updatedPortfolio[index], [field]: value }
    updateFormData("portfolio", updatedPortfolio)
  }

  // Remove a portfolio item
  const removePortfolioItem = (index: number) => {
    const updatedPortfolio = formData.portfolio.filter((_, i) => i !== index)
    updateFormData("portfolio", updatedPortfolio)
  }

  // Handle portfolio image upload
  const handlePortfolioImageUpload = async (index: number, file: File) => {
    if (!file) return

    try {
      // Convert the file to base64
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        updatePortfolioItem(index, "image", base64String)
        updatePortfolioItem(index, "file", file)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error("Error uploading portfolio image:", error)
      toast.error("Failed to upload image. Please try again.")
    }
  }

  // Navigate to next step
  const handleNext = () => {
    // Validate current step
    if (currentStep === 1) {
      if (!formData.firstName || !formData.lastName || !formData.gender || !formData.country) {
        toast.error("Please fill in all required fields")
        return
      }
    } else if (currentStep === 2) {
      if (formData.skills.length === 0) {
        toast.error("Please select at least one skill")
        return
      }
    } else if (currentStep === 3) {
      if (formData.services.length === 0) {
        toast.error("Please add at least one service")
        return
      }

      // Validate each service
      for (let i = 0; i < formData.services.length; i++) {
        const service = formData.services[i]
        if (!service.skillId || !service.title || !service.description || !service.price) {
          toast.error(`Please complete all fields for Service ${i + 1}`)
          return
        }
      }
    } else if (currentStep === 4) {
      if (!formData.bio) {
        toast.error("Please enter your bio")
        return
      }
    } else if (currentStep === 5) {
      // Validate portfolio items if any exist
      for (let i = 0; i < formData.portfolio.length; i++) {
        const item = formData.portfolio[i]
        if (!item.title || !item.image) {
          toast.error(`Please complete all fields for Portfolio item ${i + 1}`)
          return
        }
      }
    }

    // Move to next step
    setCurrentStep((prev) => prev + 1)
    window.scrollTo(0, 0)
  }

  // Navigate to previous step
  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
    window.scrollTo(0, 0)
  }

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // In a real app, you would submit the form data to your API
      console.log("Submitting form data:", formData)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast.success("Profile setup completed successfully!")
      router.push("/dashboard")
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Failed to complete profile setup. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get skill name by ID
  const getSkillNameById = (skillId: string) => {
    const skill = formData.skills.find((s) => s.id === skillId)
    return skill ? skill.name : "Unknown Skill"
  }

  return (
    <div className="flex flex-col">
      {/* Progress bar */}
      <div className="w-full h-2 bg-orange-100">
        <div
          className="h-full bg-orange-500 transition-all duration-300"
          style={{ width: `${(currentStep / 6) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex">
        {/* Left sidebar with progress indicator */}
        <div className="hidden md:block w-24 border-r p-6">
          <ProgressIndicator currentStep={currentStep} totalSteps={6} />
        </div>

        {/* Main content */}
        <div className="flex-1 py-8 px-4 md:px-12 max-w-3xl mx-auto w-full">
          {/* Step 1: Basic Profile */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h1 className="text-2xl md:text-5xl font-bold text-primary-900 text-center">
                Welcome! Let's get your new profile all set up.
              </h1>

              <div className="flex flex-col items-center mb-6">
                <p className="text-sm text-gray-500 mb-2">Upload a clear profile photo (Optional)</p>
                <ProfilePhotoUpload onPhotoUpload={handlePhotoUpload} initialImage={profileImageUrl} />
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="firstName">First name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateFormData("firstName", e.target.value)}
                    placeholder="First name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="lastName">Last name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => updateFormData("lastName", e.target.value)}
                    placeholder="Last name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="gender">Your gender *</Label>
                  <Select value={formData.gender} onValueChange={(value) => updateFormData("gender", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="country">Which country do you live in? *</Label>
                  <CountrySelector
                    value={formData.country}
                    onValueChange={(value) => updateFormData("country", value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Skills & Experience */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h1 className="text-2xl md:text-3xl font-bold text-primary-900 text-center">
                What's your Skills & Level of Experience?
              </h1>

              <div className="space-y-6">
                <div>
                  <Label>What are your key skills? (Up to 2 things) *</Label>
                  <SkillsSelector selectedSkills={formData.skills} onSkillsChange={handleSkillsUpdate} />
                  <p className="text-xs text-gray-500 mt-1">Your expertise</p>
                </div>

                <div>
                  <Label htmlFor="jobTitle">Your professional title *</Label>
                  <Input
                    id="jobTitle"
                    value={formData.jobTitle}
                    onChange={(e) => updateFormData("jobTitle", e.target.value)}
                    placeholder="Eg: Product Designer, Writer, etc."
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="experienceLevel">Your experience level *</Label>
                  <Select
                    value={formData.experienceLevel}
                    onValueChange={(value) => updateFormData("experienceLevel", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                      <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                      <SelectItem value="advanced">Advanced (5-10 years)</SelectItem>
                      <SelectItem value="expert">Expert (10+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Services */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h1 className="text-2xl md:text-3xl font-bold text-primary-900 text-center">
                What services will you offer?
              </h1>

              <div className="relative w-full h-40 mb-6 rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg?height=160&width=600"
                  alt="Services illustration"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end">
                  <div className="p-4 text-center w-full">
                    <h3 className="text-lg font-semibold text-white">Link your services to your skills</h3>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {formData.services.map((service, index) => (
                  <Card key={index} className="relative">
                    <CardContent className="pt-6">
                      <div className="absolute top-2 right-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeService(index)}
                          className="h-8 w-8 text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>

                      <h3 className="font-medium mb-4">Service {index + 1}</h3>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor={`service-skill-${index}`}>Link to Skill *</Label>
                          <Select
                            value={service.skillId}
                            onValueChange={(value) => updateService(index, "skillId", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a skill" />
                            </SelectTrigger>
                            <SelectContent>
                              {formData.skills.map((skill) => (
                                <SelectItem key={skill.id} value={skill.id}>
                                  {skill.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor={`service-title-${index}`}>Service Title *</Label>
                          <Input
                            id={`service-title-${index}`}
                            value={service.title}
                            onChange={(e) => updateService(index, "title", e.target.value)}
                            placeholder="E.g., Logo Design, Content Writing"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor={`service-description-${index}`}>Description *</Label>
                          <Textarea
                            id={`service-description-${index}`}
                            value={service.description}
                            onChange={(e) => updateService(index, "description", e.target.value)}
                            placeholder="Describe what you offer in this service"
                            className="h-24"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor={`service-price-${index}`}>Price *</Label>
                          <Input
                            id={`service-price-${index}`}
                            type="number"
                            value={service.price}
                            onChange={(e) => updateService(index, "price", e.target.value)}
                            placeholder="0.00"
                            required
                          />
                          <p className="text-xs text-gray-500 mt-1">Enter price in your local currency</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {formData.services.length < 3 && (
                  <Button
                    variant="outline"
                    className="w-full border-dashed border-2 py-6 flex items-center justify-center gap-2"
                    onClick={addService}
                  >
                    <PlusCircle size={18} />
                    Add Service {formData.services.length + 1}
                  </Button>
                )}

                {formData.services.length === 0 && (
                  <div className="text-center text-gray-500 py-4">
                    You haven't added any services yet. Click the button above to add your first service.
                  </div>
                )}

                {formData.services.length === 3 && (
                  <p className="text-sm text-amber-600 text-center">Maximum of 3 services reached</p>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Bio */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h1 className="text-2xl md:text-3xl font-bold text-primary-900 text-center">Tell us about yourself</h1>

              <div>
                <Label htmlFor="bio">Short description about yourself and your expertise.</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => updateFormData("bio", e.target.value)}
                  placeholder="Write a brief professional bio..."
                  className="h-32"
                  required
                />
              </div>
            </div>
          )}

          {/* Step 5: Portfolio */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h1 className="text-2xl md:text-3xl font-bold text-primary-900 text-center">Showcase your work</h1>

              <div className="relative w-full h-40 mb-6 rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg?height=160&width=600"
                  alt="Portfolio illustration"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end">
                  <div className="p-4 text-center w-full">
                    <h3 className="text-lg font-semibold text-white">Add your best work to your portfolio</h3>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {formData.portfolio.map((item, index) => (
                  <Card key={index} className="relative">
                    <CardContent className="pt-6">
                      <div className="absolute top-2 right-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removePortfolioItem(index)}
                          className="h-8 w-8 text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>

                      <h3 className="font-medium mb-4">Project {index + 1}</h3>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor={`portfolio-title-${index}`}>Project Title *</Label>
                          <Input
                            id={`portfolio-title-${index}`}
                            value={item.title}
                            onChange={(e) => updatePortfolioItem(index, "title", e.target.value)}
                            placeholder="E.g., Website Redesign, Logo Collection"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor={`portfolio-image-${index}`}>Project Image *</Label>
                          {item.image ? (
                            <div className="relative mt-2">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.title || `Project ${index + 1}`}
                                className="w-full h-48 object-cover rounded-md"
                              />
                              <Button
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white bg-opacity-70"
                                onClick={() => updatePortfolioItem(index, "image", "")}
                              >
                                <X size={16} />
                              </Button>
                            </div>
                          ) : (
                            <div className="mt-2">
                              <label
                                htmlFor={`portfolio-image-upload-${index}`}
                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50"
                              >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <Upload className="w-8 h-8 text-gray-400" />
                                  <p className="mt-2 text-sm text-gray-500">Click to upload an image</p>
                                  <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>
                                </div>
                                <input
                                  id={`portfolio-image-upload-${index}`}
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      handlePortfolioImageUpload(index, e.target.files[0])
                                    }
                                  }}
                                />
                              </label>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {formData.portfolio.length < 5 && (
                  <Button
                    variant="outline"
                    className="w-full border-dashed border-2 py-6 flex items-center justify-center gap-2"
                    onClick={addPortfolioItem}
                  >
                    <PlusCircle size={18} />
                    Add Project {formData.portfolio.length + 1}
                  </Button>
                )}

                {formData.portfolio.length === 0 && (
                  <div className="text-center text-gray-500 py-4">
                    You haven't added any portfolio items yet. Click the button above to add your first project.
                  </div>
                )}

                {formData.portfolio.length === 5 && (
                  <p className="text-sm text-amber-600 text-center">Maximum of 5 portfolio items reached</p>
                )}
              </div>
            </div>
          )}

          {/* Step 6: Review */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <h1 className="text-2xl md:text-3xl font-bold text-primary-900 text-center">Review Your Profile</h1>

              <div className="space-y-6">
                <div className="flex flex-col items-center">
                  {profileImageUrl ? (
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-2">
                      <img
                        src={profileImageUrl || "/placeholder.svg"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                      <span className="text-2xl text-gray-500">
                        {formData.firstName.charAt(0)}
                        {formData.lastName.charAt(0)}
                      </span>
                    </div>
                  )}
                  <h2 className="text-xl font-semibold">
                    {formData.firstName} {formData.lastName}
                  </h2>
                  <p className="text-gray-500">{formData.jobTitle}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Gender</p>
                    <p className="text-gray-600">{formData.gender}</p>
                  </div>
                  <div>
                    <p className="font-medium">Country</p>
                    <p className="text-gray-600">{formData.country}</p>
                  </div>
                  <div>
                    <p className="font-medium">Experience</p>
                    <p className="text-gray-600">{formData.experienceLevel}</p>
                  </div>
                </div>

                <div>
                  <p className="font-medium">Skills</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {formData.skills.map((skill) => (
                      <Badge key={skill.id} variant="secondary">
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-medium">Bio</p>
                  <p className="text-gray-600 mt-1">{formData.bio}</p>
                </div>

                <div>
                  <p className="font-medium">Services ({formData.services.length})</p>
                  <div className="space-y-3 mt-2">
                    {formData.services.map((service, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-md">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{service.title}</h4>
                          <Badge variant="outline">{getSkillNameById(service.skillId)}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                        <p className="text-sm font-medium mt-2">Price: ${service.price}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {formData.portfolio.length > 0 && (
                  <div>
                    <p className="font-medium">Portfolio ({formData.portfolio.length})</p>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      {formData.portfolio.map((item, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-md">
                          <div className="aspect-w-16 aspect-h-9 mb-2">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.title}
                              className="w-full h-32 object-cover rounded-md"
                            />
                          </div>
                          <h4 className="font-medium text-sm">{item.title}</h4>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="mt-8 flex justify-between">
            {currentStep > 1 ? (
              <Button variant="ghost" className="text-orange-500 flex items-center gap-2" onClick={handleBack}>
                <ChevronLeft size={16} />
                Back
              </Button>
            ) : (
              <div></div>
            )}

            {currentStep < 6 ? (
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 rounded-full" onClick={handleNext}>
                Continue
              </Button>
            ) : (
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 rounded-full"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Completing..." : "Complete Profile"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, PlusCircle, Trash2, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import ProgressIndicator from "../ui/progress-indicator"
import ProfilePhotoUpload from "../ui/upload"
import { useGetExpertProfileMutation } from "@/states/features/endpoints/expert/expertApiSlice"
import SkillsSelector, { type Skill } from "../skills/Skills"
import CountrySelector from "../country/CountrySelector"
import { Card, CardContent } from "@/components/ui/card"

// Define types
interface Service {
  id?: string
  skillId: string
  title: string
  description: string
  price: string
  isActive: boolean
}

interface PortfolioItem {
  title: string
  image: string // base64 encoded image
  file?: File // For temporary storage during upload
}

interface ProfileFormData {
  profilePhoto?: File | null
  firstName: string
  lastName: string
  gender: string
  country: string
  jobTitle: string
  skills: Skill[]
  experienceLevel: string
  bio: string
  title: string
  services: Service[]
  portfolio: PortfolioItem[]
}

// Constants
const MAX_SERVICES = 3
const MAX_PORTFOLIO_ITEMS = 5
const TOTAL_STEPS = 5

export default function ExpertProfileSetup({ id }: { id: string }) {
  const router = useRouter()
  const [getExpertProfile, { isLoading }] = useGetExpertProfileMutation()

  // State
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)
  const [formData, setFormData] = useState<ProfileFormData>({
    profilePhoto: null,
    firstName: "",
    lastName: "",
    gender: "",
    country: "",
    jobTitle: "",
    skills: [],
    experienceLevel: "",
    bio: "",
    title: "",
    services: [],
    portfolio: [],
  })

  // Fetch profile data
  useEffect(() => {
    const fetchClientProfile = async () => {
      try {
        const response = await getExpertProfile({ expert_id: id }).unwrap()

        if (response.profile_picture) {
          setProfileImageUrl(response.profile_picture)
        }

        setFormData((prev) => ({
          ...prev,
          firstName: response.first_name || "",
          lastName: response.last_name || "",
          gender: response.gender || "",
          country: response.country || "",
          bio: response.bio || "",
          skills: response.skills || [],
          title: response.title || "",
          services: response.service || [],
          portfolio: response.portfolio || [],
        }))
      } catch (err) {
        toast.error("Failed to load client profile. Please try again.")
      }
    }

    fetchClientProfile()
  }, [id, getExpertProfile])

  // Helper functions
  const updateFormData = (field: keyof ProfileFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePhotoUpload = async (file: File | null) => {
    if (!file) return
    updateFormData("profilePhoto", file)
  }

  const handleSkillsUpdate = (skills: Skill[]) => {
    updateFormData("skills", skills)
  }

  // Service management
  const addService = () => {
    if (formData.services.length >= MAX_SERVICES) {
      toast.error(`You can add a maximum of ${MAX_SERVICES} services`)
      return
    }

    const newService: Service = {
      skillId: formData.skills.length > 0 ? formData.skills[0].id : "",
      title: "",
      description: "",
      price: "",
      isActive: true,
    }

    updateFormData("services", [...formData.services, newService])
  }

  const updateService = (index: number, field: keyof Service, value: any) => {
    const updatedServices = [...formData.services]
    updatedServices[index] = { ...updatedServices[index], [field]: value }
    updateFormData("services", updatedServices)
  }

  const removeService = (index: number) => {
    const updatedServices = formData.services.filter((_, i) => i !== index)
    updateFormData("services", updatedServices)
  }

  // Portfolio management
  const addPortfolioItem = () => {
    if (formData.portfolio.length >= MAX_PORTFOLIO_ITEMS) {
      toast.error(`You can add a maximum of ${MAX_PORTFOLIO_ITEMS} portfolio items`)
      return
    }

    const newPortfolioItem: PortfolioItem = {
      title: "",
      image: "",
    }

    updateFormData("portfolio", [...formData.portfolio, newPortfolioItem])
  }

  const updatePortfolioItem = (index: number, field: keyof PortfolioItem, value: any) => {
    const updatedPortfolio = [...formData.portfolio]
    updatedPortfolio[index] = { ...updatedPortfolio[index], [field]: value }
    updateFormData("portfolio", updatedPortfolio)
  }

  const removePortfolioItem = (index: number) => {
    const updatedPortfolio = formData.portfolio.filter((_, i) => i !== index)
    updateFormData("portfolio", updatedPortfolio)
  }

  const handlePortfolioImageUpload = async (index: number, file: File) => {
    if (!file) return

    try {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        updatePortfolioItem(index, "image", base64String)
        updatePortfolioItem(index, "file", file)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error("Error uploading portfolio image:", error)
      toast.error("Failed to upload image. Please try again.")
    }
  }

  // Navigation and submission
  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1:
        if (!formData.firstName || !formData.lastName || !formData.gender || !formData.country) {
          toast.error("Please fill in all required fields")
          return false
        }
        return true

      case 2:
        if (formData.skills.length === 0) {
          toast.error("Please select at least one skill")
          return false
        }
        return true

      case 3:
        if (formData.services.length === 0) {
          toast.error("Please add at least one service")
          return false
        }

        for (let i = 0; i < formData.services.length; i++) {
          const service = formData.services[i]
          if (!service.skillId || !service.title || !service.description || !service.price) {
            toast.error(`Please complete all fields for Service ${i + 1}`)
            return false
          }
        }
        return true

      case 4:
        if (!formData.bio) {
          toast.error("Please enter your bio")
          return false
        }
        return true

      case 5:
        for (let i = 0; i < formData.portfolio.length; i++) {
          const item = formData.portfolio[i]
          if (!item.title || !item.image) {
            toast.error(`Please complete all fields for Portfolio item ${i + 1}`)
            return false
          }
        }
        return true

      default:
        return true
    }
  }

  const handleNext = () => {
    if (!validateCurrentStep()) return

    setCurrentStep((prev) => prev + 1)
    window.scrollTo(0, 0)
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
    window.scrollTo(0, 0)
  }

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return

    setIsSubmitting(true)

    try {
      // In a real app, you would submit the form data to your API
      console.log("Submitting form data:", formData)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast.success("Profile setup completed successfully!")
      router.push("/dashboard")
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Failed to complete profile setup. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getSkillNameById = (skillId: string) => {
    const skill = formData.skills.find((s) => s.id === skillId)
    return skill ? skill.name : "Unknown Skill"
  }

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderBasicProfileStep()
      case 2:
        return renderSkillsStep()
      case 3:
        return renderServicesStep()
      case 4:
        return renderBioStep()
      case 5:
        return renderPortfolioStep()
      default:
        return null
    }
  }

  // Step renderers
  const renderBasicProfileStep = () => (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-5xl font-bold text-primary-900 text-center">
        Welcome! Let's get your new profile all set up.
      </h1>

      <div className="flex flex-col items-center mb-6">
        <p className="text-sm text-gray-500 mb-2">Upload a clear profile photo (Optional)</p>
        <ProfilePhotoUpload onPhotoUpload={handlePhotoUpload} initialImage={profileImageUrl} />
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="firstName">First name *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => updateFormData("firstName", e.target.value)}
            placeholder="First name"
            required
          />
        </div>

        <div>
          <Label htmlFor="lastName">Last name *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => updateFormData("lastName", e.target.value)}
            placeholder="Last name"
            required
          />
        </div>

        <div>
          <Label htmlFor="gender">Your gender *</Label>
          <Select value={formData.gender} onValueChange={(value) => updateFormData("gender", value)}>
            <SelectTrigger>
              <SelectValue placeholder="--Select--" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="country">Which country do you live in? *</Label>
          <CountrySelector value={formData.country} onValueChange={(value) => updateFormData("country", value)} />
        </div>
      </div>
    </div>
  )

  const renderSkillsStep = () => (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-primary-900 text-center">
        What's your Skills & Level of Experience?
      </h1>

      <div className="space-y-6">
        <div>
          <Label>What are your key skills? (Up to 2 things) *</Label>
          <SkillsSelector selectedSkills={formData.skills} onSkillsChange={handleSkillsUpdate} />
          <p className="text-xs text-gray-500 mt-1">Your expertise</p>
        </div>

        <div>
          <Label htmlFor="jobTitle">Your professional title *</Label>
          <Input
            id="jobTitle"
            value={formData.jobTitle}
            onChange={(e) => updateFormData("jobTitle", e.target.value)}
            placeholder="Eg: Product Designer, Writer, etc."
            required
          />
        </div>

        <div>
          <Label htmlFor="experienceLevel">Your experience level *</Label>
          <Select value={formData.experienceLevel} onValueChange={(value) => updateFormData("experienceLevel", value)}>
            <SelectTrigger>
              <SelectValue placeholder="--Select--" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
              <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
              <SelectItem value="advanced">Advanced (5-10 years)</SelectItem>
              <SelectItem value="expert">Expert (10+ years)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )

  const renderServicesStep = () => (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-primary-900 text-center">What services will you offer?</h1>

      <div className="relative w-full h-40 mb-6 rounded-lg overflow-hidden">
        <img
          src="/placeholder.svg?height=160&width=600"
          alt="Services illustration"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end">
          <div className="p-4 text-center w-full">
            <h3 className="text-lg font-semibold text-white">Link your services to your skills</h3>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {formData.services.map((service, index) => (
          <Card key={index} className="relative">
            <CardContent className="pt-6">
              <div className="absolute top-2 right-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeService(index)}
                  className="h-8 w-8 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </Button>
              </div>

              <h3 className="font-medium mb-4">Service {index + 1}</h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor={`service-skill-${index}`}>Link to Skill *</Label>
                  <Select value={service.skillId} onValueChange={(value) => updateService(index, "skillId", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a skill" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.skills.map((skill) => (
                        <SelectItem key={skill.id} value={skill.id}>
                          {skill.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor={`service-title-${index}`}>Service Title *</Label>
                  <Input
                    id={`service-title-${index}`}
                    value={service.title}
                    onChange={(e) => updateService(index, "title", e.target.value)}
                    placeholder="E.g., Logo Design, Content Writing"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor={`service-description-${index}`}>Description *</Label>
                  <Textarea
                    id={`service-description-${index}`}
                    value={service.description}
                    onChange={(e) => updateService(index, "description", e.target.value)}
                    placeholder="Describe what you offer in this service"
                    className="h-24"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor={`service-price-${index}`}>Price *</Label>
                  <Input
                    id={`service-price-${index}`}
                    type="number"
                    value={service.price}
                    onChange={(e) => updateService(index, "price", e.target.value)}
                    placeholder="0.00"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter price in your local currency</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {formData.services.length < MAX_SERVICES && (
          <Button
            variant="outline"
            className="w-full border-dashed border-2 py-6 flex items-center justify-center gap-2"
            onClick={addService}
          >
            <PlusCircle size={18} />
            Add Service {formData.services.length + 1}
          </Button>
        )}

        {formData.services.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            You haven't added any services yet. Click the button above to add your first service.
          </div>
        )}

        {formData.services.length === MAX_SERVICES && (
          <p className="text-sm text-amber-600 text-center">Maximum of {MAX_SERVICES} services reached</p>
        )}
      </div>
    </div>
  )

  const renderBioStep = () => (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-primary-900 text-center">Tell us about yourself</h1>

      <div>
        <Label htmlFor="bio">Short description about yourself and your expertise.</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => updateFormData("bio", e.target.value)}
          placeholder="Write a brief professional bio..."
          className="h-32"
          required
        />
      </div>
    </div>
  )

  const renderPortfolioStep = () => (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-primary-900 text-center">Showcase your work</h1>

      <div className="relative w-full h-40 mb-6 rounded-lg overflow-hidden">
        <img
          src="/placeholder.svg?height=160&width=600"
          alt="Portfolio illustration"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end">
          <div className="p-4 text-center w-full">
            <h3 className="text-lg font-semibold text-white">Add your best work to your portfolio</h3>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {formData.portfolio.map((item, index) => (
          <Card key={index} className="relative">
            <CardContent className="pt-6">
              <div className="absolute top-2 right-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removePortfolioItem(index)}
                  className="h-8 w-8 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </Button>
              </div>

              <h3 className="font-medium mb-4">Project {index + 1}</h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor={`portfolio-title-${index}`}>Project Title *</Label>
                  <Input
                    id={`portfolio-title-${index}`}
                    value={item.title}
                    onChange={(e) => updatePortfolioItem(index, "title", e.target.value)}
                    placeholder="E.g., Website Redesign, Logo Collection"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor={`portfolio-image-${index}`}>Project Image *</Label>
                  {item.image ? (
                    <div className="relative mt-2">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title || `Project ${index + 1}`}
                        className="w-full h-48 object-cover rounded-md"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white bg-opacity-70"
                        onClick={() => updatePortfolioItem(index, "image", "")}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  ) : (
                    <div className="mt-2">
                      <label
                        htmlFor={`portfolio-image-upload-${index}`}
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-500">Click to upload an image</p>
                          <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>
                        </div>
                        <input
                          id={`portfolio-image-upload-${index}`}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handlePortfolioImageUpload(index, e.target.files[0])
                            }
                          }}
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {formData.portfolio.length < MAX_PORTFOLIO_ITEMS && (
          <Button
            variant="outline"
            className="w-full border-dashed border-2 py-6 flex items-center justify-center gap-2"
            onClick={addPortfolioItem}
          >
            <PlusCircle size={18} />
            Add Project {formData.portfolio.length + 1}
          </Button>
        )}

        {formData.portfolio.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            You haven't added any portfolio items yet. Click the button above to add your first project.
          </div>
        )}

        {formData.portfolio.length === MAX_PORTFOLIO_ITEMS && (
          <p className="text-sm text-amber-600 text-center">Maximum of {MAX_PORTFOLIO_ITEMS} portfolio items reached</p>
        )}
      </div>
    </div>
  )

  return (
    <div className="flex flex-col">
      {/* Progress bar */}
      <div className="w-full h-2 bg-orange-100">
        <div
          className="h-full bg-orange-500 transition-all duration-300"
          style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex">
        {/* Left sidebar with progress indicator */}
        <div className="hidden md:block w-24 border-r p-6">
          <ProgressIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        </div>

        {/* Main content */}
        <div className="flex-1 py-8 px-4 md:px-12 max-w-3xl mx-auto w-full">
          {/* Step content */}
          {renderStepContent()}

          {/* Navigation buttons */}
          <div className="mt-8 flex justify-between">
            {currentStep > 1 ? (
              <Button variant="ghost" className="text-orange-500 flex items-center gap-2" onClick={handleBack}>
                <ChevronLeft size={16} />
                Back
              </Button>
            ) : (
              <div></div>
            )}

            {currentStep < TOTAL_STEPS ? (
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 rounded-full" onClick={handleNext}>
                Continue
              </Button>
            ) : (
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 rounded-full"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Completing..." : "Complete"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

