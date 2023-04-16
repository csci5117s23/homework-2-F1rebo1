import Sidebar from "@/components/sidebar";
import Modal from 'react-modal';
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { getTodos, addTodo, setComplete } from "@/modules/Data.js";
import Link from 'next/link';

export default function Todo(){
    const { isLoaded, userId, getToken } = useAuth();
    const [items,setItems] = useState([]);
    const [newTodoItem, setnewTodoItem] = useState("");
    const [addNewTask, setaddNewTask] = useState(false);

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
        });
    }, [isLoaded])
    
    async function addOrCreate() {
        if(newTodoItem && userId) {
            var item = {
                userId: userId,
                taskDescription: newTodoItem,
                isCompleted: false,
                category: ""
            };
            const token = await getToken({ template: "productivitycorner" })
            await addTodo(token,item);
            const res = await getTodos(token,userId);
            // await setToDone(token,userId,todoItem._id);
            // setAddingTodo(true);
            setItems(res);
            setnewTodoItem("");
            setaddNewTask(true);
        }
    }

    if(!isLoaded){
        return <span> Loading {`:)`} </span>
    }else{
        // items.map((item) => console.log(<li key={item._id}></li>));
        const itemList = items.map((item) => (
            <li key={item._id}>
                {item.taskDescription}<br></br>
                <Link href={`/todo/${item._id}`}><button className="button is-info is-small">&#9998;</button></Link>
                <Link href="/done"><button className="button is-warning is-small" 
                    onClick={async () => {
                        console.log("Mark this boi as done: " + item._id);
                        const token = await getToken({ template: "productivitycorner" });
                        await setComplete(token,userId,item._id);
                        setaddNewTask(true);
                    }}>&#10024;&#10004;</button></Link>
                    <br></br>
            </li>
            
        ));
        // console.log(itemList);
        return (
            <>
                <header className="head">
                    <h1>Todo</h1>
                </header>
                <Sidebar></Sidebar>
                <div className="flex-container">
                    <ul>
                        <textarea className="textarea is-primary" placeholder="Enter task description" value = {newTodoItem} rows="2"
                            onChange={(e) => setnewTodoItem(e.target.value)}
                            onKeyDown={(e) => { if(e.key === 'Enter'){addOrCreate()} }}></textarea>
                        <button className="button is-primary" onClick = {addOrCreate}>Add task</button>
                        {itemList}
                    </ul>
                </div>
                {/* <MakeItem></MakeItem> */}
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