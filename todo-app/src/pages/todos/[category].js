import ShowTodoCategories from "@/components/ShowTodoCategories";
import { useRouter } from "next/router";
import { RedirectToSignIn, SignedIn, SignedOut, useAuth } from "@clerk/nextjs"

export default function ShowTask(){
    const router = useRouter();
    const { isLoaded, userId, getToken } = useAuth();
    const { category } = router.query;

    // async function checkCategory(){
    //     const token = await getToken({ template: "productivitycorner" })
    //     const cats = await getCategories(token,userId);
    //     if(!cats.includes(category)){
    //         router.push('/404');
    //     }
    // }

    if(!isLoaded){
        return (<span>Loading {`:)`}</span>);
    }else{
        
        return (
            <>
                <SignedIn>
                    <ShowTodoCategories category={category}></ShowTodoCategories>
                </SignedIn>
                <SignedOut>
                    <RedirectToSignIn />
                </SignedOut>
            </>
        );
    }
}