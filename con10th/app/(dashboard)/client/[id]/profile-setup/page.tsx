import ClientProfileSetup from "../../../components/client-profile/Setup";

export default function ProfileSetup({params: {id}} : {params: {id: string}}) {
    console.log("IDDDD", id);
    
    return (
        <ClientProfileSetup id={id} />
    )
}