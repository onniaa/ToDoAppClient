import { Button, List, ListItem, ListItemText, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { useState, useEffect } from 'react'
import axios from 'axios'

const TaskAttachDialog = ({ task, isOpen, attach, handleClose, tasks, setTasks }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers();
    }, []);

    async function getAllUsers() {
        try {
            const { data } = await axios.get(`http://localhost:8082/users`);
            setUsers(data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleToggle = (i, user) => {
        const isAttached = task.users.some((u) => u.id === user.id);
        if (!isAttached) {
            attach(task.id, user, "false");
        } else {
            attach(task.id, user, "true");
        }
    }

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth maxWidth='xs'
        >
            <DialogTitle
                id="form-dialog-title">
                Assign Users ({task.header})
            </DialogTitle>
            <DialogContent>
                <List component="nav">
                    {users.length > 0
                        ? users.map((user, i) =>
                            <ListItem
                                key={i}
                                button
                                onClick={() => handleToggle(i, user)}
                            >
                                <ListItemText
                                    primary={user.username}
                                    color='secondary' />
                                <Checkbox
                                    edge="end"
                                    checked={task.users.some((u) => u.id === user.id)}
                                />
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
