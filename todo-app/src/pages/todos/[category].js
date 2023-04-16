import Sidebar from "@/components/sidebar";
import ShowCategories from "@/components/ShowCategories";
import { useRouter } from "next/router";
import { RedirectToSignIn, SignedIn, SignedOut, useAuth } from "@clerk/nextjs"

export default function ShowTask(){
    const router = useRouter();
    const { isLoaded, userId, getToken } = useAuth();

    const curPath = router.asPath;
    const category = curPath.substring(curPath.lastIndexOf('/') + 1);

    if(!isLoaded){
        return (<span>Loading {`:)`}</span>);
    }else{
        return (
            <>
                <SignedIn>
                    <ShowCategories category={category}></ShowCategories>
                </SignedIn>
                <SignedOut>
                    <RedirectToSignIn />
                </SignedOut>
            </>
        );
    }
}