import User from './User'
import UserAddDialog from './UserAddDialog'
import UserEditDialog from './UserEditDialog'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from '@material-ui/core'

const Users = () => {
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [userToEdit, setUserToEdit] = useState();
    const [users, setUsers] = useState([]);
    const serverPathUsers = `http://localhost:8082/users`

    useEffect(() => {
        getAllUsers();
    }, []);

    async function getAllUsers() {
        try {
            const { data } = await axios.get(serverPathUsers);
            console.log(data)
            setUsers(data);
        } catch (err) {
            console.log(err);
        }
    }

    const deleteUser = async (id) => {
        try {
            await deleteUserFromDB(id);
            getAllUsers();
        } catch (err) {
            console.log(err);
        }
    }

    async function deleteUserFromDB(id) {
        await axios.delete(serverPathUsers + '/' + id);
    }

    const updateUser = async (id, username, email) => {
        try {
            await updateUserInDB(id, username, email);
            getAllUsers();
        } catch (err) {
            console.log(err);
        }
    }

    const updateUserInDB = async (id, username, email) => {
        await axios.put(serverPathUsers + '/' + id, { username: username, email: email });
    }

    const addUserToDB = async (username, email) => {
        await axios.post(serverPathUsers, { username: username, email: email });
    }

    const addUser = async (username, email) => {
        try {
            await addUserToDB(username, email);
            getAllUsers();
        } catch (err) {
            console.log(err);
        }
    }

    const openEditDialog = (user) => {
        setUserToEdit(user);
        setOpenEdit(true);
    }

    return (
        <div className='container'>
            <Button
                variant="contained"
                color='primary'
                onClick={() => setOpen(true)}>
                Add User
            </Button>
            <UserAddDialog
                addUser={addUser}
                isOpen={open}
                handleClose={() => setOpen(false)}
            />
            { users.length > 0
                ? users.map((user, i) =>
                (<User
                    key={i}
                    user={user}
                    onDelete={deleteUser}
                    openEditDialog={openEditDialog}
                />))
                : <div className='no-items'> No Users Created</div>}
            {openEdit === true && <UserEditDialog
                user={userToEdit}
                isOpen={openEdit}
                handleClose={() => setOpenEdit(false)}
                update={updateUser}
            />}
        </div>
    )
}

export default Users
