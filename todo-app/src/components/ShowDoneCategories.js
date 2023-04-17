import Sidebar from "@/components/sidebar";
import { useState, useEffect } from "react";
import { useAuth } from '@clerk/nextjs';
import { getCategoryCompletedList, getExistingDoneCategories } from "@/modules/Data.js";
import { useRouter } from "next/router";

export default function ShowDoneCategories( { category } ){
    
    const [items,setitems] = useState([]);
    const { isLoaded, userId, getToken } = useAuth();
    const router = useRouter();

    useEffect(() => {
        async function process() {
            if(userId){
                try {
                    const token = await getToken({ template: "productivitycorner" });
                    const res = await getCategoryCompletedList(token,userId,category)    //Get a list of all todo items from a certain category
                    const cats = (getExistingDoneCategories(token,userId)).then((res) => {return res.json()}).then((cats) => { if(cats.map((cat) => (cat.category)).indexOf(category) == -1) router.push('/404')});
                    console.log("CATEGORIES: " + cats);
                    return res;
                }catch (error) {
                    console.error('Failed to show tasks in this category', error);
                    return [];
                }
            }
        }
        process().then((res) => {
            console.log(res);
            setitems(res);
        }).catch(() => {
            router.push('/404');
        });
    }, [isLoaded])

    if(!isLoaded){
        return <span> Loading {`:)`} </span>
    }else{
        const itemList = items.map((item) => (
            <li key={item._id}>
                {item.taskDescription}<br></br>
            </li>
        ));
        return (
            <>
                <header className="head">
                    <h1>{category} done items!</h1>
                </header>
                <Sidebar></Sidebar>
                {itemList}
            </>
        );
    }
}