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
        <MakeItem></MakeItem>
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

function MakeItem(){
    return (<>
        {/* <form action="/todos" method="post">
            <textarea className="textarea is-primary" placeholder="Primary textarea"></textarea>
            <button type="submit" className="button is-primary is-small">Add task</button>
        </form> */}
        <form action="/" method="post">
            <button type="submit" className="button is-primary is-small">Add task</button>
            <textarea className="textarea is-small is-primary" placeholder="Primary textarea"></textarea>
        </form>
    </>);
}