import Sidebar from "@/components/sidebar";
import { useState, useEffect } from "react";
import { useAuth } from '@clerk/nextjs';
import { getCategoryTodoList, editTodoItem } from "@/modules/Data.js";

export default function ShowCategories( { category } ){
    
    const [items,setitems] = useState([]);
    // const [newTodoItem, setnewTodoItem] = useState("");
    const [allowEdit,setAllowEdit] = useState(false);
    const { isLoaded, userId, getToken } = useAuth();

    useEffect(() => {
        async function process() {
            if(userId){
                try {
                    const token = await getToken({ template: "productivitycorner" });
                    const res = await getCategoryTodoList(token,userId,category)    //Get a list of all todo items from a certain category
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
        });
    }, [isLoaded,!allowEdit])

    if(!isLoaded){
        return <span> Loading {`:)`} </span>
    }else{
        const itemList = items.map((item) => (
            <li key={item._id}>
                {item.taskDescription}<br></br>
            </li>
        ));
        // console.log(itemList);
        return (
            <>
                <header className="head">
                    <h1>{category} todo items!</h1>
                </header>
                <Sidebar></Sidebar>
                {itemList}
                {/* <div className="flex-container">
                    <ul>
                        <textarea className="textarea is-primary" placeholder="Enter task description" value = {newTodoItem} rows="2"
                            onChange={(e) => setnewTodoItem(e.target.value)}
                            onKeyDown={(e) => { if(e.key === 'Enter'){addOrCreate()} }}></textarea>
                        <button className="button is-primary" onClick = {addOrCreate}>Add task</button>
                        {itemList}
                    </ul>
                </div> */}
                {/* <MakeItem></MakeItem> */}
            </>
        );
    }
}