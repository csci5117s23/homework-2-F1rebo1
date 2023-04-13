import Link from 'next/link';

export default function Sidebar(){
    return(
        <>
            <aside className="menu">
                <p className="menu-label-color">Spring 2023</p>
                <ul className="menu-list">
                    <li><Link className="menu-item-hover-color" href="/todos">Todo</Link></li>
                    <li><Link className="menu-item-hover-color" href="/done">Completed</Link></li>
                </ul>
            </aside>
        </>
    );
}