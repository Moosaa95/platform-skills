import ExpertProfileSetup from "../../../components/expert-profile/Setup";

export type paramsType = Promise<{ id: string }>;

export default async function ExpertSetup (props  : {params: paramsType}) {
    const {id} = await props.params
    return (
        <div className="">
            <ExpertProfileSetup id={id}  />
        </div>
    )
}