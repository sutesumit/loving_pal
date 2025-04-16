

const form = document.querySelector('form')
const list = document.getElementById('task-list')
const taskName = document.getElementById('task')
const description = document.getElementById('description')
const date = document.getElementById('date')

const getTaskParams = () => {
    return {
        'task' : taskName.value,
        'description' : description.value,
        'date' : date.value
        }
}

const clearFields = () => {
    taskName.value = ''
    description.value = ''
    date.value= ''
}

const deleteTask = (listItem) => {
    listItem.remove()
}

const toggleTaskDone = (task, checkMark) => {
    const opacity = checkMark ? 0.3 : 1 
    task.setAttribute(`style`, `opacity: ${opacity}`)
}

const addNewTask = (taskList, taskObject) => {
    const { task, description, date } = taskObject

    if (taskObject.task.trim() == ''){
        alert ('Forgot to add task Name')
        return
    }
    const listItem = document.createElement('li')
    listItem.id = `task-${Date.now()}`
    listItem.innerHTML = `<strong>${task}</strong>`

    const listProps = document.createElement('div')
    listProps.innerText = `${description} \n ${date}`

    const deleteButton = document.createElement('button')    
    deleteButton.innerText = 'Kill Task'
    deleteButton.addEventListener('click', () => deleteTask(listItem))

    const checkBoxField = document.createElement('fieldset')
    const checkBox = document.createElement('input')
    const checkBoxLabel = document.createElement('label')
    checkBoxLabel.innerText = 'Mark Complete'
    checkBox.setAttribute('id', `check-${Date.now()}`)

    checkBoxField.appendChild(checkBox)
    checkBoxField.appendChild(checkBoxLabel)
    checkBox.setAttribute('type', 'checkbox')
    checkBox.addEventListener('change', ()=> {
        toggleTaskDone(listItem, checkBox.checked)
    })

        

    listItem.appendChild(listProps)
    listItem.appendChild(deleteButton)
    listItem.appendChild(checkBoxField)

    taskList.appendChild(listItem)
    clearFields()
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    const taskObject = getTaskParams()
    addNewTask(list, taskObject)
})