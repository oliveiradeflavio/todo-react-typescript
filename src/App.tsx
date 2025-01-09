//css module
import styles from "./App.module.css"

import { useState } from "react"

// import components
import Header from "./components/Header"
import Footer from "./components/Footer"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"
import Modal from "./components/Modal"

// interfaces
import { ITask } from "./interfaces/Task"

function App() {

  const [taskList, setTaskList] = useState<ITask[]>([])
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null)

  const deleteTask = (id: number) => {
    setTaskList(
      taskList.filter(task => {
        return task.id !== id;
      })
    )
  }

  const hideOrShowModal = (display: boolean) => {
    const modal = document.querySelector("#modal")
    if (display) {
      modal!.classList.remove("hide")
    } else {
      modal!.classList.add("hide")
    }
  }

  const editTask = (task: ITask): void => {
    hideOrShowModal(true)
    setTaskToUpdate(task)
  }

  const updateTask = (id: number, title: string, difficulty: number) => {
    const updateTask: ITask = { id, title, difficulty }
    const updatedItems = taskList.map((task) => {
      return task.id === updateTask.id ? updateTask : task
    })
    setTaskList(updatedItems)
    hideOrShowModal(false)
  }

  return (
    <>
      <Modal children={<TaskForm btnText="Editar Tarefa" taskList={taskList} task={taskToUpdate} handleUpdate={updateTask} />} />
      <Header />
      <main className={styles.main}>
        <section>
          <h2>
            O que você quer fazer hoje?
          </h2>
          <TaskForm btnText="Adicionar Tarefa" taskList={taskList} setTaskList={setTaskList} />
        </section>

        <section>
          <h2>
            Suas tarefas:
          </h2>
          <TaskList taskList={taskList} handleDelete={deleteTask} handleEdit={editTask} />
        </section>

      </main>
      <Footer />

    </>
  )
}

export default App
