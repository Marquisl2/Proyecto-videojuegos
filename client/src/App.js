import './App.css';
import {Route} from "react-router-dom"
import CreateGame from './components/CreateGame/CreateGame';
import DetailsGame from './components/DetailsGame';
import MainGames from './components/MainGames';
import LandigPage from './components/LandigPage';

function App() {
  return (
    <div className="App">
      <Route exact path={"/"} component={LandigPage}/>
      <Route exact path={"/home"} component={MainGames}/>
      <Route exact path={"/create/game"} component={CreateGame}/>
      <Route exact path={"/game/:id"} component={DetailsGame}/>
    </div>
  );
}

export default App;
