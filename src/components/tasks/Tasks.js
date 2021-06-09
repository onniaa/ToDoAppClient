import Task from './Task'
import TaskAddDialog from './TaskAddDialog'
import TaskEditDialog from './TaskEditDialog'
import TaskAttachDialog from './TaskAttachDialog'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from '@material-ui/core'

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState();
    const [openAttach, setOpenAttach] = useState(false);
    const [taskToAttach, setTaskToAttach] = useState();

    const serverPath = `http://localhost:8082/tasks`

    useEffect(() => {
        getAllTasks();
    }, []);


    const deleteTask = async (id) => {
        try {
            await deleteTaskFromDB(id);
            getAllTasks();
        } catch (err) {
            console.log(err);
        }
    }

    async function deleteTaskFromDB(id) {
        await axios.delete(serverPath + '/' + id);
    }

    async function getAllTasks() {
        try {
            const { data } = await axios.get(serverPath);
            console.log(data)
            setTasks(data);
        } catch (err) {
            console.log(err);
        }
    }

    const updateTask = async (id, header, description) => {
        try {
            await updateTaskInDB(id, header, description);
            getAllTasks();
        } catch (err) {
            console.log(err);
        }
    }

    const updateTaskInDB = async (id, header, description) => {
        await axios.put(serverPath + '/' + id, { header: header, description: description });
    }

    const addTaskToDB = async (header, description) => {
        await axios.post(serverPath, { header: header, description: description });
    }

    const addTask = async (header, description) => {
        try {
            await addTaskToDB(header, description);
            getAllTasks();
        } catch (err) {
            console.log(err);
        }
    }

    const attachUser = async (taskId, user, detach) => {
        try {
            axios.patch(serverPath + '/' + taskId, { userId: user.id, detach: detach });
            updateTasks(taskId, user, detach);
        } catch (err) {
            console.log(err);
        }
    }

    const updateTasks = (taskId, user, detach) => {
        let updatedTasks = [...tasks];
        const taskInd = updatedTasks.findIndex(t => t.id === taskId);
        if (detach === 'false') {
            updatedTasks[taskInd].users.push({ id: user.id, username: user.username });
        } else {
            const ind = updatedTasks[taskInd].users.findIndex(u => u.id === user.id);
            updatedTasks[taskInd].users.splice(ind, 1);
        }
        setTasks(updatedTasks);
    }

    const openEditDialog = (task) => {
        setTaskToEdit(task);
        setOpenEdit(true);
    }

    const openAttachDialog = (task) => {
        setTaskToAttach(task);
        setOpenAttach(true);
    }

    return (
        <div className='container'>
            <Button
                variant="contained"
                color='primary'
                onClick={() => setOpenAdd(true)}>Add Task</Button>
            <TaskAddDialog
                addTask={addTask}
                isOpen={openAdd}
                handleClose={() => setOpenAdd(false)}
            />
            {tasks.length > 0
                ? tasks.map((task) =>
                (<Task
                    key={task.id}
                    task={task}
                    onDelete={deleteTask}
                    openEditDialog={openEditDialog}
                    openAttachDialog={openAttachDialog} />))
                : <div className='no-items'> No Tasks Created</div>}
            {openEdit === true && <TaskEditDialog
                task={taskToEdit}
                isOpen={openEdit}
                handleClose={() => setOpenEdit(false)}
                update={updateTask}
            />}
            {openAttach === true && <TaskAttachDialog
                task={taskToAttach}
                isOpen={openAttach}
                handleClose={() => setOpenAttach(false)}
                attach={attachUser}
                updare
                tasks={tasks}
                setTasks={setTasks}
            />}
        </div>
    )
}

export default Tasks
