import { useState, useEffect } from "react";
import { useAuth } from '@clerk/nextjs';
import { getTodoItem, editTodoItem } from "@/modules/Data.js";

export default function OpenTask( {id} ){
    
    const [openItem,setOpenItem] = useState("");
    const [allowEdit,setAllowEdit] = useState(false);
    const { isLoaded, userId, getToken } = useAuth();

    useEffect(() => {
        async function process() {
            if(userId){
                try {
                    const token = await getToken({ template: "productivitycorner" });
                    const res = (await getTodoItem(token,userId,id))[0];
                    return res;
                } catch (error) {
                    console.error('Failed to open todo item', error);
                    return [];
                }
            }
        }
        process().then((res) => {
            setOpenItem(res.taskDescription);
        });
    }, [isLoaded,!allowEdit])

    async function viewAndEditTask(){
        if(openItem && userId){
            const token = await getToken({ template: "productivitycorner" })
            await editTodoItem(token,userId,id,openItem);
            setAllowEdit(false);
        }
    }

    function setToEdit(){
        setAllowEdit(true);
    }

    if(!isLoaded) {
        return (<span> Loading {`:)`} </span>);
        // <progress class="progress is-small is-primary" max="100">15%</progress>
    } else {
        let openTaskContents;
        if(allowEdit){
            openTaskContents = (
                <>
                    <div>
                        <textarea
                            className="textarea is-primary"
                            value={openItem}
                            placeholder="Edit your task description"
                            onChange={(e) => setOpenItem(e.target.value)}
                            rows="2"
                        ></textarea>
                    <button className="button is-success" onClick={() => {viewAndEditTask()}}>Confirm</button>
                </div>
                </>
            );
        }else{
            openTaskContents = (
                <>
                    <h4>{openItem}</h4><br></br>
                    <button className="button is-success" onClick={setToEdit}>Edit Task</button>
                </>
            );
        }

        return (
            <div>
                {openTaskContents}
            </div>
        );
    }
}