import Link from 'next/link';
import {useState, useEffect} from 'react';

export default function Homepage(){
    const [signedIn,setIsSignedIn] = useState(false);
    function checkSignedInStatus(){
        if(!signedIn){
            return <Link href="/signup"></Link>
        }else{
            setIsSignedIn(true);
            return <Link href="/todos"></Link>
        }
    }

    return (<>
        <section className="section">
            <div className="container">
                <h1 id="appName">Productivity Corner</h1><br></br>
                <div id="main-text">Thanks for choosing us!</div><br></br>
                <Link href="/signup"><button className="button is-link">Start creating todo lists now!</button></Link>
            </div>
        </section>
    </>);
}