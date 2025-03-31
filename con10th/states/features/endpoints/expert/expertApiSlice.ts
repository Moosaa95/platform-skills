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

export interface ProfileUpdateData {
   expert_id: string;
  first_name?: string
  last_name?: string
  bio?: string
  phone_number?: string
  address?: string
  date_of_birth?: string
  has_agreed_to_terms?: boolean
  gender?: string
  country?: string
}



const expertApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // EXPERT
        getExpertProfile: builder.mutation({
            query: ({expert_id}) => ({
              url: '/get_expert',
              method: 'POST',
              body: {expert_id}
            }),
        }),
        updateExpertProfileDetails: builder.mutation<ExpertProfile, ProfileUpdateData>({
            query: (body) => ({
                url: '/update_expert_profile',
                method: 'POST',
                body
            })
        }),
        updateExpertProfilePicture: builder.mutation<ExpertProfile, {expert_id:string; photo: File}>({
            query: (body) => {
                const formData = new FormData()
                formData.append("profile_picture", body.photo)
                formData.append("expert_id", body.expert_id)
                console.log(formData.get("profile_picture"));
                
                return {
                    url: '/update_expert_photo',
                    method: 'POST',
                    body: formData,
            }
            }
        }),
        
    }),
});

export const {
    useGetExpertProfileMutation,
    useUpdateExpertProfileDetailsMutation,
    useUpdateExpertProfilePictureMutation
} = expertApiSlice;