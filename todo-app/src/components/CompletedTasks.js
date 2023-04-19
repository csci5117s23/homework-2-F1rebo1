import { useState, useEffect } from "react";
import { useAuth } from '@clerk/nextjs';
import { getAllCompletedTasks } from "@/modules/Data.js";

export default function CompletedTasks() {
    const [items,setItems] = useState([]);
    const { isLoaded, userId, getToken } = useAuth();
    const [triggerReload,setTriggerReload] = useState(false);

    useEffect(() => {
        async function process() {
            try {
                if(userId){
                    
                    const token = await getToken({ template: "productivitycorner" });
                    const res = await getAllCompletedTasks(token,userId);
                    return res;
                }
            } catch (error) {
                console.error('Failed to get completed items', error);
                return [];
            }
        }
        process().then((res) => {
            setItems(res);
            setTriggerReload(!triggerReload);
        });
    }, [isLoaded,triggerReload])

    if(!isLoaded) {
        return <span> Loading {`:)`} </span>
    } else {
        return (
            <>
                <div className="flex-container">
                    <ul>
                        {items.map(item => {
                            // console.log(item.taskDescription)
                            return(
                                <li key={item._id}>
                                    {item.taskDescription}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </>
        );
    }
}