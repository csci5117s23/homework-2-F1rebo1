import ShowDoneCategories from "@/components/ShowDoneCategories";
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
                    <ShowDoneCategories category={category}></ShowDoneCategories>
                </SignedIn>
                <SignedOut>
                    <RedirectToSignIn />
                </SignedOut>
            </>
        );
    }
}