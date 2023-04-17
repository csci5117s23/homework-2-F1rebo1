import Sidebar from "@/components/sidebar";
import { useState, useEffect } from "react";
import { useAuth } from '@clerk/nextjs';
import { getCategoryTodoList, getExistingTodoCategories, addTodo, getTodos } from "@/modules/Data.js";
import { useRouter } from "next/router";

export default function ShowTodoCategories( { category } ){
    
    const [items,setitems] = useState([]);
    const { isLoaded, userId, getToken } = useAuth();
    const [newTodoItem, setnewTodoItem] = useState("");
    const [addNewTask, setaddNewTask] = useState(false);
    const [addItems,setaddItems] = useState([]);
    const router = useRouter();
    const [allowEdit,setAllowEdit] = useState(false);
    const [openItem,setOpenItem] = useState("");

    useEffect(() => {
        async function process() {
            if(userId){
                try {
                    const token = await getToken({ template: "productivitycorner" });
                    const res = await getCategoryTodoList(token,userId,category)    //Get a list of all todo items from a certain category
                    const cats = (getExistingTodoCategories(token,userId)).then((res) => {return res.json()}).then((cats) => { if(cats.map((cat) => (cat.category)).indexOf(category) == -1) router.push('/404')});
                    console.log("CATEGORIES: " + cats);
                    return res;
                }catch (error) {
                    console.error('Failed to show tasks in this category', error);
                    return [];
                }
            }
        }
        process().then((res) => {
            // console.log(res);
            setitems(res);
        }).catch(() => {
            router.push('/404');
        });
    }, [isLoaded,!allowEdit])

    async function addOrCreate() {
        if(newTodoItem && userId) {
            var item = {
                userId: userId,
                taskDescription: newTodoItem,
                isCompleted: false,
                category: category
            };
            const token = await getToken({ template: "productivitycorner" })
            await addTodo(token,item);
            const res = await getTodos(token,userId);
            // await setToDone(token,userId,todoItem._id);
            // setAddingTodo(true);
            setaddItems(res);
            setnewTodoItem("");
            setaddNewTask(true);
            setAllowEdit(!allowEdit);
            console.log("ShowTodoCategories.js addOrCreate res: " + item);
        }
    }

    if(!isLoaded){
        return <span> Loading {`:)`} </span>
    }else{
        const itemList = items.map((item) => (
            <li key={item._id}>
                {item.taskDescription}<br></br>
            </li>
        ));
        let openTaskContents;
        openTaskContents = (
            <>
                <h4>{openItem}</h4><br></br>
                <div className="flex-container">
                    <ul>
                        <textarea className="textarea is-primary" placeholder="Enter task description" value = {newTodoItem} rows="2"
                            onChange={(e) => setnewTodoItem(e.target.value)}
                            onKeyDown={(e) => { if(e.key === 'Enter'){addOrCreate()} }}></textarea>
                        <button className="button is-primary" onClick = {addOrCreate}>Add task</button>
                    </ul>
                </div>
            </>
        );
        return (
            <>
                <header className="head">
                    <h1>{category} todo items!</h1>
                </header>
                <Sidebar></Sidebar>
                {itemList}
                {openTaskContents}
                {/* <div className="flex-container">
                    <ul>
                        <textarea className="textarea is-primary" placeholder="Enter task description" value = {newTodoItem} rows="2"
                            onChange={(e) => setnewTodoItem(e.target.value)}
                            onKeyDown={(e) => { if(e.key === 'Enter'){addOrCreate()} }}></textarea>
                        <button className="button is-primary" onClick = {addOrCreate}>Add task</button>
                        <button className="button is-link" onClick={setAddCategory}>Set Category</button>
                    </ul>
                </div> */}
                {/* <MakeItem></MakeItem> */}
            </>
        );
    }
}