import ClientProfileSetup from "../../../components/client-profile/Setup";

export type paramsType = Promise<{ id: string }>;


export default async function ProfileSetup( props: { params: paramsType }) {
    const {id} = await props.params
    return <ClientProfileSetup id={id} />;
}