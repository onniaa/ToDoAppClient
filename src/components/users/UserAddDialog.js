import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core'
import { useState } from 'react'

const UserAddDialog = ({ addUser, isOpen, handleClose }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const handleAdd = () => {
        addUser(username, email);
        handleClose();
        setUsername('');
        setEmail('');
    };

    return (
        <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add User</DialogTitle>
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
                <Button onClick={handleAdd} color="primary">Add</Button>
            </DialogActions>
        </Dialog>
    )
}

export default UserAddDialog
