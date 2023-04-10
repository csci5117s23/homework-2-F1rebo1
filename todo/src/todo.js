import './todo.css';
// import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Todo(){
    const [page,setPage] = useState("Personal");


    return (<>
        <CurrentPage curPage={page}></CurrentPage>
        <aside class="menu">
            <p class="menu-label-color">Spring 2023</p>
            <ul class="menu-list">
                <li><a class="menu-item-hover-color" href="/">Personal</a></li>
                <li><a class="menu-item-hover-color" href="/">Work</a></li>
                <li><a class="menu-item-hover-color" href="/">School</a></li>
            </ul>
        </aside>
    </>);
};

function CurrentPage({ curPage }){

    return (<>
        <header class="head">
            <h1>{curPage}</h1>
        </header>
    </>);
}