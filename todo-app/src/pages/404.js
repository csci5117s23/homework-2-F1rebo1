import { useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Todo(){
    const [page,setPage] = useState("Personal");

    function handlePageChange(newPage) {
        setPage(newPage);
    }

    return (<>
        <div>Sad pongal moment, but the page you're looking for doesn't exist {':('}</div><br></br>
        <Link href="/todos"><button className="button is-primary">Return to your todo list</button></Link>
    </>);
};