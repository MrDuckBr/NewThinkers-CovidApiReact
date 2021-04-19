import { useState } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import api from './Api'
import Buscas from './Pages/Buscas'
import Casos from './Pages/Casos'





function App() {
  return (
    <Router>
      <Switch>
      <Route exact path="/">
        <Buscas/>
      </Route>
      <Route exact path="/:country">
      <Casos/>
      </Route>
      </Switch>
    </Router>
  )
}
export default App;
