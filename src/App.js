import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from './components/Header'
import Tasks from './components/tasks/Tasks'
import Users from './components/users/Users'

function App() {
  return (
    <div className="app">
      <Header />
      <div className='content-body'>
        <BrowserRouter>
          <Switch>
            <Route path="/users" component={Users}></Route>
            <Route path="/tasks" component={Tasks}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
