import { ReactNode } from "react";
import AuthNavbar from "../(auth)/auth-components/AuthNav";

export default function Layout({ children }:{children: ReactNode}) {
    return (
        <div className="">
            <AuthNavbar />
            <main className={`h-full w-full flex flex-col overflow-hidden`}>
                {children}
            </main>
        </div>
    )
}