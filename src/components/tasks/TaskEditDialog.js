import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core'
import { useState } from 'react'

const TaskEditDialog = ({ task, update, isOpen, handleClose }) => {
    const [header, setHeader] = useState(task.header);
    const [description, setDescription] = useState(task.description);

    const handleSave = () => {
        update(task.id, header, description);
        handleClose();
    };

    return (
        <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
            <DialogContent>
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Header"
                    value={header}
                    onChange={(e) => setHeader(e.target.value)}
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="name"
                    label="Description"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    variant="outlined"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={handleClose} 
                    color="secondary">
                    Cancel
                </Button>
                <Button 
                    onClick={handleSave} 
                    disabled={!header}
                    color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default TaskEditDialog
