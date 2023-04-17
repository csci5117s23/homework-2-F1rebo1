const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function getTodos(authToken,userId) {
    // `${backend_base}/todos?userId=${userId}`
    const result = await fetch(`${backend_base}/todos?userId=${userId}&isCompleted=false`,{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

export async function addTodo(authToken,todo) {
    const result = await fetch(`${backend_base}/todos`,{
        'method':'POST',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify(todo)
    })
    return result;
}

export async function addComplete(authToken,todo){
    const result = await fetch(backend_base + "/done", {
        'method': 'POST',
        'headers': {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
            userId: authToken.sub,
            taskDescription: todo.text,
            isCompleted: true,
            category: todo.category,
            id: todo.id
        })
    })
    return await result.json();
}

export async function getTodoItem(authToken,userId,todoId) {
    const result = await fetch(`${backend_base}/todos?userId=${userId}&_id=${todoId}`,{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

export async function setComplete(authToken,userId,taskId) {
    let taskData = (await getTodoItem(authToken,userId,taskId))[0];
    taskData.isCompleted = !taskData.isCompleted;
    const result = fetch(`${backend_base}/updateTodoList?userId=${userId}&_id=${taskId}`, {
        'method': 'PUT',
        'headers': {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'application/json',
        },
        'body': JSON.stringify(taskData)
        });
    return result;
}

export async function getAllCompletedTasks(authToken,userId) {
    const result = await fetch(`${backend_base}/todos?userId=${userId}&isCompleted=true`,{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    const data = await result.json();
    console.log(data);
    return data;
}

export async function editTodoItem(authToken,userId,todoId,text) {
    let taskData = (await getTodoItem(authToken,userId,todoId))[0];
    taskData.taskDescription = text;
    // console.log("taskData.taskDescription: " + taskData.taskDescription);
    const result = fetch(`${backend_base}/updateTodoList?userId=${userId}&_id=${todoId}`, {
        'method': 'PUT',
        'headers': {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'application/json',
        },
        'body': JSON.stringify(taskData)
        });
    return result;
}

export async function deleteTodo(authToken,todo) {
    const result = await fetch(backend_base+"/todo/"+todo.id,{
        'method':'DELETE',
        'headers': {'Authorization': 'Bearer ' + authToken},
    })
    return await result.json();
}

export async function addCategory(authToken,item) {
    const result = await fetch(backend_base+`/categories?userId=${item.userId}`,{
        'method':'POST',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify({
            userId: item.userId,
            category: item.category
        })
    })
    return await result.json();
}

export async function addCategoryToTodos(authToken,item) {
    const result = await fetch(backend_base+`/todos?userId=${item.userId}`,{
        'method':'POST',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify({
            userId: item.userId,
            taskDescription: item.taskDescription,
            isCompleted: item.isCompleted,
            category: item.category,
            _id: item._id
        })
    })
    return await result.json();
}

export async function getCategories(authToken,userId) {
    const result = await fetch(backend_base+`/categories?userId=${userId}`,{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    console.log("Pongal");
    console.log(result);
    return result;
}

export async function getExistingTodoCategories(authToken,userId) {
    const result = await fetch(backend_base+`/todos?userId=${userId}&isCompleted=false`,{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return result;
}

export async function getExistingDoneCategories(authToken,userId) {
    const result = await fetch(backend_base+`/todos?userId=${userId}&isCompleted=true`,{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return result;
}

export async function getCategoryTodoList(authToken,userId,catName) {
    const result = await fetch(backend_base+`/todos?userId=${userId}&category=${catName}&isCompleted=false`,{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

export async function getCategoryCompletedList(authToken,userId,catName) {
    const result = await fetch(backend_base+`/todos?userId=${userId}&category=${catName}&isCompleted=true`,{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}


//The code in this file is mostly similar to Professor Kluver's Data.js file from the "Tech-Stack-2-Kluver-Demo" repo