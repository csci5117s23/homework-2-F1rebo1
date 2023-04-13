import { useState } from "react";
import Link from 'next/link';
import Modal from 'react-modal';

export default function Sidebar(){
    const [isOpen, setIsOpen] = useState(false);
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
           transform: 'translate(-50%, -50%)',
           width: '20em'
        }
    }
    return(
        <>
            <aside className="menu">
                <p className="menu-label-color">Spring 2023</p>
                <ul className="menu-list">
                    <li><Link className="menu-item-hover-color" href="/todos">Todo</Link></li>
                    <li><Link className="menu-item-hover-color" href="/done">Completed</Link></li>
                </ul>
            </aside>
            <MakeItem myStyles={myStyles} isOpen={isOpen} setIsOpen={setIsOpen}></MakeItem>
        </>
    );
}

// Needed some help from here to get the Modal working: https://www.tutorialspoint.com/how-to-add-popup-in-nextjs#:~:text=We%20can%20add%20a%20Popup,the%20design%20of%20our%20website.

function MakeItem( { myStyles, isOpen, setIsOpen } ){
    return (<>
        { 
            <div>
                <button className="button is-primary" onClick={() => setIsOpen(true)}>Add task</button>
                <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} ariaHideApp={false} style={myStyles}>
                    <textarea className="textarea is-primary is-normal" placeholder="Enter a task description" rows="2" cols="15"></textarea>
                    <button className="button is-success" onClick={() => setIsOpen(false)}>Add</button>
                    <button className="button is-danger" onClick={() => setIsOpen(false)}>Cancel</button>
                </Modal>
            </div>}
    </>);
}