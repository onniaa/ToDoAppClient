import { Button, Card, CardContent, Typography, CardActions } from '@material-ui/core'

const User = ({ user, onDelete, openEditDialog }) => {
    return (
        <Card className='item'>
            <CardContent>
                <Typography gutterBottom variant="h6">
                    {user.username}
                </Typography>
                <Typography gutterBottom variant="body2" color="textSecondary">
                    {user.email}
                </Typography>
            </CardContent>
            <CardActions>
                <Button color='primary' variant="contained" onClick={() => openEditDialog(user)} >EDIT</Button>
                <Button variant="contained" color="secondary" onClick={() => onDelete(user.id)}>Delete</Button>
            </CardActions>
        </Card>
    )
}

export default User
