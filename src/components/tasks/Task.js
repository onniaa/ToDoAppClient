import { Button, Card, CardContent, Typography, CardActions, Chip } from '@material-ui/core'

const Task = ({ task, onDelete, openEditDialog, openAttachDialog }) => {

    return (
        <Card className='item'>
            <CardContent>
                <Typography
                    gutterBottom variant="h6">
                    {task.header}
                </Typography>
                <Typography
                    gutterBottom
                    variant="body2"
                    color="textSecondary">
                    {task.description}
                </Typography>
                <div className="users-attached">
                    {task.users.length > 0
                        ? task.users.map((user) =>
                        (<Chip
                            className="user"
                            key={user.id}
                            label={user.username}
                            variant="outlined"
                            color="primary"
                        />))
                        : <div className='no-items'> No Users Assigned</div>}
                </div>
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    onClick={() => openAttachDialog(task)}>
                    Assign Users
                </Button>
                <Button
                    color='primary'
                    variant="contained"
                    onClick={() => openEditDialog(task)}>
                    EDIT
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => onDelete(task.id)}>
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
}

export default Task