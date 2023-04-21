import Sidebar from "@/components/sidebar";
import { RedirectToSignIn, SignedIn, SignedOut, useAuth } from "@clerk/nextjs"
import { useState, useEffect } from "react";
import { getTodos, addTodo, setComplete, addCategory, deleteCategory, getCategories, getAllCategories, getExistingTodoCategories, getExistingDoneCategories } from "@/modules/Data.js";
import Link from 'next/link';
import { useRouter } from "next/router";

export default function Todo(){
    const { isLoaded, userId, getToken } = useAuth();
    const [items,setItems] = useState([]);
    const [newTodoItem, setnewTodoItem] = useState("");
    const [addNewTask, setaddNewTask] = useState(false);

    const [showAfterDelete,setshowAfterDelete] = useState(false);
    const [addCategoryGroup,setAddCategoryGroup] = useState(false);
    const [addedCategoryName,setAddedCategoryName] = useState("");
    const [categoriesAdded,setcategoriesAdded] = useState([]);

    const [categoryDeleted,setCategoryDeleted] = useState(false);   //New state variable created explicitly to trigger useEffect to render category deletion
    const [triggerCatAdded,settriggerCatAdded] = useState(false);   //New state variable created explicitly to trigger useEffect to render category deletion

    const [keyVals,setKeyVals] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function process() {
            if(userId){
                try {
                    const token = await getToken({ template: "productivitycorner" });
                    const res = await getTodos(token,userId);
                    // console.log(userId)
                    return res;
                } catch (error) {
                    console.error('Failed to get todos', error);
                    return [];
                }
            } else return [];
            
        }
        process().then((res) => {
            // console.log(res);
            setItems(res.sort((a,b) => new Date(b.createdOn)-new Date(a.createdOn)));
            setItems(res);
            setaddNewTask(false);
            setshowAfterDelete(false);
        }).catch(() => {
            router.push('/404');
        });
    }, [isLoaded,showAfterDelete])

    useEffect(() => {
        async function showCategories() {
            if(userId) {
                const token = await getToken({ template: "productivitycorner" })
                const res = await getCategories(token,userId);
                const data = await res.json();
                return data;
            }
        }
        showCategories().then((data) => {
            setcategoriesAdded(data?.map((x) => x.category));
            setKeyVals(data);
            // console.log(res);
            // console.log("I am here 3: ");
            // console.log(categories);
            setAddCategoryGroup(false);
            settriggerCatAdded(false);
            setCategoryDeleted(false);
        })
    }, [isLoaded,triggerCatAdded,categoryDeleted])

    async function deleteCurCategory(cat) {
        console.log("Delete Category Button Clicked");
        const token = await getToken({ template: "productivitycorner" });
        // setKeyVals(data)
        // const catData = await data.json().then((data) => setKeyVals(data));
        // setKeyVals(catData);
        console.log("KeyVals:");
        console.log(keyVals);
        // deleteCategory(token,userId,cat._id).then(() => {setAddCategoryGroup(true);})
        let curKey;
        for(let ind = 0; ind < keyVals.length; ind++){
            if(keyVals[ind].category == cat){
                curKey = ind;
                break;
            }
        }
        console.log("cat: " + cat);
        console.log("keyVals[0].category: " + keyVals[0].category);
        let curPair = keyVals[curKey];
        console.log("curPair: " + curPair.category);
        deleteCategory(token,userId,curPair._id);
        triggerDeleteCat();
    }
    
    async function addOrCreate() {
        if(newTodoItem && userId) {
            var item = {
                userId: userId,
                taskDescription: newTodoItem,
                isCompleted: false,
                category: ""
            };
            const token = await getToken({ template: "productivitycorner" })
            console.log("todos.js addOrCreate No complaints yet");
            await addTodo(token,item);
            const cats = await getCategories(token,userId);
            console.log("Trying to Log categories: ");
            const data = await cats.json();
            console.log(data);
            setcategoriesAdded(data.map((x) => x.category))
            console.log("todos.js addOrCreate Are you complaining?");
            const res = await getTodos(token,userId);
            setItems(res);
            setnewTodoItem("");
            setaddNewTask(true);
            console.log(categoriesAdded);
            console.log("todos.js addOrCreate res: " + item);
        }
    }

    function addNewCat(){
        console.log("Create New Category Button Pressed");
        setAddCategoryGroup(true);
    }

    function triggerAddNewCat(){
        settriggerCatAdded(true);
    }

    function triggerDeleteCat(){
        setCategoryDeleted(true);
    }

    // The code utilizing the JS .reduce function was quite helpfully understood from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
    // This was helpful in producing an alert which prevents our user from generating multiple todo categories with the same name.
    async function addOrCreateCategory(categoryDetails) {
        // OG Stuff
        console.log("todos.js addOrCreateCategory Start");
        console.log(categoryDetails);
        if(categoryDetails && userId) {
            console.log(categoryDetails);
            var item = {
                userId: userId,
                category: categoryDetails
            };
            const token = await getToken({ template: "productivitycorner" })
            const cats = await getCategories(token,userId);
            const data = await cats.json();
            let showAlertOrNot = !data.reduce((accumulator,currentValue) => accumulator || (currentValue.category === categoryDetails),false);
            console.log(data);
            // console.log("CONsole: " + getCategories(token,userId).then((res) => {return res.json()}));
            if(showAlertOrNot) {
                await addCategory(token,item);
                setAddedCategoryName("");
                setAddCategoryGroup(true);
            } else {
                alert("The " + categoryDetails + " category already exists. Please choose a different name :)");
            }
            console.log("Data: ");
            console.log(data);
            setcategoriesAdded(data.map((x) => x.category))
            setAddCategoryGroup(false);
            triggerAddNewCat();
        }
    }

    async function performPageRouting(cat){
        const token = await getToken({ template: "productivitycorner" });
        const res = await getExistingTodoCategories(token,userId);
        const data = await res.json();
        const otherRes = await getExistingDoneCategories(token,userId);
        const otherData = await otherRes.json();

        console.log("data.length: " + data.length);
        console.log("data: ");
        console.log(data);
        console.log("Does data contain cat?: ");
        console.log(data.some(item => item.category === cat));
        if(data.some(item => item.category === cat)){
            if(data.length > 0) return "todosExist";
        }else if(otherData.some(item => item.category === cat)){
            if(otherData.length > 0) return "donesExist";
        }else{
            return "nothing";
        }
    }

    async function handleClick(cat){    //The handleClick function checks for existing Todo/Done category items. If there are both todo AND done category items for the clicked category link
        let boolVal = await performPageRouting(cat);   //then the function returns the todos/[category] page since that is the priority (as gleaned from the homework description).
        console.log("boolVal: " + boolVal);
        if(boolVal === "todosExist"){
            router.push('todos/'+cat);
        }else if(boolVal === "donesExist"){
            router.push('done/'+cat);
        }else{
            console.log("Path actually routing to: todos/" + cat);
            router.push('/goback');
        }
    }

    function shorten(taskDesc) {
        if(taskDesc.length > 15) return `${taskDesc.substring(0,15)}...`;
        else return taskDesc;
    }

    if(!isLoaded){
        return <span> Loading {`:)`} </span>
    }else{
        let openTaskContents;
        if(addCategoryGroup){
            // console.log("Add Category Group True");
            openTaskContents = (
                <>
                    <div>
                        <textarea
                            className="textarea is-primary"
                            placeholder="Add a new category group"
                            onChange={(e) => setAddedCategoryName(e.target.value)}
                            rows="2"
                        ></textarea>
                        <button className="button is-success" onClick={async () => { await addOrCreateCategory(addedCategoryName)}}>Add Category</button>
                    </div>
                </>
            );
        }else{
            openTaskContents = (<>
            <textarea className="textarea is-primary" placeholder="Enter task description" value = {newTodoItem} rows="2"
                onChange={(e) => setnewTodoItem(e.target.value)}
                onKeyDown={(e) => { if(e.key === 'Enter'){addOrCreate()} }}></textarea>
            <div><button className="button is-primary" onClick = {addOrCreate}>Add task</button></div>
            <div><button className="button is-link" onClick = {addNewCat}>Create New Category</button></div><br></br>
            {items.map((item) => (
                <li key={item._id}>
                    {shorten(item.taskDescription)}<br></br>
                    <Link href={`/todo/${item._id}`}><button className="button is-info is-small">Edit&#9998;</button></Link>
                    <button className="button is-warning is-small" 
                        onClick={async () => {
                            console.log("Mark this boi as done: " + item._id);
                            const token = await getToken({ template: "productivitycorner" });
                            await setComplete(token,userId,item._id);
                            setaddNewTask(true);
                            setshowAfterDelete(true);
                        }}>&#10024;Done&#10004;</button>
                </li>
            ))}
            <br></br>
            <h3>
                Categories added:
            </h3><br></br>
            <div>
                {/* {categoriesAdded?.map((cat) => {
                    console.log("Cat is:");
                    console.log(cat);
                    return (
                    <>
                        <div><p><Link href={`/todos/${cat}`}><button className="button is-primary is-small" onClick={(e) => {
                            e.preventDefault();
                            handleClick(cat)
                        }}>{cat}</button></Link>
                        <button className="button is-info is-danger is-small"
                            onClick={async () => await deleteCurCategory(cat)}>Delete Category&#128465;</button></p></div><br></br>
                    </>);
                })} */}
                {categoriesAdded?.map((cat) => {
                    let actualPath ="";
                    for(let c = 0; c < cat.length; c++){
                        if(cat[c] != ' ') actualPath += cat[c];
                        else actualPath += '%20';
                    }
                    console.log("actualPath: " + actualPath);
                    return (
                    <>
                        <div><p><Link href={`/todos/${actualPath}`}><button className="button is-primary is-small" onClick={(e) => {
                            e.preventDefault();
                            handleClick(actualPath)
                        }}>{cat}</button></Link>
                        <button className="button is-info is-danger is-small"
                            onClick={async () => await deleteCurCategory(cat)}>Delete Category&#128465;</button></p></div><br></br>
                    </>);
                })}
            </div>

            </>)
            // console.log(itemList);
        }
        return (
            <>
                <SignedIn>
                    <header className="head">
                        <h1>Todo</h1>
                    </header>
                    <Sidebar></Sidebar>
                    <div className="flex-container">
                        <ul>
                            {openTaskContents}
                        </ul>
                    </div>
                </SignedIn>
                <SignedOut>
                    <RedirectToSignIn />
                </SignedOut>
            </>
        );
    }

    
};