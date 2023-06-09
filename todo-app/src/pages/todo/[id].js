import Sidebar from "@/components/sidebar";
import OpenTask from "@/components/OpenTask";
import { useRouter } from "next/router";
import { RedirectToSignIn, SignedIn, SignedOut, useAuth } from "@clerk/nextjs"

export default function ShowTask(){
    const router = useRouter();
    const { isLoaded, userId, getToken } = useAuth();

    const {id} = router.query;
    if(!isLoaded){
        return (<span>Loading {`:)`}</span>);
    }else{
        return (
            <>
                <SignedIn>
                    <header className="head">
                        <h1>View Task!</h1>
                    </header>
                    <Sidebar></Sidebar>
                    <OpenTask id={id}></OpenTask>
                </SignedIn>
                <SignedOut>
                    <RedirectToSignIn />
                </SignedOut>
            </>
        );
    }
}