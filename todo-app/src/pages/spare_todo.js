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
