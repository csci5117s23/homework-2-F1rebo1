import Link from 'next/link';
import {useState, useEffect} from 'react';
import { isLoaded, useUser, SignIn } from "@clerk/clerk-react";
import { getAuth } from "@clerk/nextjs/server";
import { useAuth } from "@clerk/nextjs";
import { Client } from '@clerk/nextjs/dist/api';


// const CLERK_API_BASE_URL = process.env.API_ENDPOINT;
// const CLERK_API_KEY = process.env.API_KEY;

// const clerk = new Client({
//   apiKey: CLERK_API_KEY,
//   apiBaseUrl: CLERK_API_BASE_URL,
// });

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
    const { isLoaded, isSignedIn, user } = useUser();
    const { userId, sessionId, getToken } = useAuth();
    // const { userId, sessionId, getToken, isLoaded, isSignedIn, signOut, orgId, orgRole, orgSlug, } = useAuth();
    const fetchDataFromTemplate = async () => {
        try {
            const token = await Clerk.session.getToken({ template: 'productivitycorner' })
            // console.log(token);
            // console.log("Is the user loaded and signed in?" + isLoaded && isSignedIn);
            // console.log("Is the user signed in?" + userId);
            // console.log("What is the session?" + sessionId);
            // console.log("What is the session token?\n" + getToken());
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