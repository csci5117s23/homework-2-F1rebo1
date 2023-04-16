import Sidebar from "@/components/sidebar";
import ShowCategories from "@/components/ShowCategories";
import { useRouter } from "next/router";
import { RedirectToSignIn, SignedIn, SignedOut, useAuth } from "@clerk/nextjs"

export default function ShowTask(){
    const router = useRouter();
    const { isLoaded, userId, getToken } = useAuth();

    const {category} = router.query;

    if(!isLoaded){
        return (<span>Loading {`:)`}</span>);
    }else{
        return (
            <>
                <SignedIn>
                    <header className="head">
                        <h1>Categories</h1>
                    </header>
                    <Sidebar></Sidebar>
                    <ShowCategories category={category}></ShowCategories>
                </SignedIn>
                <SignedOut>
                    <RedirectToSignIn />
                </SignedOut>
            </>
        );
    }
}