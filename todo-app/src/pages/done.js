import Modal from 'react-modal';
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { getTodos, addTodo } from "@/modules/Data.js";
import Sidebar from "@/components/sidebar";
import CompletedTasks from "@/components/CompletedTasks.js";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs"

export default function Done(){
    const { isLoaded } = useAuth();

    if(!isLoaded){
        return <span> Loading {`:)`} </span>
    }else{
        return (
            <>
            <SignedIn>
                <header className="head">
                    <h1>Completed</h1>
                </header>
                <Sidebar></Sidebar>
                <CompletedTasks></CompletedTasks>
            </SignedIn>

            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
            </>
        );
    }
}