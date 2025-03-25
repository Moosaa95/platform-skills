import { useAppDispatch, useAppSelector } from "@/states/hooks"
import { useSearchParams } from "next/navigation"

export default function SearchPage() {
    const searchParams = useSearchParams()
    const dispatch = useAppDispatch();

    const isFiltersFullOpen = useAppSelector(
        state => state.global.isFilterFullOpen
    )

    const NAVBAR_HEIGHT = 50

    return (
        <div className="w-full mx-auto px-5 flex flex-col"
            style={{
                height: `cacl(100vh - ${NAVBAR_HEIGHT}px)`,
                marginTop: `${NAVBAR_HEIGHT}`
            }}
        >

        </div>
    )
}