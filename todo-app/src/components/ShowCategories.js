import { useState, useEffect } from "react";
import { useAuth } from '@clerk/nextjs';
import { getCategoryCompletedList, editTodoItem } from "@/modules/Data.js";

export default function ShowCategories( { category } ){
    
    const [items,setitems] = useState([]);
    const [newTodoItem, setnewTodoItem] = useState("");
    const [allowEdit,setAllowEdit] = useState(false);
    const { isLoaded, userId, getToken } = useAuth();

    useEffect(() => {
        async function process() {
            if(userId){
                try {
                    const token = await getToken({ template: "productivitycorner" });
                    const res = await getCategoryCompletedList(token,userId,category);    //Get a list of all completed todo items from a certain category
                    return res;
                }catch (error) {
                    console.error('Failed to open todo item', error);
                    return [];
                }
            }
        }
        process().then((res) => {
            console.log(res);
            setitems(res);
        });
    }, [isLoaded,!allowEdit])

    async function viewAndEditTask(){
        if(openItem && userId){
            const token = await getToken({ template: "productivitycorner" })
            await editTodoItem(token,userId,id,openItem);
            setAllowEdit(false);
        }
    }

    function setToEdit(){
        setAllowEdit(true);
    }

    if(!isLoaded) {
        return (<span> Loading {`:)`} </span>);
    } else {
        let openTaskContents = <div>HELLO there sir</div>;
        if(allowEdit){
            <div>Doing some other stuff</div>
        }else{
            <div>Doing some stuff</div>
        }

        return (
            <div>
                {openTaskContents}
            </div>
        );
    }
}