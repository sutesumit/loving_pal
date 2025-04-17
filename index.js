const form = document.querySelector('form')


const getTaskObject = () => {
    const task = document.getElementById('task').value
    const description = document.getElementById('description').value
    const date = document.getElementById('date').value || null
    console.log(date)
    const checkValue = false

    if (task.trim() == ''){
        alert('Fill the task name!')
        return
    }
    const taskObject = { task, description, date, checkValue}
    return taskObject
}

// Pushes a new task  into the array
const addTask = async () => {    
    const taskObject = getTaskObject()
    console.log(taskObject)
    if (taskObject){
    await fetch('/api/tasks', { 
            headers : { 'Content-type' : 'application/json'}, 
            method: 'POST',
            body: JSON.stringify(taskObject)
        })
        renderTasks()
        clearForm()
    }
}

// Deletes a task from the array
const removeTask = async (task) => {
    const removeTaskId = task.id
    if(task){
        await fetch(`/api/tasks/${removeTaskId}`,{
            method: 'DELETE'
        })
        renderTasks()
    }
}


const toggleCheck = async (task) => {
    task.checkValue = !task.checkValue
    const updateTaskId = task.id
    console.log(task)
    if (task){
        await fetch(`/api/tasks/${updateTaskId}`, {
            headers: { 'Content-type' : 'application/json' },
            method: 'PUT',
            body: JSON.stringify(task)
        })
        renderTasks()
    }
}

const clearForm = () => {
    document.getElementById('task').value = null
    document.getElementById('description').value = null
    document.getElementById('date').value = null
}

const createTaskBlock = (task) => {
    const taskBlock = document.createElement('li')
    taskBlock.setAttribute(`style`, `opacity : ${task.checkValue ? 0.3 : 1}`)

    const taskTitle = document.createElement('h4')
    taskTitle.innerText = task.task

    const taskDescription = document.createElement('p')
    taskDescription.innerText = task.description

    const taskDate = document.createElement('time')
    taskDate.innerText = task.date

    const deleteTask = document.createElement('button')
    deleteTask.innerText = 'Kill Task'
    deleteTask.addEventListener('click', () => removeTask(task))

    const checkTask = document.createElement('input')
    checkTask.setAttribute('type', 'checkbox')
    checkTask.checked = task.checkValue
    checkTask.addEventListener('change', ()=> toggleCheck(task))

    taskBlock.appendChild(taskTitle)
    taskBlock.appendChild(taskDescription)
    taskBlock.appendChild(taskDate)
    taskBlock.appendChild(checkTask)
    taskBlock.appendChild(deleteTask)
    return taskBlock

}

const renderTasks = async () => {
    const taskList = document.getElementById('task-list')
    taskList.innerHTML = null
    const res = await fetch('/api/tasks', { method: 'GET'})
    const resJson = await res.json()
    const tasks = resJson.data || []
    tasks.forEach((task) => {
        const taskBlock = createTaskBlock(task)
        taskList.appendChild(taskBlock)
    })

}

renderTasks()

form.addEventListener('submit', (event) => {
    event.preventDefault()
    addTask()
})


