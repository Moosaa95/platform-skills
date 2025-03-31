"use client"
import { RequestSkillsModal } from "@/components/modal/request-skills-modal";
import React, { useEffect, useState } from "react";


export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        // Correctly update the state
        setIsMounted(true)
    }, [])

    // Prevent rendering on the server
    if (!isMounted){
        return null
    }

    return (
        <>
            <RequestSkillsModal />
        </>
    )
}