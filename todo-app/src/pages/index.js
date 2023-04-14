import Link from 'next/link';
import {useState, useEffect} from 'react';
import { isLoaded, useUser, SignIn } from "@clerk/clerk-react";
import { getAuth } from "@clerk/nextjs/server";
import { useAuth } from "@clerk/nextjs";

export default function Homepage(){
    return (<>
        <section className="section">
            <div className="container">
                <h1 id="appName">Productivity Corner</h1><br></br>
                <div id="main-text">Thanks for choosing us!</div><br></br>
                {/* <Link href="/signup"><button className="button is-link">Start creating todo lists now!</button></Link> */}
                <ContinueButton></ContinueButton>
            </div>
        </section>
    </>);
}

function ContinueButton(){
    // const { isLoaded, isSignedIn, user } = useUser();
    const { isLoaded, isSignedIn, userId, sessionId, getToken } = useAuth();
    // const { userId, sessionId, getToken, isLoaded, isSignedIn, signOut, orgId, orgRole, orgSlug, } = useAuth();
    const fetchDataFromTemplate = async () => {
        try {
            const token = await Clerk.session.getToken({ template: 'productivitycorner' })
            console.log(token);
            console.log();
            console.log("Is the user signed in?" + userId);
            console.log("What is the session?" + sessionId);
        } catch(e) {
            console.log(e);
        }
    }

    if (isLoaded && isSignedIn) {
        return (
            <>
                <Link href="/todos"><button className="button is-link" onClick={fetchDataFromTemplate}>Start creating todo lists now!</button></Link>
            </>
        );
    }else{
        return (
            <>
                <Link href="/signup"><button className="button is-link">Start creating todo lists now!</button></Link>
            </>
        );
    }
}