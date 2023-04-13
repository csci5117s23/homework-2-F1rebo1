import { useState } from "react";
import Link from 'next/link';
import Modal from 'react-modal';
import { useRouter } from 'next/router';
// import '../scripts/modals.js';

export default function Todo(){
    const [page,setPage] = useState("Personal");
    const [newItem,setNewItem] = useState(true);
    const [isOpen, setIsOpen] = useState(false)
    const myStyles = {
        overlay: {
           backgroundColor: 'rgba(0, 0.773, 0.784, 0.6)'
        },
        content: {
           top: '50%',
           left: '50%',
           right: 'auto',
           bottom: 'auto',
           marginRight: '-50%',
           transform: 'translate(-50%, -50%)'
        }
     }

    function createTask(){
        if(newItem){
            console.log("Pongal value is: " + newItem);
            setNewItem(false);
            return (
                <>
                    <div>
                        <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} ariaHideApp={false} style={myStyles}>
                            <h1>Add new task?</h1>
                            <button onClick={() => setIsOpen(false)}>Close Modal</button>
                        </Modal>
                    </div>
                </>
            );
        }else{
            console.log("newItem value is: " + newItem);
            setNewItem(true);
            return true;
        }
    }

    return (<>
        <CurrentPage curPage={page}></CurrentPage>
        <aside className="menu">
            <p className="menu-label-color">Spring 2023</p>
            <ul className="menu-list">
                <li><Link className="menu-item-hover-color" href="/todos">Todo</Link></li>
                <li><Link className="menu-item-hover-color" href="/done">Completed</Link></li>
            </ul>
        </aside>
        <MakeItem createTask={createTask} newItem={newItem} myStyles={myStyles} isOpen={isOpen} setIsOpen={setIsOpen}></MakeItem>
    </>);
};

function CurrentPage({ curPage }){
    return (
    <>
        <header className="head">
            <h1>{curPage}</h1>
        </header>
    </>);
}

function TodoItem(){
    return (
        <>
            <div>
                <p>Add task</p>
            </div>
        </>
    );
}

// Needed some help from here to get the Modal/popup working: https://www.tutorialspoint.com/how-to-add-popup-in-nextjs#:~:text=We%20can%20add%20a%20Popup,the%20design%20of%20our%20website.

function MakeItem( { newItem, createTask, myStyles, isOpen, setIsOpen } ){
    console.log("New Item value is: " + newItem);

    return (<>
        {/* <button type="submit" className="button is-primary is-small" onClick={createTask}>New task</button> */}
        {!newItem && 
            <div>
                <button className="button is-primary" onClick={() => setIsOpen(true)}>Add task</button>
                <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} ariaHideApp={false} style={myStyles}>
                    <button className="button is-success" onClick={() => setIsOpen(false)}>+</button>
                    <button className="button is-danger" onClick={() => setIsOpen(false)}>Cancel</button>
                </Modal>
            </div>}
        
        
    </>);
}