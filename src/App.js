import logo from './logo.svg';
import './App.css';
import Account from "./components/Account"
import Count from "./components/Count"
import IncButton from './components/incButton';

function App(){
  return(
    <div>
      <div className ="App">
      <Account/>
      <Count/>
      <IncButton/>
      </div>
    </div>
  )
}

export default App;
