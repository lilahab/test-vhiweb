import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPages from './views/LoginPages';
import Users from './views/Users';
import UserDetail from './views/UserDetail';
import NotFound from './components/NotFound';
import './App.scss';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoginPages} />
        <Route path="/users" exact component={Users} />
        {/* <Route path="/users/:id" component={UserDetail} /> */}
        <Route path="/users/:id">
          <UserDetail />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;