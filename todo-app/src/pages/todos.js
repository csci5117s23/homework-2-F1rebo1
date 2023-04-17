import Sidebar from "@/components/sidebar";
import { RedirectToSignIn, SignedIn, SignedOut, useAuth } from "@clerk/nextjs"
import { useState, useEffect } from "react";
import { getTodos, addTodo, setComplete, addCategory, getCategoriesFromCatYup, getCategories } from "@/modules/Data.js";
import Link from 'next/link';

export default function Todo(){
    const { isLoaded, userId, getToken } = useAuth();
    const [items,setItems] = useState([]);
    const [newTodoItem, setnewTodoItem] = useState("");
    const [addNewTask, setaddNewTask] = useState(false);
    const [addCategoryGroup,setAddCategoryGroup] = useState(false);
    const [addedCategoryName,setAddedCategoryName] = useState("");
    const [categoriesAdded,setcategoriesAdded] = useState([]);

    useEffect(() => {
        async function process() {
            if(userId){
                try {
                    const token = await getToken({ template: "productivitycorner" });
                    const res = await getTodos(token,userId);
                    // console.log(userId)
                    return res;
                } catch (error) {
                    console.error('Failed to get todos', error);
                    return [];
                }
            } else return [];
            
        }
        process().then((res) => {
            // console.log(res);
            setItems(res);
        }).catch(() => {
            router.push('/404');
        });
    }, [isLoaded])

    useEffect(() => {
        async function showCategories() {
            if(userId) {
                const token = await getToken({ template: "productivitycorner" })
                const res = await getCategories(token,userId);
                const data = await res.json();
                return data;
            }
        }
        showCategories().then((data) => {
            setcategoriesAdded(data?.map((x) => x.category));
            // console.log(res);
            // console.log("I am here 3: ");
            // console.log(categories);
            setAddCategoryGroup(false);
        })
    }, [isLoaded,addCategoryGroup])
    
    async function addOrCreate() {
        if(newTodoItem && userId) {
            var item = {
                userId: userId,
                taskDescription: newTodoItem,
                isCompleted: false,
                category: ""
            };
            const token = await getToken({ template: "productivitycorner" })
            console.log("todos.js addOrCreate No complaints yet");
            await addTodo(token,item);
            const cats = await getCategories(token,userId);
            console.log("Trying to Log categories: ");
            const data = await cats.json();
            console.log(data);
            setcategoriesAdded(data.map((x) => x.category))
            console.log("todos.js addOrCreate Are you complaining?");
            const res = await getTodos(token,userId);
            // await setToDone(token,userId,todoItem._id);
            // setAddingTodo(true);
            setItems(res);
            setnewTodoItem("");
            setaddNewTask(true);
            console.log(categoriesAdded);
            console.log("todos.js addOrCreate res: " + item);
        }
    }

    function addNewCat(){
        setAddCategoryGroup(true);
    }

    async function addOrCreateCategory(categoryDetails) {
        console.log("todos.js addOrCreateCategory Start");
        if(categoryDetails && userId) {
            var item = {
                userId: userId,
                category: categoryDetails
            };
            const token = await getToken({ template: "productivitycorner" })
            await addCategory(token,item);
            const cats = await getCategories(token,userId);
            const data = await cats.json();
            setcategoriesAdded(data.map((x) => x.category))
            setAddCategoryGroup(false);
            // console.log("todos.js addOrCreateCategory res: " + item);
        }
    }

    if(!isLoaded){
        return <span> Loading {`:)`} </span>
    }else{
        let openTaskContents;
        if(addCategoryGroup){
            openTaskContents = (
                <>
                    <div>
                        <textarea
                            className="textarea is-primary"
                            placeholder="Add a new category group"
                            onChange={(e) => setAddedCategoryName(e.target.value)}
                            rows="2"
                        ></textarea>
                        <button className="button is-success" onClick={() => {addOrCreateCategory(addedCategoryName)}}>Add Category</button>
                    </div>
                </>
            );
        }else{
            openTaskContents = (<>
            <textarea className="textarea is-primary" placeholder="Enter task description" value = {newTodoItem} rows="2"
                onChange={(e) => setnewTodoItem(e.target.value)}
                onKeyDown={(e) => { if(e.key === 'Enter'){addOrCreate()} }}></textarea>
            <div><button className="button is-primary" onClick = {addOrCreate}>Add task</button></div>
            <div><button className="button is-link" onClick = {addNewCat}>Create New Category</button></div><br></br>
            {items.map((item) => (
                <li key={item._id}>
                    {item.taskDescription}<br></br>
                    <Link href={`/todo/${item._id}`}><button className="button is-info is-small">Edit&#9998;</button></Link>
                    <Link href="/done"><button className="button is-warning is-small" 
                        onClick={async () => {
                            console.log("Mark this boi as done: " + item._id);
                            const token = await getToken({ template: "productivitycorner" });
                            await setComplete(token,userId,item._id);
                            setaddNewTask(true);
                        }}>&#10024;Done&#10004;</button></Link>
                        <br></br>
                </li>
            ))}
            <br></br>
            <h3>
                Categories added:
            </h3><br></br>
            <div>
                {categoriesAdded?.map((cat) => {
                    return <div><Link href={`/todos/${cat}`}><button className="button is-primary">{cat}</button></Link></div>
                })}
            </div>

            </>)
            // console.log(itemList);
        }
        return (
            <>
                <SignedIn>
                    <header className="head">
                        <h1>Todo</h1>
                    </header>
                    <Sidebar></Sidebar>
                    <div className="flex-container">
                        <ul>
                            {openTaskContents}
                        </ul>
                    </div>
                </SignedIn>
                <SignedOut>
                    <RedirectToSignIn />
                </SignedOut>
            </>
        );
    }

    
};

{/* <button className="button is-primary" onClick={addOrCreate}>Add task</button>
                    <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} ariaHideApp={false} 
                    style={myStyles} onChange={(e) => setnewTodoItem(e.target.value)}
                    onKeyDown={(e) => { if(e.key === 'Enter'){addOrCreate()} }}>
                        <textarea className="textarea is-primary is-normal" placeholder="Enter a task description" rows="2" cols="15"></textarea>
                        <button className="button is-success" onClick={writeTodoContent}>Add</button>
                        <button className="button is-danger" onClick={() => setIsOpen(false)}>Cancel</button>
                    </Modal> */}

// function MakeItem( { myStyles, isOpen, setIsOpen } ){
//     // const token = await getToken({template: 'prductivitycorner'});
//     // const res = getTodos(token);
//     // console.log(res);
    
//     function writeTodoContent(){
//         setIsOpen(false);
//         const [itemContent,setItemContent] = useState("");

//     }

//     return (<>
//             <TodoItem itemContent={itemContent}></TodoItem>
//             <div>
//                 <button className="button is-primary" onClick={() => setIsOpen(true)}>Add task</button>
//             </div>
//         </>
//     );
// }