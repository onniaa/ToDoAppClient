import { AppBar, Toolbar, Tabs, Tab } from '@material-ui/core'
import { useState } from 'react'


const Header = ({ title }) => {
    const [value, setValue] = useState(() => {
        if (window.location.pathname === '/tasks')
            return 0;
        else if (window.location.pathname === '/users')
            return 1;
        else
            return -1;
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === 0) {
            window.location.replace('/tasks');
        } else {
            window.location.replace('/users');
        }
    };

    return (
        <AppBar position="static">
            <Toolbar className='app-bar' variant="regular">
                <div className='toolbar'>
                    <header>{title}</header>
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="Tasks" />
                        <Tab label="Users" />
                    </Tabs>
                </div>
            </Toolbar>
        </AppBar>
    );
}

Header.defaultProps = {
    title: 'Things To Do'
}

export default Header