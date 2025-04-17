const express = require('express')
const path = require('path')
const PORT = 3000
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(express.static(__dirname))

const tasks = []

app.get('/api/tasks', (req, res) => {
    res.status(200).json({
        message: 'Successfully fetched all tasks.',
        data: tasks
    })
})

app.get('/api/tasks/:id', (req, res)=> {
    const id = parseInt(req.params.id)
    const taskIndex = tasks.findIndex((task) => task.id == id)
    const task = tasks[taskIndex]
    res.status(200).json({
        message: 'Successfully fetch the task.',
        data: task
    })
})

app.delete('/api/tasks/:id', (req, res) => {
    const id = req.params.id
    const taskIndex = tasks.findIndex((task) => task.id === id)
    if (taskIndex == -1){
        console.log('Opps')
        return res.status(404).json({ message: 'Task not found' })
    }
    tasks.splice(taskIndex, 1)
    res.status(204).json({
        message: `Task successfully deleted.`
    })
})

app.post('/api/tasks', (req, res) => {
    const task = req.body
    tasks.push(task)
    res.status(201).json({
        message: 'Tasks successfully added.'
    })
})

app.put('/api/tasks/:id', (req, res)=> {
    const id = parseInt(req.params.id)
    const updatedTask = req.body
    const taskIndex = tasks.findIndex((task) => task.id == id)
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask}
    res.status(200).json({
        message: `Task Updated Successfully`
    })
})


app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
})