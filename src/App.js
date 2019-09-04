import React from 'react';
import './App.css';
import Edit from './Components/edit/edit';
import Home from './Components/home/home';
import Add from './Components/add/add';
import {Router , Route , browserHistory} from "react-router";

function App() {
  return (
    <Router history={browserHistory}>
      <Route path={"/"} component={Home}>
        <Route path={"/home"} component={Home}></Route>
      </Route>
      <Route path={"/edit/:id"} component={Edit}></Route>
      <Route path={"/add"} component={Add}></Route>
    </Router>
  );
}

export default App;
