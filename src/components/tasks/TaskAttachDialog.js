import { Button, List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { useState, useEffect } from 'react'
import axios from 'axios'
import TaskAddDialog from './TaskAddDialog';

const TaskAttachDialog = ({ task, isOpen, attach, handleClose, tasks, setTasks }) => {
    const [users, setUsers] = useState([]);
    const [usersAttached, setUsersAttached] = useState([]);

    useEffect(() => {
        getAllUsers();
        // console.log(users);
        // getUsersAttached();
    }, []);

    // const handleClicked = async (userId) => {
    //     console.log(userId);
    //     try {
    //         await attach(task.id, userId, "false");
    //         handleClose();
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    async function getAllUsers() {
        try {
            const { data } = await axios.get(`http://localhost:8082/users`);
            setUsers(data);
        } catch (err) {
        }
    }

    // async function getUsersAttached() {
    //     await getAllUsers();
    //     var attached = [];
    //     // console.log(users);
    //     task.users.forEach(user => {
    //         // console.log(user);
    //         const ind = users.findIndex(u => u.id === user.id);
    //         attached.push(ind);
    //     });
    //     // console.log(attached);
    //     setUsersAttached(attached);
    // }

    const handleToggle = (i, user) => {
        console.log('clicked', i, user);
        const attached = task.users.some((u) => u.id === user.id);
        console.log(attached);
        // const currentIndex = usersAttached.indexOf(i);
        // const newChecked = [...usersAttached];

        var updatedTasks = [...tasks];
        const taskInd = updatedTasks.findIndex(t => t.id === task.id);
        // Attach user
        if (!attached) {
            // newChecked.push(i);
            
            updatedTasks[taskInd].users.push({id: user.id, username: user.username});
            // setTasks(updatedTasks);

            attach(task.id, user.id, "false");
        // Detach user
        } else {
            // const ind = task.users.findIndex(u => u.id === user.id);
            // task.users.splice(ind, 1);
            const ind = updatedTasks[taskInd].users.findIndex(u => u.id === user.id);
            updatedTasks[taskInd].users.splice(ind, 1);

            attach(task.id, user.id, "true");
            // newChecked.splice(currentIndex, 1);
        }
        setTasks(updatedTasks);
        // setUsersAttached(newChecked);
    }

    return (
        <Dialog open={isOpen} onClose={() => handleClose()} aria-labelledby="form-dialog-title" fullWidth maxWidth='xs'>
            <DialogTitle id="form-dialog-title">{`Assign Users (${task.header})`}</DialogTitle>
            <DialogContent>
                <List component="nav">
                    {users.length > 0
                        ? users.map((user, i) =>
                        <ListItem key={i} button>
                            <ListItemText primary={user.username} color='secondary' onClick={() => handleToggle(i, user)} />
                            <ListItemSecondaryAction>
                                <Checkbox
                                    edge="end"
                                    onChange={() => handleToggle(i, user)}
                                    checked={task.users.some((u) => u.id === user.id)}
                                    // checked={usersAttached.indexOf(i) !== -1}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>)
                        : <div className='no-items'>No Users</div>}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                        </Button>
            </DialogActions>
        </Dialog>
    )
}

export default TaskAttachDialog
