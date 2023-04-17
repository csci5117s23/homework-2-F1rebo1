// import Sidebar from "@/components/sidebar";
// import Modal from 'react-modal';
// import { useState } from "react";
// import { useAuth } from "@clerk/nextjs";
// import { getTodos } from "@/modules/Data";

// const { isLoaded, userId, sessionId, getToken } = useAuth();

// export default function Todo(){
//     // const [isOpen, setIsOpen] = useState(false);
//     // const [items,setItems] = useState([]);

//     // const myStyles = {
//     //     overlay: {
//     //        backgroundColor: 'rgba(0, 0.773, 0.784, 0.6)'
//     //     },
//     //     content: {
//     //        top: '50%',
//     //        left: '50%',
//     //        right: 'auto',
//     //        bottom: 'auto',
//     //        marginRight: '-50%',
//     //        transform: 'translate(-50%, -50%)',
//     //        width: '20em'
//     //     }
//     // }
//     return (<>
//         <header className="head">
//             <h1>Todo</h1>
//         </header>
//         <Sidebar></Sidebar>
//         <MakeItem myStyles={myStyles} isOpen={isOpen} setIsOpen={setIsOpen}></MakeItem>
//     </>);
// };

// // Needed some help from here to get the Modal working: https://www.tutorialspoint.com/how-to-add-popup-in-nextjs#:~:text=We%20can%20add%20a%20Popup,the%20design%20of%20our%20website.

// // useEffect(()=>{
// //   // Call Codehooks backend API
// //     const fetchData = async () => {
// //     const token = await getToken({ template: "productivitycorner" });
// //     const response = await fetch(`https://${API_ENDPOINT}/test`, {
// //       method: "GET",
// //       headers: { "x-apikey": API_KEY }
// //     });
// //     const data = await response.json();
// //     // Change application state and reload
// //     setMessage(data.message);
// //     setVisits(data.visits);
// //     setLoad(true)
// //   }
// //   fetchData();
// // },[])

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
            // <div>
            //     <button className="button is-primary" onClick={() => setIsOpen(true)}>Add task</button>
            //     {/* <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} ariaHideApp={false} style={myStyles}>
            //         <textarea className="textarea is-primary is-normal" placeholder="Enter a task description" rows="2" cols="15"></textarea>
            //         <button className="button is-success" onClick={writeTodoContent}>Add</button>
            //         <button className="button is-danger" onClick={() => setIsOpen(false)}>Cancel</button>
            //     </Modal> */}
            // </div>
//         </>
//     );
// }

// import Sidebar from "@/components/sidebar";
// import { RedirectToSignIn, SignedIn, SignedOut, useAuth } from "@clerk/nextjs"
// import { useState, useEffect } from "react";
// import { getTodos, addTodo, setComplete, addCategory } from "@/modules/Data.js";
// import Link from 'next/link';

// export default function Todo(){
//     const { isLoaded, userId, getToken } = useAuth();
//     const [items,setItems] = useState([]);
//     const [newTodoItem, setnewTodoItem] = useState("");
//     const [addNewTask, setaddNewTask] = useState(false);
//     const [addCategoryGroup,setAddCategoryGroup] = useState(false);
//     const [addedCategoryName,setAddedCategoryName] = useState("");

//     useEffect(() => {
//         async function process() {
//             if(userId){
//                 try {
//                     const token = await getToken({ template: "productivitycorner" });
//                     const res = await getTodos(token,userId);
//                     // console.log(userId)
//                     return res;
//                 } catch (error) {
//                     console.error('Failed to get todos', error);
//                     return [];
//                 }
//             } else return [];
            
//         }
//         process().then((res) => {
//             // console.log(res);
//             setItems(res);
//         }).catch(() => {
//             router.push('/404');
//         });
//     }, [isLoaded])
    
//     async function addOrCreate() {
//         if(newTodoItem && userId) {
//             var item = {
//                 userId: userId,
//                 taskDescription: newTodoItem,
//                 isCompleted: false,
//                 category: ""
//             };
//             const token = await getToken({ template: "productivitycorner" })
//             await addTodo(token,item);
//             const res = await getTodos(token,userId);
//             // await setToDone(token,userId,todoItem._id);
//             // setAddingTodo(true);
//             setItems(res);
//             setnewTodoItem("");
//             setaddNewTask(true);
//             console.log("todos.js addOrCreate res: " + item);
//         }
//     }

//     function addNewCat(){
//         setAddCategoryGroup(!addCategoryGroup);
//     }

//     async function addOrCreateCategory(categoryDetails) {
//         if(userId) {
//             var item = {
//                 userId: userId,
//                 category: categoryDetails
//             };
//             const token = await getToken({ template: "productivitycorner" })
//             await addCategory(token,item);
//             // await setToDone(token,userId,todoItem._id);
//             // setAddingTodo(true);
//             setAddCategoryGroup(false);
//             console.log("todos.js addOrCreateCategory res: " + item);
//         }
//     }
//     let openTaskContents;
//     if(!isLoaded){
//         return <span> Loading {`:)`} </span>
//     }else if(addCategoryGroup){
//         openTaskContents = (
//             <>
//                 <header className="head">
//                     <h1>Add new category group!</h1>
//                 </header>
//                 <Sidebar></Sidebar>
//                 <div>
//                     <textarea
//                         className="textarea is-primary"
//                         placeholder="Add a new category group"
//                         onChange={(e) => setAddedCategoryName(e.target.value)}
//                         rows="2"
//                     ></textarea>
//                 <button className="button is-success" onClick={() => {addOrCreateCategory(addedCategoryName)}}>Add Category</button>
//             </div>
//             </>
//         );
//         return (
//             <>
//                 <div>{openTaskContents}</div>
//             </>
//         );
//     }
//     else{
//         // items.map((item) => console.log(<li key={item._id}></li>));
//         // openTaskContents = (
//         openTaskContents = items.map((item) => (
//             <li key={item._id}>
//                 {item.taskDescription}<br></br>
//                 <Link href={`/todo/${item._id}`}><button className="button is-info is-small">Edit&#9998;</button></Link>
//                 <Link href="/done"><button className="button is-warning is-small" 
//                     onClick={async () => {
//                         console.log("Mark this boi as done: " + item._id);
//                         const token = await getToken({ template: "productivitycorner" });
//                         await setComplete(token,userId,item._id);
//                         setaddNewTask(true);
//                     }}>&#10024;Done&#10004;</button></Link>
//                     <br></br>
//             </li>
            
//         ));
//         // console.log(itemList);
//         return (
//             <>
//                 <SignedIn>
//                     <div className="flex-container">
//                         <ul>
//                             <textarea className="textarea is-primary" placeholder="Enter task description" value = {newTodoItem} rows="2"
//                                 onChange={(e) => setnewTodoItem(e.target.value)}
//                                 onKeyDown={(e) => { if(e.key === 'Enter'){addOrCreate()} }}></textarea>
//                             <button className="button is-primary" onClick = {addOrCreate}>Add task</button>
//                             <button className="button is-link" onClick = {addNewCat}>Add Category</button>
//                             {/* {itemList} */}
//                             {openTaskContents}
//                         </ul>
//                     </div>
//                 </SignedIn>
//                 <SignedOut>
//                     <RedirectToSignIn />
//                 </SignedOut>
                
//                 {/* <MakeItem></MakeItem> */}
//             </>
//         );
//     }

    
// };

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