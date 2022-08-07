import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Components/Home/Home';
import Landing from './Components/LandingPage/LandingPage';
import Details from './Components/Details/Details';
import Create from './Components/CreatePokemon/Create';
import NavBar from './Components/NavBar/NavBar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path= '/' component = {Landing}/>
          <Route path='/'>
          <NavBar/>
          <Route path= '/home' component = {Home}/>
          <Route exact path= '/pokemons/:id' component = {Details}/>
          <Route exact path= '/create' component = {Create}/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
