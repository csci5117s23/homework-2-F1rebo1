import { useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Todo(){
    const [page,setPage] = useState("Personal");

    function handlePageChange(newPage) {
        setPage(newPage);
    }

    return (<>
        <CurrentPage curPage={page}></CurrentPage>
        <aside className="menu">
            <p className="menu-label-color">Spring 2023</p>
            <ul className="menu-list">
                <li><Link className="menu-item-hover-color" href="/">All items</Link></li>
                <li><Link className="menu-item-hover-color" href="/">Todo</Link></li>
                <li><Link className="menu-item-hover-color" href="/done">Completed</Link></li>
            </ul>
        </aside>
        <TodoItem></TodoItem>
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
                <input name="todo-item" type="checkbox"></input>
                <label id="item">  Henlo</label>
            </div>
        </>
    );
}