import { ReactNode } from "react";
import Navbar from "../components/Navbar";

export default function Layout({ children }:{children: ReactNode}) {
    const NAVBARHEIGHT = 50
    return (
        <div className="h-full w-full">
            <Navbar />
            <main className={`h-full w-full flex flex-col`}
                style={{paddingTop: `${NAVBARHEIGHT}px`}}
            >
                {children}
            </main>
        </div>
    )
}