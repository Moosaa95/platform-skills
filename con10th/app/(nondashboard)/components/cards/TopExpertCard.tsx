import Link from "next/link";
import { ExpertCard, ExpertProps } from "./ExpertCard";


export function ExpertCardLink({...props }: ExpertProps) {
  return (
    <Link href={`/experts/2`}>
      <ExpertCard {...props} id={"2"} />
    </Link>
  )
}
