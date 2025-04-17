const express = require('express')
const PORT = 3000
require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)


const app = express()

app.use(express.json())
app.use(express.static(__dirname))


app.get('/api/tasks', async (req, res) => {
    const { data, error } = await supabase.from('tasks').select('*')
    // console.log(`Data: ${data}`)
    
    res.status(200).json({
        message: 'Successfully fetched all tasks.',
        data
    })
})

// app.get('/api/tasks/:id', (req, res)=> {
//     const id = parseInt(req.params.id)
//     const taskIndex = tasks.findIndex((task) => task.id == id)
//     // const task = tasks[taskIndex]
//     res.status(200).json({
//         message: 'Successfully fetch the task.',
//         data: task
//     })
// })

app.delete('/api/tasks/:id', async (req, res) => {
    const id = req.params.id
    const { error } = await supabase.from('tasks').delete().eq('id', id)
    if (error) return res.status(404).json({ error })
    res.status(204).json({
        message: `Task successfully deleted.`
    })
})

app.post('/api/tasks', async (req, res) => {
    const task = req.body
    // console.log(task)
    const { data, error } = await supabase.from('tasks').insert([task]).select()
    if (error) return res.status(500).json({ error })
    res.status(201).json({
        message: 'Tasks successfully added.',
        data
    })
})

app.put('/api/tasks/:id', async (req, res)=> {
    const id = parseInt(req.params.id)
    const updatedTask = req.body
    console.log(updatedTask)
    const { error } =  await supabase.from('tasks').update( updatedTask ).eq('id', id)
    if (error) return res.status(500).json({ error })
    res.status(200).json({
        message: `Task Updated Successfully`
    })
})


app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
})