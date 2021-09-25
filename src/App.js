import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link } from "react-router-dom";
import Create from "./components/Create";
import EditTodo from "./components/UpdateItems";
import Shopping from "./components/Shopping";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
const App = (props) => {
  return (
    <div>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path="/adminDashboard" component={AdminDashboard} />
            <Route exact path="/userDashboard" component={UserDashboard} />
            <Route exact path="/" component={Login} />
            <Route exact path="/create" component={Create} />
            <Route exact path="/update/:id" component={EditTodo} />
            <Route exact path="/shopping/" component={Shopping} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;
