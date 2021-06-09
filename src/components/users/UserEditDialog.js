import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core'
import { useState } from 'react'

const UserEditDialog = ({ user, update, isOpen, handleClose }) => {
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);

    const handleSave = () => {
        update(user.id, username, email);
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
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    required
                    margin="dense"
                    id="name"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">Cancel</Button>
                <Button onClick={handleSave} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    )
}

export default UserEditDialog
