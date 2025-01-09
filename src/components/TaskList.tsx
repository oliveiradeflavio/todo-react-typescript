// css
import styles from "./TaskList.module.css"

// interfaces
import { ITask } from "../interfaces/Task"

// react-icons
import { BsPencil, BsTrash } from "react-icons/bs";

type Props = {
    taskList: ITask[]
    handleDelete(id: number): void
    handleEdit(task: ITask): void
}

const TaskList = ({ taskList, handleDelete, handleEdit }: Props) => {
    return (
        <>
            {taskList.length > 0 ? (
                taskList.map((task) => (
                    <div key={task.id} className={styles.task}>
                        <div className={styles.details}>
                            <h4>{task.title}</h4>
                            <p>Dificuldade: {task.difficulty}</p>
                        </div>
                        <div className={styles.actions}>
                            <BsPencil onClick={() => { handleEdit(task) }} />
                            <BsTrash onClick={() => { handleDelete(task.id) }} />
                        </div>

                    </div>
                ))
            ) : (
                <p>Não tem tarefas cadastradas</p>
            )}

        </>
    )
}

export default TaskList