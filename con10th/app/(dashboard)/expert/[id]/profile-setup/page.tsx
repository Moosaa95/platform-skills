import ExpertProfileSetup from "../../../components/expert-profile/Setup";

export default function ExpertSetup ({params: {id}} : {params: {id: string}}) {
    return (
        <div className="">
            <ExpertProfileSetup id={id}  />
        </div>
    )
}