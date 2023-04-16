import { useState, useEffect } from "react";
import { useAuth } from '@clerk/nextjs';
import { getTodoItem, editTodoItem, addCategory, getCategories } from "@/modules/Data.js";

export default function OpenTask( {id} ){
    
    const [catValue,setCatValue] = useState("");
    const [catAdded,setCatAdded] = useState(false);
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

    function setAddCategory(){
        console.log("setAddCategory reached");
        setCatAdded(true);
        console.log("catAdded val is: " + catAdded);
    }

    async function addCategoryType(catName) {
        console.log("Do we make it here?")
        console.log(catValue);
        console.log("addCategoryType catAdded value is: " + catAdded);
        console.log(userId);
        if(catAdded && catValue && userId) {
            var item = {
                userId: userId,
                taskDescription: openItem,
                isCompleted: false,
                category: catName,
                _id: id
            };
            const token = await getToken({ template: "productivitycorner" })
            await addCategory(token,item);
            const res = await getCategories(token,userId);
            setCatValue(res);
            setCatAdded(false);
            // console.log("Cat value: " + catValue);
            console.log("OpenTask.js addCategoryType res: " + item);
        }
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
        }else if(catAdded){
            openTaskContents = (
                <>
                    <div>
                    <textarea
                        className="textarea is-primary"
                        placeholder="Add category"
                        onChange={(e) => setCatValue(e.target.value)}
                        rows="2"
                    ></textarea>
                    <button className="button is-success" onClick={() => {addCategoryType(catValue)}}>Confirm</button>
                </div>
                </>
            );
        }else{
            openTaskContents = (
                <>
                    <h4>{openItem}</h4><br></br>
                    <button className="button is-success" onClick={setToEdit}>Edit Task</button>
                    <button className="button is-link" onClick={setAddCategory}>Set Category</button>

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