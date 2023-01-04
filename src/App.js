// import React from "react";  // if you inport react, you can make class instead of function
import React from "react"
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Routes } from "react-router-dom";
import { useState, useEffect } from "react"
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromDB = await fetchTasks()
      setTasks(tasksFromDB)
    }

    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  const toggleReminder = async (id) => {
    const tasktToTogle = await fetchTask(id)
    const updatedTask = { ...tasktToTogle, reminder: !tasktToTogle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
      })

    const data = await res.json()

    setTasks(tasks.map(task =>
      task.id === id ?
        { ...task, reminder: data.reminder }
        : task))
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`,
      { method: 'DELETE' },)

    setTasks(tasks.filter((task) => task.id !== id))
  }

  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(task)
      })

    const data = await res.json()

    setTasks([...tasks, data])

    // // const id = Math.floor(Math.random()*10000) + 1
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])
  }

  return (
    <Router>
      <div className="container">
        <Header title='Task tracker' onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        <Routes>
          <Route path='/' exact element={
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : "No tasks to show"}

            </>
          }></Route>
          
          <Route path="/about" element={<About />}></Route>
        </Routes>
        < Footer />
      </div>

    </Router>

  );
}

// class App extends React.Component{
//   render(){
//     return(
//       <div>
//       <h1>Hello form a class</h1>
//       <Header />
//       </div>
//     )

//   }
// }

export default App;
