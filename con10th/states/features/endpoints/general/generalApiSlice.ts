import { apiSlice } from "@/states/services/apiSlice";



export interface ExpertProfile {
  id: string
  first_name: string
  last_name: string
  email: string
  bio: string
  phone_number: string
  address: string
  date_of_birth: string | null
  profile_picture: string | null
  has_agreed_to_terms: boolean
  is_profile_complete: boolean
  completion_percentage: number
}

interface SkillData {
    id: string;
    name: string
    code: string;
}

export interface SkillsProps {
  status: boolean;
  message?: string
  data: SkillData[]
}



const expertApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // EXPERT
        // KNOW: left response, right request (SKILLPROPS, void)
        getSkills: builder.mutation<SkillsProps, void>({
            query: () => ({
              url: '/services/skills',
              method: 'POST'
            }),
        }),
        // updateClientProfileDetails: builder.mutation<ExpertProfile, ProfileUpdateData>({
        //     query: (body) => ({
        //         url: '/update_expert_profile',
        //         method: 'POST',
        //         body
        //     })
        // }),
        // updateClientProfilePicture: builder.mutation<ExpertProfile, {expert_id:string; photo: File}>({
        //     query: (body) => {
        //         const formData = new FormData()
        //         formData.append("profile_picture", body.photo)
        //         formData.append("client_id", body.expert_id)
        //         console.log(formData.get("profile_picture"));
                
        //         return {
        //             url: '/update_expert_photo',
        //             method: 'POST',
        //             body: formData,
        //     }
        //     }
        // }),
        
    }),
});

export const {
    useGetSkillsMutation
} = expertApiSlice;