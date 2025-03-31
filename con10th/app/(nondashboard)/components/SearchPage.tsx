"use client"

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
                marginTop: `${NAVBAR_HEIGHT}px`
            }}
        >
            <div className="flex justify-between flex-1 overflow-hidden gap-3 mb-5">
                <div 
                    className={`h-full overflow-auto transition-all duration-300 ease-in-out ${
                        isFiltersFullOpen 
                        ? "w-3/12 opacity-100 visible"
                        : "w-0 opacity-0 invisible"
                    }`}
                >

                </div>
            </div>

        </div>
    )
}